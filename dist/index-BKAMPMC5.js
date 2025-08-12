import { N as NodeProp, E as EditorState, F as Facet, T as Tree, V as ViewPlugin, a as EditorView, I as IterMode, l as logException, b as TreeFragment, P as Parser, c as NodeType, S as StateEffect, d as StateField, t as tags, s as styleTags, D as Decoration, e as Direction, L as LRParser, f as ExternalTokenizer, i as ifNotIn, g as completeFromList } from './playground-BiGk7PXY.js';

var _a;
/**
Node prop stored in a parser's top syntax node to provide the
facet that stores language-specific data for that language.
*/
const languageDataProp = /*@__PURE__*/new NodeProp();
/**
Helper function to define a facet (to be added to the top syntax
node(s) for a language via
[`languageDataProp`](https://codemirror.net/6/docs/ref/#language.languageDataProp)), that will be
used to associate language data with the language. You
probably only need this when subclassing
[`Language`](https://codemirror.net/6/docs/ref/#language.Language).
*/
function defineLanguageFacet(baseData) {
    return Facet.define({
        combine: baseData ? values => values.concat(baseData) : undefined
    });
}
/**
Syntax node prop used to register sublanguages. Should be added to
the top level node type for the language.
*/
const sublanguageProp = /*@__PURE__*/new NodeProp();
/**
A language object manages parsing and per-language
[metadata](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt). Parse data is
managed as a [Lezer](https://lezer.codemirror.net) tree. The class
can be used directly, via the [`LRLanguage`](https://codemirror.net/6/docs/ref/#language.LRLanguage)
subclass for [Lezer](https://lezer.codemirror.net/) LR parsers, or
via the [`StreamLanguage`](https://codemirror.net/6/docs/ref/#language.StreamLanguage) subclass
for stream parsers.
*/
class Language {
    /**
    Construct a language object. If you need to invoke this
    directly, first define a data facet with
    [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
    configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
    to the language's outer syntax node.
    */
    constructor(
    /**
    The [language data](https://codemirror.net/6/docs/ref/#state.EditorState.languageDataAt) facet
    used for this language.
    */
    data, parser, extraExtensions = [], 
    /**
    A language name.
    */
    name = "") {
        this.data = data;
        this.name = name;
        // Kludge to define EditorState.tree as a debugging helper,
        // without the EditorState package actually knowing about
        // languages and lezer trees.
        if (!EditorState.prototype.hasOwnProperty("tree"))
            Object.defineProperty(EditorState.prototype, "tree", { get() { return syntaxTree(this); } });
        this.parser = parser;
        this.extension = [
            language.of(this),
            EditorState.languageData.of((state, pos, side) => {
                let top = topNodeAt(state, pos, side), data = top.type.prop(languageDataProp);
                if (!data)
                    return [];
                let base = state.facet(data), sub = top.type.prop(sublanguageProp);
                if (sub) {
                    let innerNode = top.resolve(pos - top.from, side);
                    for (let sublang of sub)
                        if (sublang.test(innerNode, state)) {
                            let data = state.facet(sublang.facet);
                            return sublang.type == "replace" ? data : data.concat(base);
                        }
                }
                return base;
            })
        ].concat(extraExtensions);
    }
    /**
    Query whether this language is active at the given position.
    */
    isActiveAt(state, pos, side = -1) {
        return topNodeAt(state, pos, side).type.prop(languageDataProp) == this.data;
    }
    /**
    Find the document regions that were parsed using this language.
    The returned regions will _include_ any nested languages rooted
    in this language, when those exist.
    */
    findRegions(state) {
        let lang = state.facet(language);
        if ((lang === null || lang === void 0 ? void 0 : lang.data) == this.data)
            return [{ from: 0, to: state.doc.length }];
        if (!lang || !lang.allowsNesting)
            return [];
        let result = [];
        let explore = (tree, from) => {
            if (tree.prop(languageDataProp) == this.data) {
                result.push({ from, to: from + tree.length });
                return;
            }
            let mount = tree.prop(NodeProp.mounted);
            if (mount) {
                if (mount.tree.prop(languageDataProp) == this.data) {
                    if (mount.overlay)
                        for (let r of mount.overlay)
                            result.push({ from: r.from + from, to: r.to + from });
                    else
                        result.push({ from: from, to: from + tree.length });
                    return;
                }
                else if (mount.overlay) {
                    let size = result.length;
                    explore(mount.tree, mount.overlay[0].from + from);
                    if (result.length > size)
                        return;
                }
            }
            for (let i = 0; i < tree.children.length; i++) {
                let ch = tree.children[i];
                if (ch instanceof Tree)
                    explore(ch, tree.positions[i] + from);
            }
        };
        explore(syntaxTree(state), 0);
        return result;
    }
    /**
    Indicates whether this language allows nested languages. The
    default implementation returns true.
    */
    get allowsNesting() { return true; }
}
/**
@internal
*/
Language.setState = /*@__PURE__*/StateEffect.define();
function topNodeAt(state, pos, side) {
    let topLang = state.facet(language), tree = syntaxTree(state).topNode;
    if (!topLang || topLang.allowsNesting) {
        for (let node = tree; node; node = node.enter(pos, side, IterMode.ExcludeBuffers))
            if (node.type.isTop)
                tree = node;
    }
    return tree;
}
/**
A subclass of [`Language`](https://codemirror.net/6/docs/ref/#language.Language) for use with Lezer
[LR parsers](https://lezer.codemirror.net/docs/ref#lr.LRParser)
parsers.
*/
class LRLanguage extends Language {
    constructor(data, parser, name) {
        super(data, parser, [], name);
        this.parser = parser;
    }
    /**
    Define a language from a parser.
    */
    static define(spec) {
        let data = defineLanguageFacet(spec.languageData);
        return new LRLanguage(data, spec.parser.configure({
            props: [languageDataProp.add(type => type.isTop ? data : undefined)]
        }), spec.name);
    }
    /**
    Create a new instance of this language with a reconfigured
    version of its parser and optionally a new name.
    */
    configure(options, name) {
        return new LRLanguage(this.data, this.parser.configure(options), name || this.name);
    }
    get allowsNesting() { return this.parser.hasWrappers(); }
}
/**
Get the syntax tree for a state, which is the current (possibly
incomplete) parse tree of the active
[language](https://codemirror.net/6/docs/ref/#language.Language), or the empty tree if there is no
language available.
*/
function syntaxTree(state) {
    let field = state.field(Language.state, false);
    return field ? field.tree : Tree.empty;
}
/**
Lezer-style
[`Input`](https://lezer.codemirror.net/docs/ref#common.Input)
object for a [`Text`](https://codemirror.net/6/docs/ref/#state.Text) object.
*/
class DocInput {
    /**
    Create an input object for the given document.
    */
    constructor(doc) {
        this.doc = doc;
        this.cursorPos = 0;
        this.string = "";
        this.cursor = doc.iter();
    }
    get length() { return this.doc.length; }
    syncTo(pos) {
        this.string = this.cursor.next(pos - this.cursorPos).value;
        this.cursorPos = pos + this.string.length;
        return this.cursorPos - this.string.length;
    }
    chunk(pos) {
        this.syncTo(pos);
        return this.string;
    }
    get lineChunks() { return true; }
    read(from, to) {
        let stringStart = this.cursorPos - this.string.length;
        if (from < stringStart || to >= this.cursorPos)
            return this.doc.sliceString(from, to);
        else
            return this.string.slice(from - stringStart, to - stringStart);
    }
}
let currentContext = null;
/**
A parse context provided to parsers working on the editor content.
*/
class ParseContext {
    constructor(parser, 
    /**
    The current editor state.
    */
    state, 
    /**
    Tree fragments that can be reused by incremental re-parses.
    */
    fragments = [], 
    /**
    @internal
    */
    tree, 
    /**
    @internal
    */
    treeLen, 
    /**
    The current editor viewport (or some overapproximation
    thereof). Intended to be used for opportunistically avoiding
    work (in which case
    [`skipUntilInView`](https://codemirror.net/6/docs/ref/#language.ParseContext.skipUntilInView)
    should be called to make sure the parser is restarted when the
    skipped region becomes visible).
    */
    viewport, 
    /**
    @internal
    */
    skipped, 
    /**
    This is where skipping parsers can register a promise that,
    when resolved, will schedule a new parse. It is cleared when
    the parse worker picks up the promise. @internal
    */
    scheduleOn) {
        this.parser = parser;
        this.state = state;
        this.fragments = fragments;
        this.tree = tree;
        this.treeLen = treeLen;
        this.viewport = viewport;
        this.skipped = skipped;
        this.scheduleOn = scheduleOn;
        this.parse = null;
        /**
        @internal
        */
        this.tempSkipped = [];
    }
    /**
    @internal
    */
    static create(parser, state, viewport) {
        return new ParseContext(parser, state, [], Tree.empty, 0, viewport, [], null);
    }
    startParse() {
        return this.parser.startParse(new DocInput(this.state.doc), this.fragments);
    }
    /**
    @internal
    */
    work(until, upto) {
        if (upto != null && upto >= this.state.doc.length)
            upto = undefined;
        if (this.tree != Tree.empty && this.isDone(upto !== null && upto !== void 0 ? upto : this.state.doc.length)) {
            this.takeTree();
            return true;
        }
        return this.withContext(() => {
            var _a;
            if (typeof until == "number") {
                let endTime = Date.now() + until;
                until = () => Date.now() > endTime;
            }
            if (!this.parse)
                this.parse = this.startParse();
            if (upto != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > upto) &&
                upto < this.state.doc.length)
                this.parse.stopAt(upto);
            for (;;) {
                let done = this.parse.advance();
                if (done) {
                    this.fragments = this.withoutTempSkipped(TreeFragment.addTree(done, this.fragments, this.parse.stoppedAt != null));
                    this.treeLen = (_a = this.parse.stoppedAt) !== null && _a !== void 0 ? _a : this.state.doc.length;
                    this.tree = done;
                    this.parse = null;
                    if (this.treeLen < (upto !== null && upto !== void 0 ? upto : this.state.doc.length))
                        this.parse = this.startParse();
                    else
                        return true;
                }
                if (until())
                    return false;
            }
        });
    }
    /**
    @internal
    */
    takeTree() {
        let pos, tree;
        if (this.parse && (pos = this.parse.parsedPos) >= this.treeLen) {
            if (this.parse.stoppedAt == null || this.parse.stoppedAt > pos)
                this.parse.stopAt(pos);
            this.withContext(() => { while (!(tree = this.parse.advance())) { } });
            this.treeLen = pos;
            this.tree = tree;
            this.fragments = this.withoutTempSkipped(TreeFragment.addTree(this.tree, this.fragments, true));
            this.parse = null;
        }
    }
    withContext(f) {
        let prev = currentContext;
        currentContext = this;
        try {
            return f();
        }
        finally {
            currentContext = prev;
        }
    }
    withoutTempSkipped(fragments) {
        for (let r; r = this.tempSkipped.pop();)
            fragments = cutFragments(fragments, r.from, r.to);
        return fragments;
    }
    /**
    @internal
    */
    changes(changes, newState) {
        let { fragments, tree, treeLen, viewport, skipped } = this;
        this.takeTree();
        if (!changes.empty) {
            let ranges = [];
            changes.iterChangedRanges((fromA, toA, fromB, toB) => ranges.push({ fromA, toA, fromB, toB }));
            fragments = TreeFragment.applyChanges(fragments, ranges);
            tree = Tree.empty;
            treeLen = 0;
            viewport = { from: changes.mapPos(viewport.from, -1), to: changes.mapPos(viewport.to, 1) };
            if (this.skipped.length) {
                skipped = [];
                for (let r of this.skipped) {
                    let from = changes.mapPos(r.from, 1), to = changes.mapPos(r.to, -1);
                    if (from < to)
                        skipped.push({ from, to });
                }
            }
        }
        return new ParseContext(this.parser, newState, fragments, tree, treeLen, viewport, skipped, this.scheduleOn);
    }
    /**
    @internal
    */
    updateViewport(viewport) {
        if (this.viewport.from == viewport.from && this.viewport.to == viewport.to)
            return false;
        this.viewport = viewport;
        let startLen = this.skipped.length;
        for (let i = 0; i < this.skipped.length; i++) {
            let { from, to } = this.skipped[i];
            if (from < viewport.to && to > viewport.from) {
                this.fragments = cutFragments(this.fragments, from, to);
                this.skipped.splice(i--, 1);
            }
        }
        if (this.skipped.length >= startLen)
            return false;
        this.reset();
        return true;
    }
    /**
    @internal
    */
    reset() {
        if (this.parse) {
            this.takeTree();
            this.parse = null;
        }
    }
    /**
    Notify the parse scheduler that the given region was skipped
    because it wasn't in view, and the parse should be restarted
    when it comes into view.
    */
    skipUntilInView(from, to) {
        this.skipped.push({ from, to });
    }
    /**
    Returns a parser intended to be used as placeholder when
    asynchronously loading a nested parser. It'll skip its input and
    mark it as not-really-parsed, so that the next update will parse
    it again.
    
    When `until` is given, a reparse will be scheduled when that
    promise resolves.
    */
    static getSkippingParser(until) {
        return new class extends Parser {
            createParse(input, fragments, ranges) {
                let from = ranges[0].from, to = ranges[ranges.length - 1].to;
                let parser = {
                    parsedPos: from,
                    advance() {
                        let cx = currentContext;
                        if (cx) {
                            for (let r of ranges)
                                cx.tempSkipped.push(r);
                            if (until)
                                cx.scheduleOn = cx.scheduleOn ? Promise.all([cx.scheduleOn, until]) : until;
                        }
                        this.parsedPos = to;
                        return new Tree(NodeType.none, [], [], to - from);
                    },
                    stoppedAt: null,
                    stopAt() { }
                };
                return parser;
            }
        };
    }
    /**
    @internal
    */
    isDone(upto) {
        upto = Math.min(upto, this.state.doc.length);
        let frags = this.fragments;
        return this.treeLen >= upto && frags.length && frags[0].from == 0 && frags[0].to >= upto;
    }
    /**
    Get the context for the current parse, or `null` if no editor
    parse is in progress.
    */
    static get() { return currentContext; }
}
function cutFragments(fragments, from, to) {
    return TreeFragment.applyChanges(fragments, [{ fromA: from, toA: to, fromB: from, toB: to }]);
}
class LanguageState {
    constructor(
    // A mutable parse state that is used to preserve work done during
    // the lifetime of a state when moving to the next state.
    context) {
        this.context = context;
        this.tree = context.tree;
    }
    apply(tr) {
        if (!tr.docChanged && this.tree == this.context.tree)
            return this;
        let newCx = this.context.changes(tr.changes, tr.state);
        // If the previous parse wasn't done, go forward only up to its
        // end position or the end of the viewport, to avoid slowing down
        // state updates with parse work beyond the viewport.
        let upto = this.context.treeLen == tr.startState.doc.length ? undefined
            : Math.max(tr.changes.mapPos(this.context.treeLen), newCx.viewport.to);
        if (!newCx.work(20 /* Work.Apply */, upto))
            newCx.takeTree();
        return new LanguageState(newCx);
    }
    static init(state) {
        let vpTo = Math.min(3000 /* Work.InitViewport */, state.doc.length);
        let parseState = ParseContext.create(state.facet(language).parser, state, { from: 0, to: vpTo });
        if (!parseState.work(20 /* Work.Apply */, vpTo))
            parseState.takeTree();
        return new LanguageState(parseState);
    }
}
Language.state = /*@__PURE__*/StateField.define({
    create: LanguageState.init,
    update(value, tr) {
        for (let e of tr.effects)
            if (e.is(Language.setState))
                return e.value;
        if (tr.startState.facet(language) != tr.state.facet(language))
            return LanguageState.init(tr.state);
        return value.apply(tr);
    }
});
let requestIdle = (callback) => {
    let timeout = setTimeout(() => callback(), 500 /* Work.MaxPause */);
    return () => clearTimeout(timeout);
};
if (typeof requestIdleCallback != "undefined")
    requestIdle = (callback) => {
        let idle = -1, timeout = setTimeout(() => {
            idle = requestIdleCallback(callback, { timeout: 500 /* Work.MaxPause */ - 100 /* Work.MinPause */ });
        }, 100 /* Work.MinPause */);
        return () => idle < 0 ? clearTimeout(timeout) : cancelIdleCallback(idle);
    };
const isInputPending = typeof navigator != "undefined" && ((_a = navigator.scheduling) === null || _a === void 0 ? void 0 : _a.isInputPending)
    ? () => navigator.scheduling.isInputPending() : null;
const parseWorker = /*@__PURE__*/ViewPlugin.fromClass(class ParseWorker {
    constructor(view) {
        this.view = view;
        this.working = null;
        this.workScheduled = 0;
        // End of the current time chunk
        this.chunkEnd = -1;
        // Milliseconds of budget left for this chunk
        this.chunkBudget = -1;
        this.work = this.work.bind(this);
        this.scheduleWork();
    }
    update(update) {
        let cx = this.view.state.field(Language.state).context;
        if (cx.updateViewport(update.view.viewport) || this.view.viewport.to > cx.treeLen)
            this.scheduleWork();
        if (update.docChanged || update.selectionSet) {
            if (this.view.hasFocus)
                this.chunkBudget += 50 /* Work.ChangeBonus */;
            this.scheduleWork();
        }
        this.checkAsyncSchedule(cx);
    }
    scheduleWork() {
        if (this.working)
            return;
        let { state } = this.view, field = state.field(Language.state);
        if (field.tree != field.context.tree || !field.context.isDone(state.doc.length))
            this.working = requestIdle(this.work);
    }
    work(deadline) {
        this.working = null;
        let now = Date.now();
        if (this.chunkEnd < now && (this.chunkEnd < 0 || this.view.hasFocus)) { // Start a new chunk
            this.chunkEnd = now + 30000 /* Work.ChunkTime */;
            this.chunkBudget = 3000 /* Work.ChunkBudget */;
        }
        if (this.chunkBudget <= 0)
            return; // No more budget
        let { state, viewport: { to: vpTo } } = this.view, field = state.field(Language.state);
        if (field.tree == field.context.tree && field.context.isDone(vpTo + 100000 /* Work.MaxParseAhead */))
            return;
        let endTime = Date.now() + Math.min(this.chunkBudget, 100 /* Work.Slice */, deadline && !isInputPending ? Math.max(25 /* Work.MinSlice */, deadline.timeRemaining() - 5) : 1e9);
        let viewportFirst = field.context.treeLen < vpTo && state.doc.length > vpTo + 1000;
        let done = field.context.work(() => {
            return isInputPending && isInputPending() || Date.now() > endTime;
        }, vpTo + (viewportFirst ? 0 : 100000 /* Work.MaxParseAhead */));
        this.chunkBudget -= Date.now() - now;
        if (done || this.chunkBudget <= 0) {
            field.context.takeTree();
            this.view.dispatch({ effects: Language.setState.of(new LanguageState(field.context)) });
        }
        if (this.chunkBudget > 0 && !(done && !viewportFirst))
            this.scheduleWork();
        this.checkAsyncSchedule(field.context);
    }
    checkAsyncSchedule(cx) {
        if (cx.scheduleOn) {
            this.workScheduled++;
            cx.scheduleOn
                .then(() => this.scheduleWork())
                .catch(err => logException(this.view.state, err))
                .then(() => this.workScheduled--);
            cx.scheduleOn = null;
        }
    }
    destroy() {
        if (this.working)
            this.working();
    }
    isWorking() {
        return !!(this.working || this.workScheduled > 0);
    }
}, {
    eventHandlers: { focus() { this.scheduleWork(); } }
});
/**
The facet used to associate a language with an editor state. Used
by `Language` object's `extension` property (so you don't need to
manually wrap your languages in this). Can be used to access the
current language on a state.
*/
const language = /*@__PURE__*/Facet.define({
    combine(languages) { return languages.length ? languages[0] : null; },
    enables: language => [
        Language.state,
        parseWorker,
        EditorView.contentAttributes.compute([language], state => {
            let lang = state.facet(language);
            return lang && lang.name ? { "data-language": lang.name } : {};
        })
    ]
});
/**
This class bundles a [language](https://codemirror.net/6/docs/ref/#language.Language) with an
optional set of supporting extensions. Language packages are
encouraged to export a function that optionally takes a
configuration object and returns a `LanguageSupport` instance, as
the main way for client code to use the package.
*/
class LanguageSupport {
    /**
    Create a language support object.
    */
    constructor(
    /**
    The language object.
    */
    language, 
    /**
    An optional set of supporting extensions. When nesting a
    language in another language, the outer language is encouraged
    to include the supporting extensions for its inner languages
    in its own set of support extensions.
    */
    support = []) {
        this.language = language;
        this.support = support;
        this.extension = [language, support];
    }
}
/**
A syntax tree node prop used to associate indentation strategies
with node types. Such a strategy is a function from an indentation
context to a column number (see also
[`indentString`](https://codemirror.net/6/docs/ref/#language.indentString)) or null, where null
indicates that no definitive indentation can be determined.
*/
const indentNodeProp = /*@__PURE__*/new NodeProp();
/**
Creates an indentation strategy that, by default, indents
continued lines one unit more than the node's base indentation.
You can provide `except` to prevent indentation of lines that
match a pattern (for example `/^else\b/` in `if`/`else`
constructs), and you can change the amount of units used with the
`units` option.
*/
function continuedIndent({ except, units = 1 } = {}) {
    return (context) => {
        let matchExcept = except && except.test(context.textAfter);
        return context.baseIndent + (matchExcept ? 0 : units * context.unit);
    };
}
/**
This node prop is used to associate folding information with
syntax node types. Given a syntax node, it should check whether
that tree is foldable and return the range that can be collapsed
when it is.
*/
const foldNodeProp = /*@__PURE__*/new NodeProp();
const noTokens = /*@__PURE__*/Object.create(null);
const typeArray = [NodeType.none];
const warned = [];
// Cache of node types by name and tags
const byTag = /*@__PURE__*/Object.create(null);
const defaultTable = /*@__PURE__*/Object.create(null);
for (let [legacyName, name] of [
    ["variable", "variableName"],
    ["variable-2", "variableName.special"],
    ["string-2", "string.special"],
    ["def", "variableName.definition"],
    ["tag", "tagName"],
    ["attribute", "attributeName"],
    ["type", "typeName"],
    ["builtin", "variableName.standard"],
    ["qualifier", "modifier"],
    ["error", "invalid"],
    ["header", "heading"],
    ["property", "propertyName"]
])
    defaultTable[legacyName] = /*@__PURE__*/createTokenType(noTokens, name);
function warnForPart(part, msg) {
    if (warned.indexOf(part) > -1)
        return;
    warned.push(part);
    console.warn(msg);
}
function createTokenType(extra, tagStr) {
    let tags$1 = [];
    for (let name of tagStr.split(" ")) {
        let found = [];
        for (let part of name.split(".")) {
            let value = (extra[part] || tags[part]);
            if (!value) {
                warnForPart(part, `Unknown highlighting tag ${part}`);
            }
            else if (typeof value == "function") {
                if (!found.length)
                    warnForPart(part, `Modifier ${part} used at start of tag`);
                else
                    found = found.map(value);
            }
            else {
                if (found.length)
                    warnForPart(part, `Tag ${part} used as modifier`);
                else
                    found = Array.isArray(value) ? value : [value];
            }
        }
        for (let tag of found)
            tags$1.push(tag);
    }
    if (!tags$1.length)
        return 0;
    let name = tagStr.replace(/ /g, "_"), key = name + " " + tags$1.map(t => t.id);
    let known = byTag[key];
    if (known)
        return known.id;
    let type = byTag[key] = NodeType.define({
        id: typeArray.length,
        name,
        props: [styleTags({ [name]: tags$1 })]
    });
    typeArray.push(type);
    return type.id;
}
({
    rtl: /*@__PURE__*/Decoration.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "rtl" }, bidiIsolate: Direction.RTL }),
    ltr: /*@__PURE__*/Decoration.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "ltr" }, bidiIsolate: Direction.LTR })});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const whitespace = 36,
  LineComment = 1,
  BlockComment = 2,
  String$1 = 3,
  Number = 4,
  Bool = 5,
  Null = 6,
  ParenL = 7,
  ParenR = 8,
  BraceL = 9,
  BraceR = 10,
  BracketL = 11,
  BracketR = 12,
  Semi = 13,
  Dot = 14,
  Operator = 15,
  Punctuation = 16,
  SpecialVar = 17,
  Identifier = 18,
  QuotedIdentifier = 19,
  Keyword = 20,
  Type = 21,
  Bits = 22,
  Bytes = 23,
  Builtin = 24;

function isAlpha(ch) {
    return ch >= 65 /* Ch.A */ && ch <= 90 /* Ch.Z */ || ch >= 97 /* Ch.a */ && ch <= 122 /* Ch.z */ || ch >= 48 /* Ch._0 */ && ch <= 57 /* Ch._9 */;
}
function isHexDigit(ch) {
    return ch >= 48 /* Ch._0 */ && ch <= 57 /* Ch._9 */ || ch >= 97 /* Ch.a */ && ch <= 102 /* Ch.f */ || ch >= 65 /* Ch.A */ && ch <= 70 /* Ch.F */;
}
function readLiteral(input, endQuote, backslashEscapes) {
    for (let escaped = false;;) {
        if (input.next < 0)
            return;
        if (input.next == endQuote && !escaped) {
            input.advance();
            return;
        }
        escaped = backslashEscapes && !escaped && input.next == 92 /* Ch.Backslash */;
        input.advance();
    }
}
function readDoubleDollarLiteral(input, tag) {
    scan: for (;;) {
        if (input.next < 0)
            return;
        if (input.next == 36 /* Ch.Dollar */) {
            input.advance();
            for (let i = 0; i < tag.length; i++) {
                if (input.next != tag.charCodeAt(i))
                    continue scan;
                input.advance();
            }
            if (input.next == 36 /* Ch.Dollar */) {
                input.advance();
                return;
            }
        }
        else {
            input.advance();
        }
    }
}
function readPLSQLQuotedLiteral(input, openDelim) {
    let matchingDelim = "[{<(".indexOf(String.fromCharCode(openDelim));
    let closeDelim = matchingDelim < 0 ? openDelim : "]}>)".charCodeAt(matchingDelim);
    for (;;) {
        if (input.next < 0)
            return;
        if (input.next == closeDelim && input.peek(1) == 39 /* Ch.SingleQuote */) {
            input.advance(2);
            return;
        }
        input.advance();
    }
}
function readWord(input, result) {
    for (;;) {
        if (input.next != 95 /* Ch.Underscore */ && !isAlpha(input.next))
            break;
        if (result != null)
            result += String.fromCharCode(input.next);
        input.advance();
    }
    return result;
}
function readWordOrQuoted(input) {
    if (input.next == 39 /* Ch.SingleQuote */ || input.next == 34 /* Ch.DoubleQuote */ || input.next == 96 /* Ch.Backtick */) {
        let quote = input.next;
        input.advance();
        readLiteral(input, quote, false);
    }
    else {
        readWord(input);
    }
}
function readBits(input, endQuote) {
    while (input.next == 48 /* Ch._0 */ || input.next == 49 /* Ch._1 */)
        input.advance();
    if (endQuote && input.next == endQuote)
        input.advance();
}
function readNumber(input, sawDot) {
    for (;;) {
        if (input.next == 46 /* Ch.Dot */) {
            if (sawDot)
                break;
            sawDot = true;
        }
        else if (input.next < 48 /* Ch._0 */ || input.next > 57 /* Ch._9 */) {
            break;
        }
        input.advance();
    }
    if (input.next == 69 /* Ch.E */ || input.next == 101 /* Ch.e */) {
        input.advance();
        if (input.next == 43 /* Ch.Plus */ || input.next == 45 /* Ch.Dash */)
            input.advance();
        while (input.next >= 48 /* Ch._0 */ && input.next <= 57 /* Ch._9 */)
            input.advance();
    }
}
function eol(input) {
    while (!(input.next < 0 || input.next == 10 /* Ch.Newline */))
        input.advance();
}
function inString(ch, str) {
    for (let i = 0; i < str.length; i++)
        if (str.charCodeAt(i) == ch)
            return true;
    return false;
}
const Space = " \t\r\n";
function keywords(keywords, types, builtin) {
    let result = Object.create(null);
    result["true"] = result["false"] = Bool;
    result["null"] = result["unknown"] = Null;
    for (let kw of keywords.split(" "))
        if (kw)
            result[kw] = Keyword;
    for (let tp of types.split(" "))
        if (tp)
            result[tp] = Type;
    for (let kw of (builtin || "").split(" "))
        if (kw)
            result[kw] = Builtin;
    return result;
}
const SQLTypes = "array binary bit boolean char character clob date decimal double float int integer interval large national nchar nclob numeric object precision real smallint time timestamp varchar varying ";
const SQLKeywords = "absolute action add after all allocate alter and any are as asc assertion at authorization before begin between both breadth by call cascade cascaded case cast catalog check close collate collation column commit condition connect connection constraint constraints constructor continue corresponding count create cross cube current current_date current_default_transform_group current_transform_group_for_type current_path current_role current_time current_timestamp current_user cursor cycle data day deallocate declare default deferrable deferred delete depth deref desc describe descriptor deterministic diagnostics disconnect distinct do domain drop dynamic each else elseif end end-exec equals escape except exception exec execute exists exit external fetch first for foreign found from free full function general get global go goto grant group grouping handle having hold hour identity if immediate in indicator initially inner inout input insert intersect into is isolation join key language last lateral leading leave left level like limit local localtime localtimestamp locator loop map match method minute modifies module month names natural nesting new next no none not of old on only open option or order ordinality out outer output overlaps pad parameter partial path prepare preserve primary prior privileges procedure public read reads recursive redo ref references referencing relative release repeat resignal restrict result return returns revoke right role rollback rollup routine row rows savepoint schema scroll search second section select session session_user set sets signal similar size some space specific specifictype sql sqlexception sqlstate sqlwarning start state static system_user table temporary then timezone_hour timezone_minute to trailing transaction translation treat trigger under undo union unique unnest until update usage user using value values view when whenever where while with without work write year zone ";
const defaults = {
    backslashEscapes: false,
    hashComments: false,
    spaceAfterDashes: false,
    slashComments: false,
    doubleQuotedStrings: false,
    doubleDollarQuotedStrings: false,
    unquotedBitLiterals: false,
    treatBitsAsBytes: false,
    charSetCasts: false,
    plsqlQuotingMechanism: false,
    operatorChars: "*+\-%<>!=&|~^/",
    specialVar: "?",
    identifierQuotes: '"',
    caseInsensitiveIdentifiers: false,
    words: /*@__PURE__*/keywords(SQLKeywords, SQLTypes)
};
function dialect(spec, kws, types, builtin) {
    let dialect = {};
    for (let prop in defaults)
        dialect[prop] = (spec.hasOwnProperty(prop) ? spec : defaults)[prop];
    if (kws)
        dialect.words = keywords(kws, types || "", builtin);
    return dialect;
}
function tokensFor(d) {
    return new ExternalTokenizer(input => {
        var _a;
        let { next } = input;
        input.advance();
        if (inString(next, Space)) {
            while (inString(input.next, Space))
                input.advance();
            input.acceptToken(whitespace);
        }
        else if (next == 36 /* Ch.Dollar */ && d.doubleDollarQuotedStrings) {
            let tag = readWord(input, "");
            if (input.next == 36 /* Ch.Dollar */) {
                input.advance();
                readDoubleDollarLiteral(input, tag);
                input.acceptToken(String$1);
            }
        }
        else if (next == 39 /* Ch.SingleQuote */ || next == 34 /* Ch.DoubleQuote */ && d.doubleQuotedStrings) {
            readLiteral(input, next, d.backslashEscapes);
            input.acceptToken(String$1);
        }
        else if (next == 35 /* Ch.Hash */ && d.hashComments ||
            next == 47 /* Ch.Slash */ && input.next == 47 /* Ch.Slash */ && d.slashComments) {
            eol(input);
            input.acceptToken(LineComment);
        }
        else if (next == 45 /* Ch.Dash */ && input.next == 45 /* Ch.Dash */ &&
            (!d.spaceAfterDashes || input.peek(1) == 32 /* Ch.Space */)) {
            eol(input);
            input.acceptToken(LineComment);
        }
        else if (next == 47 /* Ch.Slash */ && input.next == 42 /* Ch.Star */) {
            input.advance();
            for (let depth = 1;;) {
                let cur = input.next;
                if (input.next < 0)
                    break;
                input.advance();
                if (cur == 42 /* Ch.Star */ && input.next == 47 /* Ch.Slash */) {
                    depth--;
                    input.advance();
                    if (!depth)
                        break;
                }
                else if (cur == 47 /* Ch.Slash */ && input.next == 42 /* Ch.Star */) {
                    depth++;
                    input.advance();
                }
            }
            input.acceptToken(BlockComment);
        }
        else if ((next == 101 /* Ch.e */ || next == 69 /* Ch.E */) && input.next == 39 /* Ch.SingleQuote */) {
            input.advance();
            readLiteral(input, 39 /* Ch.SingleQuote */, true);
            input.acceptToken(String$1);
        }
        else if ((next == 110 /* Ch.n */ || next == 78 /* Ch.N */) && input.next == 39 /* Ch.SingleQuote */ &&
            d.charSetCasts) {
            input.advance();
            readLiteral(input, 39 /* Ch.SingleQuote */, d.backslashEscapes);
            input.acceptToken(String$1);
        }
        else if (next == 95 /* Ch.Underscore */ && d.charSetCasts) {
            for (let i = 0;; i++) {
                if (input.next == 39 /* Ch.SingleQuote */ && i > 1) {
                    input.advance();
                    readLiteral(input, 39 /* Ch.SingleQuote */, d.backslashEscapes);
                    input.acceptToken(String$1);
                    break;
                }
                if (!isAlpha(input.next))
                    break;
                input.advance();
            }
        }
        else if (d.plsqlQuotingMechanism &&
            (next == 113 /* Ch.q */ || next == 81 /* Ch.Q */) && input.next == 39 /* Ch.SingleQuote */ &&
            input.peek(1) > 0 && !inString(input.peek(1), Space)) {
            let openDelim = input.peek(1);
            input.advance(2);
            readPLSQLQuotedLiteral(input, openDelim);
            input.acceptToken(String$1);
        }
        else if (next == 40 /* Ch.ParenL */) {
            input.acceptToken(ParenL);
        }
        else if (next == 41 /* Ch.ParenR */) {
            input.acceptToken(ParenR);
        }
        else if (next == 123 /* Ch.BraceL */) {
            input.acceptToken(BraceL);
        }
        else if (next == 125 /* Ch.BraceR */) {
            input.acceptToken(BraceR);
        }
        else if (next == 91 /* Ch.BracketL */) {
            input.acceptToken(BracketL);
        }
        else if (next == 93 /* Ch.BracketR */) {
            input.acceptToken(BracketR);
        }
        else if (next == 59 /* Ch.Semi */) {
            input.acceptToken(Semi);
        }
        else if (d.unquotedBitLiterals && next == 48 /* Ch._0 */ && input.next == 98 /* Ch.b */) {
            input.advance();
            readBits(input);
            input.acceptToken(Bits);
        }
        else if ((next == 98 /* Ch.b */ || next == 66 /* Ch.B */) && (input.next == 39 /* Ch.SingleQuote */ || input.next == 34 /* Ch.DoubleQuote */)) {
            const quoteStyle = input.next;
            input.advance();
            if (d.treatBitsAsBytes) {
                readLiteral(input, quoteStyle, d.backslashEscapes);
                input.acceptToken(Bytes);
            }
            else {
                readBits(input, quoteStyle);
                input.acceptToken(Bits);
            }
        }
        else if (next == 48 /* Ch._0 */ && (input.next == 120 /* Ch.x */ || input.next == 88 /* Ch.X */) ||
            (next == 120 /* Ch.x */ || next == 88 /* Ch.X */) && input.next == 39 /* Ch.SingleQuote */) {
            let quoted = input.next == 39 /* Ch.SingleQuote */;
            input.advance();
            while (isHexDigit(input.next))
                input.advance();
            if (quoted && input.next == 39 /* Ch.SingleQuote */)
                input.advance();
            input.acceptToken(Number);
        }
        else if (next == 46 /* Ch.Dot */ && input.next >= 48 /* Ch._0 */ && input.next <= 57 /* Ch._9 */) {
            readNumber(input, true);
            input.acceptToken(Number);
        }
        else if (next == 46 /* Ch.Dot */) {
            input.acceptToken(Dot);
        }
        else if (next >= 48 /* Ch._0 */ && next <= 57 /* Ch._9 */) {
            readNumber(input, false);
            input.acceptToken(Number);
        }
        else if (inString(next, d.operatorChars)) {
            while (inString(input.next, d.operatorChars))
                input.advance();
            input.acceptToken(Operator);
        }
        else if (inString(next, d.specialVar)) {
            if (input.next == next)
                input.advance();
            readWordOrQuoted(input);
            input.acceptToken(SpecialVar);
        }
        else if (inString(next, d.identifierQuotes)) {
            readLiteral(input, next, false);
            input.acceptToken(QuotedIdentifier);
        }
        else if (next == 58 /* Ch.Colon */ || next == 44 /* Ch.Comma */) {
            input.acceptToken(Punctuation);
        }
        else if (isAlpha(next)) {
            let word = readWord(input, String.fromCharCode(next));
            input.acceptToken(input.next == 46 /* Ch.Dot */ || input.peek(-word.length - 1) == 46 /* Ch.Dot */
                ? Identifier : (_a = d.words[word.toLowerCase()]) !== null && _a !== void 0 ? _a : Identifier);
        }
    });
}
const tokens = /*@__PURE__*/tokensFor(defaults);

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser$1 = /*@__PURE__*/LRParser.deserialize({
  version: 14,
  states: "%vQ]QQOOO#wQRO'#DSO$OQQO'#CwO%eQQO'#CxO%lQQO'#CyO%sQQO'#CzOOQQ'#DS'#DSOOQQ'#C}'#C}O'UQRO'#C{OOQQ'#Cv'#CvOOQQ'#C|'#C|Q]QQOOQOQQOOO'`QQO'#DOO(xQRO,59cO)PQQO,59cO)UQQO'#DSOOQQ,59d,59dO)cQQO,59dOOQQ,59e,59eO)jQQO,59eOOQQ,59f,59fO)qQQO,59fOOQQ-E6{-E6{OOQQ,59b,59bOOQQ-E6z-E6zOOQQ,59j,59jOOQQ-E6|-E6|O+VQRO1G.}O+^QQO,59cOOQQ1G/O1G/OOOQQ1G/P1G/POOQQ1G/Q1G/QP+kQQO'#C}O+rQQO1G.}O)PQQO,59cO,PQQO'#Cw",
  stateData: ",[~OtOSPOSQOS~ORUOSUOTUOUUOVROXSOZTO]XO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O^]ORvXSvXTvXUvXVvXXvXZvX]vX_vX`vXavXbvXcvXdvXevXfvXgvXhvX~OsvX~P!jOa_Ob_Oc_O~ORUOSUOTUOUUOVROXSOZTO^tO_UO`UOa`Ob`Oc`OdUOeUOfUOgUOhUO~OWaO~P$ZOYcO~P$ZO[eO~P$ZORUOSUOTUOUUOVROXSOZTO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O]hOsoX~P%zOajObjOcjO~O^]ORkaSkaTkaUkaVkaXkaZka]ka_ka`kaakabkackadkaekafkagkahka~Oska~P'kO^]O~OWvXYvX[vX~P!jOWnO~P$ZOYoO~P$ZO[pO~P$ZO^]ORkiSkiTkiUkiVkiXkiZki]ki_ki`kiakibkickidkiekifkigkihki~Oski~P)xOWkaYka[ka~P'kO]hO~P$ZOWkiYki[ki~P)xOasObsOcsO~O",
  goto: "#hwPPPPPPPPPPPPPPPPPPPPPPPPPPx||||!Y!^!d!xPPP#[TYOZeUORSTWZbdfqT[OZQZORiZSWOZQbRQdSQfTZgWbdfqQ^PWk^lmrQl_Qm`RrseVORSTWZbdfq",
  nodeNames: "⚠ LineComment BlockComment String Number Bool Null ( ) { } [ ] ; . Operator Punctuation SpecialVar Identifier QuotedIdentifier Keyword Type Bits Bytes Builtin Script Statement CompositeIdentifier Parens Braces Brackets Statement",
  maxTerm: 38,
  nodeProps: [
    ["isolate", -4,1,2,3,19,""]
  ],
  skippedNodes: [0,1,2],
  repeatNodeCount: 3,
  tokenData: "RORO",
  tokenizers: [0, tokens],
  topRules: {"Script":[0,25]},
  tokenPrec: 0
});

function tokenBefore(tree) {
    let cursor = tree.cursor().moveTo(tree.from, -1);
    while (/Comment/.test(cursor.name))
        cursor.moveTo(cursor.from, -1);
    return cursor.node;
}
function idName(doc, node) {
    let text = doc.sliceString(node.from, node.to);
    let quoted = /^([`'"])(.*)\1$/.exec(text);
    return quoted ? quoted[2] : text;
}
function plainID(node) {
    return node && (node.name == "Identifier" || node.name == "QuotedIdentifier");
}
function pathFor(doc, id) {
    if (id.name == "CompositeIdentifier") {
        let path = [];
        for (let ch = id.firstChild; ch; ch = ch.nextSibling)
            if (plainID(ch))
                path.push(idName(doc, ch));
        return path;
    }
    return [idName(doc, id)];
}
function parentsFor(doc, node) {
    for (let path = [];;) {
        if (!node || node.name != ".")
            return path;
        let name = tokenBefore(node);
        if (!plainID(name))
            return path;
        path.unshift(idName(doc, name));
        node = tokenBefore(name);
    }
}
function sourceContext(state, startPos) {
    let pos = syntaxTree(state).resolveInner(startPos, -1);
    let aliases = getAliases(state.doc, pos);
    if (pos.name == "Identifier" || pos.name == "QuotedIdentifier" || pos.name == "Keyword") {
        return { from: pos.from,
            quoted: pos.name == "QuotedIdentifier" ? state.doc.sliceString(pos.from, pos.from + 1) : null,
            parents: parentsFor(state.doc, tokenBefore(pos)),
            aliases };
    }
    if (pos.name == ".") {
        return { from: startPos, quoted: null, parents: parentsFor(state.doc, pos), aliases };
    }
    else {
        return { from: startPos, quoted: null, parents: [], empty: true, aliases };
    }
}
const EndFrom = /*@__PURE__*/new Set(/*@__PURE__*/"where group having order union intersect except all distinct limit offset fetch for".split(" "));
function getAliases(doc, at) {
    let statement;
    for (let parent = at; !statement; parent = parent.parent) {
        if (!parent)
            return null;
        if (parent.name == "Statement")
            statement = parent;
    }
    let aliases = null;
    for (let scan = statement.firstChild, sawFrom = false, prevID = null; scan; scan = scan.nextSibling) {
        let kw = scan.name == "Keyword" ? doc.sliceString(scan.from, scan.to).toLowerCase() : null;
        let alias = null;
        if (!sawFrom) {
            sawFrom = kw == "from";
        }
        else if (kw == "as" && prevID && plainID(scan.nextSibling)) {
            alias = idName(doc, scan.nextSibling);
        }
        else if (kw && EndFrom.has(kw)) {
            break;
        }
        else if (prevID && plainID(scan)) {
            alias = idName(doc, scan);
        }
        if (alias) {
            if (!aliases)
                aliases = Object.create(null);
            aliases[alias] = pathFor(doc, prevID);
        }
        prevID = /Identifier$/.test(scan.name) ? scan : null;
    }
    return aliases;
}
function maybeQuoteCompletions(quote, completions) {
    if (!quote)
        return completions;
    return completions.map(c => ({ ...c, label: c.label[0] == quote ? c.label : quote + c.label + quote, apply: undefined }));
}
const Span = /^\w*$/, QuotedSpan = /^[`'"]?\w*[`'"]?$/;
function isSelfTag(namespace) {
    return namespace.self && typeof namespace.self.label == "string";
}
class CompletionLevel {
    constructor(idQuote, idCaseInsensitive) {
        this.idQuote = idQuote;
        this.idCaseInsensitive = idCaseInsensitive;
        this.list = [];
        this.children = undefined;
    }
    child(name) {
        let children = this.children || (this.children = Object.create(null));
        let found = children[name];
        if (found)
            return found;
        if (name && !this.list.some(c => c.label == name))
            this.list.push(nameCompletion(name, "type", this.idQuote, this.idCaseInsensitive));
        return (children[name] = new CompletionLevel(this.idQuote, this.idCaseInsensitive));
    }
    maybeChild(name) {
        return this.children ? this.children[name] : null;
    }
    addCompletion(option) {
        let found = this.list.findIndex(o => o.label == option.label);
        if (found > -1)
            this.list[found] = option;
        else
            this.list.push(option);
    }
    addCompletions(completions) {
        for (let option of completions)
            this.addCompletion(typeof option == "string" ? nameCompletion(option, "property", this.idQuote, this.idCaseInsensitive) : option);
    }
    addNamespace(namespace) {
        if (Array.isArray(namespace)) {
            this.addCompletions(namespace);
        }
        else if (isSelfTag(namespace)) {
            this.addNamespace(namespace.children);
        }
        else {
            this.addNamespaceObject(namespace);
        }
    }
    addNamespaceObject(namespace) {
        for (let name of Object.keys(namespace)) {
            let children = namespace[name], self = null;
            let parts = name.replace(/\\?\./g, p => p == "." ? "\0" : p).split("\0");
            let scope = this;
            if (isSelfTag(children)) {
                self = children.self;
                children = children.children;
            }
            for (let i = 0; i < parts.length; i++) {
                if (self && i == parts.length - 1)
                    scope.addCompletion(self);
                scope = scope.child(parts[i].replace(/\\\./g, "."));
            }
            scope.addNamespace(children);
        }
    }
}
function nameCompletion(label, type, idQuote, idCaseInsensitive) {
    if ((new RegExp("^[a-z_][a-z_\\d]*$", idCaseInsensitive ? "i" : "")).test(label))
        return { label, type };
    return { label, type, apply: idQuote + label + idQuote };
}
// Some of this is more gnarly than it has to be because we're also
// supporting the deprecated, not-so-well-considered style of
// supplying the schema (dotted property names for schemas, separate
// `tables` and `schemas` completions).
function completeFromSchema(schema, tables, schemas, defaultTableName, defaultSchemaName, dialect) {
    var _a;
    let idQuote = ((_a = dialect === null || dialect === void 0 ? void 0 : dialect.spec.identifierQuotes) === null || _a === void 0 ? void 0 : _a[0]) || '"';
    let top = new CompletionLevel(idQuote, !!(dialect === null || dialect === void 0 ? void 0 : dialect.spec.caseInsensitiveIdentifiers));
    let defaultSchema = defaultSchemaName ? top.child(defaultSchemaName) : null;
    top.addNamespace(schema);
    if (tables)
        (defaultSchema || top).addCompletions(tables);
    if (schemas)
        top.addCompletions(schemas);
    if (defaultSchema)
        top.addCompletions(defaultSchema.list);
    if (defaultTableName)
        top.addCompletions((defaultSchema || top).child(defaultTableName).list);
    return (context) => {
        let { parents, from, quoted, empty, aliases } = sourceContext(context.state, context.pos);
        if (empty && !context.explicit)
            return null;
        if (aliases && parents.length == 1)
            parents = aliases[parents[0]] || parents;
        let level = top;
        for (let name of parents) {
            while (!level.children || !level.children[name]) {
                if (level == top && defaultSchema)
                    level = defaultSchema;
                else if (level == defaultSchema && defaultTableName)
                    level = level.child(defaultTableName);
                else
                    return null;
            }
            let next = level.maybeChild(name);
            if (!next)
                return null;
            level = next;
        }
        let quoteAfter = quoted && context.state.sliceDoc(context.pos, context.pos + 1) == quoted;
        let options = level.list;
        if (level == top && aliases)
            options = options.concat(Object.keys(aliases).map(name => ({ label: name, type: "constant" })));
        return {
            from,
            to: quoteAfter ? context.pos + 1 : undefined,
            options: maybeQuoteCompletions(quoted, options),
            validFor: quoted ? QuotedSpan : Span
        };
    };
}
function completionType(tokenType) {
    return tokenType == Type ? "type" : tokenType == Keyword ? "keyword" : "variable";
}
function completeKeywords(keywords, upperCase, build) {
    let completions = Object.keys(keywords)
        .map(keyword => build(upperCase ? keyword.toUpperCase() : keyword, completionType(keywords[keyword])));
    return ifNotIn(["QuotedIdentifier", "SpecialVar", "String", "LineComment", "BlockComment", "."], completeFromList(completions));
}

let parser = /*@__PURE__*/parser$1.configure({
    props: [
        /*@__PURE__*/indentNodeProp.add({
            Statement: /*@__PURE__*/continuedIndent()
        }),
        /*@__PURE__*/foldNodeProp.add({
            Statement(tree, state) { return { from: Math.min(tree.from + 100, state.doc.lineAt(tree.from).to), to: tree.to }; },
            BlockComment(tree) { return { from: tree.from + 2, to: tree.to - 2 }; }
        }),
        /*@__PURE__*/styleTags({
            Keyword: tags.keyword,
            Type: tags.typeName,
            Builtin: /*@__PURE__*/tags.standard(tags.name),
            Bits: tags.number,
            Bytes: tags.string,
            Bool: tags.bool,
            Null: tags.null,
            Number: tags.number,
            String: tags.string,
            Identifier: tags.name,
            QuotedIdentifier: /*@__PURE__*/tags.special(tags.string),
            SpecialVar: /*@__PURE__*/tags.special(tags.name),
            LineComment: tags.lineComment,
            BlockComment: tags.blockComment,
            Operator: tags.operator,
            "Semi Punctuation": tags.punctuation,
            "( )": tags.paren,
            "{ }": tags.brace,
            "[ ]": tags.squareBracket
        })
    ]
});
/**
Represents an SQL dialect.
*/
class SQLDialect {
    constructor(
    /**
    @internal
    */
    dialect, 
    /**
    The language for this dialect.
    */
    language, 
    /**
    The spec used to define this dialect.
    */
    spec) {
        this.dialect = dialect;
        this.language = language;
        this.spec = spec;
    }
    /**
    Returns the language for this dialect as an extension.
    */
    get extension() { return this.language.extension; }
    /**
    Reconfigure the parser used by this dialect. Returns a new
    dialect object.
    */
    configureLanguage(options, name) {
        return new SQLDialect(this.dialect, this.language.configure(options, name), this.spec);
    }
    /**
    Define a new dialect.
    */
    static define(spec) {
        let d = dialect(spec, spec.keywords, spec.types, spec.builtin);
        let language = LRLanguage.define({
            name: "sql",
            parser: parser.configure({
                tokenizers: [{ from: tokens, to: tokensFor(d) }]
            }),
            languageData: {
                commentTokens: { line: "--", block: { open: "/*", close: "*/" } },
                closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] }
            }
        });
        return new SQLDialect(d, language, spec);
    }
}
function defaultKeyword(label, type) { return { label, type, boost: -1 }; }
/**
Returns a completion source that provides keyword completion for
the given SQL dialect.
*/
function keywordCompletionSource(dialect, upperCase = false, build) {
    return completeKeywords(dialect.dialect.words, upperCase, build || defaultKeyword);
}
/**
Returns a completion sources that provides schema-based completion
for the given configuration.
*/
function schemaCompletionSource(config) {
    return config.schema ? completeFromSchema(config.schema, config.tables, config.schemas, config.defaultTable, config.defaultSchema, config.dialect || StandardSQL)
        : () => null;
}
function schemaCompletion(config) {
    return config.schema ? (config.dialect || StandardSQL).language.data.of({
        autocomplete: schemaCompletionSource(config)
    }) : [];
}
/**
SQL language support for the given SQL dialect, with keyword
completion, and, if provided, schema-based completion as extra
extensions.
*/
function sql(config = {}) {
    let lang = config.dialect || StandardSQL;
    return new LanguageSupport(lang.language, [
        schemaCompletion(config),
        lang.language.data.of({
            autocomplete: keywordCompletionSource(lang, config.upperCaseKeywords, config.keywordCompletion)
        })
    ]);
}
/**
The standard SQL dialect.
*/
const StandardSQL = /*@__PURE__*/SQLDialect.define({});
/**
Dialect for [PostgreSQL](https://www.postgresql.org).
*/
const PostgreSQL = /*@__PURE__*/SQLDialect.define({
    charSetCasts: true,
    doubleDollarQuotedStrings: true,
    operatorChars: "+-*/<>=~!@#%^&|`?",
    specialVar: "",
    keywords: SQLKeywords + "abort abs absent access according ada admin aggregate alias also always analyse analyze array_agg array_max_cardinality asensitive assert assignment asymmetric atomic attach attribute attributes avg backward base64 begin_frame begin_partition bernoulli bit_length blocked bom cache called cardinality catalog_name ceil ceiling chain char_length character_length character_set_catalog character_set_name character_set_schema characteristics characters checkpoint class class_origin cluster coalesce cobol collation_catalog collation_name collation_schema collect column_name columns command_function command_function_code comment comments committed concurrently condition_number configuration conflict connection_name constant constraint_catalog constraint_name constraint_schema contains content control conversion convert copy corr cost covar_pop covar_samp csv cume_dist current_catalog current_row current_schema cursor_name database datalink datatype datetime_interval_code datetime_interval_precision db debug defaults defined definer degree delimiter delimiters dense_rank depends derived detach detail dictionary disable discard dispatch dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue document dump dynamic_function dynamic_function_code element elsif empty enable encoding encrypted end_frame end_partition endexec enforced enum errcode error event every exclude excluding exclusive exp explain expression extension extract family file filter final first_value flag floor following force foreach fortran forward frame_row freeze fs functions fusion generated granted greatest groups handler header hex hierarchy hint id ignore ilike immediately immutable implementation implicit import include including increment indent index indexes info inherit inherits inline insensitive instance instantiable instead integrity intersection invoker isnull key_member key_type label lag last_value lead leakproof least length library like_regex link listen ln load location lock locked log logged lower mapping matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text min minvalue mod mode more move multiset mumps name namespace nfc nfd nfkc nfkd nil normalize normalized nothing notice notify notnull nowait nth_value ntile nullable nullif nulls number occurrences_regex octet_length octets off offset oids operator options ordering others over overlay overriding owned owner parallel parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partition pascal passing passthrough password percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding prepared print_strict_params procedural procedures program publication query quote raise range rank reassign recheck recovery refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex rename repeatable replace replica requiring reset respect restart restore result_oid returned_cardinality returned_length returned_octet_length returned_sqlstate returning reverse routine_catalog routine_name routine_schema routines row_count row_number rowtype rule scale schema_name schemas scope scope_catalog scope_name scope_schema security selective self sensitive sequence sequences serializable server server_name setof share show simple skip slice snapshot source specific_name sqlcode sqlerror sqrt stable stacked standalone statement statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time table_name tables tablesample tablespace temp template ties token top_level_count transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex trigger_catalog trigger_name trigger_schema trim trim_array truncate trusted type types uescape unbounded uncommitted unencrypted unlink unlisten unlogged unnamed untyped upper uri use_column use_variable user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema vacuum valid validate validator value_of var_pop var_samp varbinary variable_conflict variadic verbose version versioning views volatile warning whitespace width_bucket window within wrapper xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate yes",
    types: SQLTypes + "bigint int8 bigserial serial8 varbit bool box bytea cidr circle precision float8 inet int4 json jsonb line lseg macaddr macaddr8 money numeric pg_lsn point polygon float4 int2 smallserial serial2 serial serial4 text timetz timestamptz tsquery tsvector txid_snapshot uuid xml"
});
const MySQLKeywords = "accessible algorithm analyze asensitive authors auto_increment autocommit avg avg_row_length binlog btree cache catalog_name chain change changed checkpoint checksum class_origin client_statistics coalesce code collations columns comment committed completion concurrent consistent contains contributors convert database databases day_hour day_microsecond day_minute day_second delay_key_write delayed delimiter des_key_file dev_pop dev_samp deviance directory disable discard distinctrow div dual dumpfile enable enclosed ends engine engines enum errors escaped even event events every explain extended fast field fields flush force found_rows fulltext grants handler hash high_priority hosts hour_microsecond hour_minute hour_second ignore ignore_server_ids import index index_statistics infile innodb insensitive insert_method install invoker iterate keys kill linear lines list load lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modify mutex mysql_errno no_write_to_binlog offline offset one online optimize optionally outfile pack_keys parser partition partitions password phase plugin plugins prev processlist profile profiles purge query quick range read_write rebuild recover regexp relaylog remove rename reorganize repair repeatable replace require resume rlike row_format rtree schedule schema_name schemas second_microsecond security sensitive separator serializable server share show slave slow snapshot soname spatial sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result ssl starting starts std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace terminated triggers truncate uncommitted uninstall unlock upgrade use use_frm user_resources user_statistics utc_date utc_time utc_timestamp variables views warnings xa xor year_month zerofill";
const MySQLTypes = SQLTypes + "bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int1 int2 int3 int4 int8 float4 float8 varbinary varcharacter precision datetime unsigned signed";
const MySQLBuiltin = "charset clear edit ego help nopager notee nowarning pager print prompt quit rehash source status system tee";
/**
[MySQL](https://dev.mysql.com/) dialect.
*/
const MySQL = /*@__PURE__*/SQLDialect.define({
    operatorChars: "*+-%<>!=&|^",
    charSetCasts: true,
    doubleQuotedStrings: true,
    unquotedBitLiterals: true,
    hashComments: true,
    spaceAfterDashes: true,
    specialVar: "@?",
    identifierQuotes: "`",
    keywords: SQLKeywords + "group_concat " + MySQLKeywords,
    types: MySQLTypes,
    builtin: MySQLBuiltin
});
/**
Variant of [`MySQL`](https://codemirror.net/6/docs/ref/#lang-sql.MySQL) for
[MariaDB](https://mariadb.org/).
*/
const MariaSQL = /*@__PURE__*/SQLDialect.define({
    operatorChars: "*+-%<>!=&|^",
    charSetCasts: true,
    doubleQuotedStrings: true,
    unquotedBitLiterals: true,
    hashComments: true,
    spaceAfterDashes: true,
    specialVar: "@?",
    identifierQuotes: "`",
    keywords: SQLKeywords + "always generated groupby_concat hard persistent shutdown soft virtual " + MySQLKeywords,
    types: MySQLTypes,
    builtin: MySQLBuiltin
});
/**
SQL dialect for Microsoft [SQL
Server](https://www.microsoft.com/en-us/sql-server).
*/
const MSSQL = /*@__PURE__*/SQLDialect.define({
    keywords: SQLKeywords + "trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock pivot readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx unpivot updlock with",
    types: SQLTypes + "bigint smallint smallmoney tinyint money real text nvarchar ntext varbinary image hierarchyid uniqueidentifier sql_variant xml",
    builtin: "binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id",
    operatorChars: "*+-%<>!=^&|/",
    specialVar: "@"
});
/**
[SQLite](https://sqlite.org/) dialect.
*/
const SQLite = /*@__PURE__*/SQLDialect.define({
    keywords: SQLKeywords + "abort analyze attach autoincrement conflict database detach exclusive fail glob ignore index indexed instead isnull notnull offset plan pragma query raise regexp reindex rename replace temp vacuum virtual",
    types: SQLTypes + "bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int2 int8 unsigned signed real",
    builtin: "auth backup bail changes clone databases dbinfo dump echo eqp explain fullschema headers help import imposter indexes iotrace lint load log mode nullvalue once print prompt quit restore save scanstats separator shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width",
    operatorChars: "*+-%<>!=&|/~",
    identifierQuotes: "`\"",
    specialVar: "@:?$"
});
/**
Dialect for [Cassandra](https://cassandra.apache.org/)'s SQL-ish query language.
*/
const Cassandra = /*@__PURE__*/SQLDialect.define({
    keywords: "add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime infinity NaN",
    types: SQLTypes + "ascii bigint blob counter frozen inet list map static text timeuuid tuple uuid varint",
    slashComments: true
});
/**
[PL/SQL](https://en.wikipedia.org/wiki/PL/SQL) dialect.
*/
const PLSQL = /*@__PURE__*/SQLDialect.define({
    keywords: SQLKeywords + "abort accept access add all alter and any arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body by case cast char_base check close cluster clusters colauth column comment commit compress connected constant constraint crash create current currval cursor data_base database dba deallocate debugoff debugon declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry exception exception_init exchange exclusive exists external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base of off offline on online only option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw rebuild record ref references refresh rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work",
    builtin: "appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define echo editfile embedded feedback flagger flush heading headsep instance linesize lno loboffset logsource longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar repfooter repheader serveroutput shiftinout show showmode spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout timing trimout trimspool ttitle underline verify version wrap",
    types: SQLTypes + "ascii bfile bfilename bigserial bit blob dec long number nvarchar nvarchar2 serial smallint string text uid varchar2 xml",
    operatorChars: "*/+-%<>!=~",
    doubleQuotedStrings: true,
    charSetCasts: true,
    plsqlQuotingMechanism: true
});

export { Cassandra, MSSQL, MariaSQL, MySQL, PLSQL, PostgreSQL, SQLDialect, SQLite, StandardSQL, keywordCompletionSource, schemaCompletionSource, sql };
