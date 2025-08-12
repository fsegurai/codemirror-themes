import { N as NodeProp, E as EditorState, F as Facet, T as Tree, V as ViewPlugin, a as EditorView, I as IterMode, l as logException, b as TreeFragment, P as Parser, c as NodeType, S as StateEffect, d as StateField, t as tags, s as styleTags, D as Decoration, e as Direction, m as defineCSSCompletionSource, L as LRParser, f as ExternalTokenizer } from './playground-BiGk7PXY.js';

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
/**
[Fold](https://codemirror.net/6/docs/ref/#language.foldNodeProp) function that folds everything but
the first and the last child of a syntax node. Useful for nodes
that start and end with delimiters.
*/
function foldInside(node) {
    let first = node.firstChild, last = node.lastChild;
    return first && first.to < last.from ? { from: first.to, to: last.type.isError ? node.to : last.from } : null;
}
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
const descendantOp = 110,
  Unit = 1,
  openArgList = 2;

const space = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197,
    8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288];
function isAlpha(ch) { return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 161; }
function isDigit(ch) { return ch >= 48 && ch <= 57; }
const argList = /*@__PURE__*/new ExternalTokenizer((input, stack) => {
    if (input.next == 40 /* Ch.parenL */) {
        let prev = input.peek(-1);
        if (isAlpha(prev) || isDigit(prev) || prev == 95 /* Ch.underscore */ || prev == 45 /* Ch.dash */)
            input.acceptToken(openArgList, 1);
    }
});
const descendant = /*@__PURE__*/new ExternalTokenizer(input => {
    if (space.indexOf(input.peek(-1)) > -1) {
        let { next } = input;
        if (isAlpha(next) || next == 95 /* Ch.underscore */ || next == 35 /* Ch.hash */ || next == 46 /* Ch.period */ ||
            next == 91 /* Ch.bracketL */ || next == 58 /* Ch.colon */ || next == 45 /* Ch.dash */)
            input.acceptToken(descendantOp);
    }
});
const unitToken = /*@__PURE__*/new ExternalTokenizer(input => {
    if (space.indexOf(input.peek(-1)) < 0) {
        let { next } = input;
        if (next == 37 /* Ch.percent */) {
            input.advance();
            input.acceptToken(Unit);
        }
        if (isAlpha(next)) {
            do {
                input.advance();
            } while (isAlpha(input.next));
            input.acceptToken(Unit);
        }
    }
});

const lessHighlighting = /*@__PURE__*/styleTags({
    "import charset namespace keyframes media supports when": tags.definitionKeyword,
    "from to selector": tags.keyword,
    NamespaceName: tags.namespace,
    KeyframeName: tags.labelName,
    TagName: tags.tagName,
    ClassName: tags.className,
    PseudoClassName: /*@__PURE__*/tags.constant(tags.className),
    IdName: tags.labelName,
    "FeatureName PropertyName PropertyVariable": tags.propertyName,
    AttributeName: tags.attributeName,
    NumberLiteral: tags.number,
    KeywordQuery: tags.keyword,
    UnaryQueryOp: tags.operatorKeyword,
    "CallTag ValueName": tags.atom,
    VariableName: tags.variableName,
    "AtKeyword Interpolation": /*@__PURE__*/tags.special(tags.variableName),
    Callee: tags.operatorKeyword,
    Unit: tags.unit,
    "UniversalSelector NestingSelector": tags.definitionOperator,
    MatchOp: tags.compareOperator,
    "ChildOp SiblingOp, LogicOp": tags.logicOperator,
    BinOp: tags.arithmeticOperator,
    Important: tags.modifier,
    "Comment LineComment": tags.blockComment,
    ColorLiteral: tags.color,
    "ParenthesizedContent StringLiteral": tags.string,
    Escape: /*@__PURE__*/tags.special(tags.string),
    ": ...": tags.punctuation,
    "PseudoOp #": tags.derefOperator,
    "; ,": tags.separator,
    "( )": tags.paren,
    "[ ]": tags.squareBracket,
    "{ }": tags.brace
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_identifier = {__proto__:null,lang:40, "nth-child":40, "nth-last-child":40, "nth-of-type":40, "nth-last-of-type":40, dir:40, "host-context":40, and:244, or:244, not:74, only:74, url:86, "url-prefix":86, domain:86, regexp:86, when:117, selector:142, from:172, to:174};
const spec_AtKeyword = {__proto__:null,"@import":126, "@plugin":126, "@media":152, "@charset":156, "@namespace":160, "@keyframes":166, "@supports":178};
const parser = /*@__PURE__*/LRParser.deserialize({
  version: 14,
  states: "@^O!gQWOOO!nQaO'#CeOOQP'#Cd'#CdO$RQWO'#CgO$xQaO'#EaO%cQWO'#CiO%kQWO'#DZO%pQWO'#D^O%uQaO'#DfOOQP'#Es'#EsO'YQWO'#DlO'yQWO'#DyO(QQWO'#D{O(xQWO'#D}O)TQWO'#EQO'bQWO'#EWO)YQ`O'#FTO)]Q`O'#FTO)hQ`O'#FTO)vQWO'#EYOOQO'#Er'#ErOOQO'#FV'#FVOOQO'#Ec'#EcO){QWO'#EqO*WQWO'#EqQOQWOOOOQP'#Ch'#ChOOQP,59R,59RO$RQWO,59RO*bQWO'#EdO+PQWO,58|O+_QWO,59TO%kQWO,59uO%pQWO,59xO*bQWO,59{O*bQWO,59}OOQO'#De'#DeO*bQWO,5:OO,bQpO'#E}O,iQWO'#DkOOQO,58|,58|O(QQWO,58|O,pQWO,5:{OOQO,5:{,5:{OOQT'#Cl'#ClO-UQeO,59TO.cQ[O,59TOOQP'#D]'#D]OOQP,59u,59uOOQO'#D_'#D_O.hQpO,59xOOQO'#EZ'#EZO.pQ`O,5;oOOQO,5;o,5;oO/OQWO,5:WO/VQWO,5:WOOQS'#Dn'#DnO/rQWO'#DsO/yQ!fO'#FRO0eQWO'#DtOOQS'#FS'#FSO+YQWO,5:eO'bQWO'#DrOOQS'#Cu'#CuO(QQWO'#CwO0jQ!hO'#CyO2^Q!fO,5:gO2oQWO'#DWOOQS'#Ex'#ExO(QQWO'#DQOOQO'#EP'#EPO2tQWO,5:iO2yQWO,5:iOOQO'#ES'#ESO3RQWO,5:lO3WQ!fO,5:rO3iQ`O'#EkO.pQ`O,5;oOOQO,5:|,5:|O3zQWO,5:tOOQO,5:},5:}O4XQWO,5;]OOQO-E8a-E8aOOQP1G.m1G.mOOQP'#Ce'#CeO5RQaO,5;OOOQP'#Df'#DfOOQO-E8b-E8bOOQO1G.h1G.hO(QQWO1G.hO5fQWO1G.hO5nQeO1G.oO.cQ[O1G.oOOQP1G/a1G/aO6{QpO1G/dO7fQaO1G/gO8cQaO1G/iO9`QaO1G/jO:]Q!fO'#FOO:yQ!fO'#ExOOQO'#FO'#FOOOQO,5;i,5;iO<^QWO,5;iO<iQWO,5:VO<nQ!fO1G.hOOQO1G0g1G0gO=PQWO'#CnOOQP1G.o1G.oO=WQWO'#CqOOQP1G/d1G/dO(QQWO1G/dO=_Q`O1G1ZOOQO1G1Z1G1ZO=mQWO1G/rO=rQ!fO'#FQO>WQWO1G/rO>]Q!fO'#DnO>qQWO,5:ZO>vQ!fO,5:_OOQO'#DP'#DPO'bQWO,5:]O?XQWO'#DwOOQS,5:b,5:bO?`QWO,5:dO'bQWO'#EiO?gQWO,5;mO*bQWO,5:`OOQO1G0P1G0PO?uQ!fO,5:^O@aQ!fO,59cOOQS,59e,59eO(QQWO,59iOOQS,59n,59nO@rQWO,59pOOQO1G0R1G0RO@yQ#tO,59rOARQ!fO,59lOOQO1G0T1G0TOBrQWO1G0TOBwQWO'#ETOOQO1G0W1G0WOOQO1G0^1G0^OOQO,5;V,5;VOOQO-E8i-E8iOCVQ!fO1G0bOCvQWO1G0`O%kQWO'#E_O$RQWO'#E`OEZQWO'#E^OOQO1G0b1G0bPEkQWO'#EcO<nQ!fO7+$SOOQO7+$S7+$SO(QQWO7+$SOOQP7+$Z7+$ZOOQP7+%O7+%OO(QQWO7+%OOEpQ!fO'#EeOF}QWO,5;jO(QQWO,5;jOOQO,5;j,5;jO+gQpO'#EgOG[QWO1G1TOOQO1G1T1G1TOOQO1G/q1G/qOGgQaO'#EvOGnQWO,59YOGsQWO'#EwOG}QWO,59]OHSQ!fO7+%OOOQO7+&u7+&uOOQO7+%^7+%^O(QQWO'#EhOHeQWO,5;lOHmQWO7+%^O(QQWO1G/uOOQS1G/y1G/yOOQS1G/w1G/wOHrQWO,5:cOHwQ!fO1G0OOOQS1G0O1G0OOIYQ!fO,5;TOOQO-E8g-E8gOItQaO1G/zOOQS1G.}1G.}OOQS1G/T1G/TOI{Q!fO1G/[OOQS1G/[1G/[OJ^QWO1G/^OOQO7+%o7+%oOJcQYO'#CyO+YQWO'#EjOJkQWO,5:oOOQO,5:o,5:oOJyQ!fO'#ElO(QQWO'#ElOL^QWO7+%|OOQO7+%|7+%|OOQO7+%z7+%zOOQO,5:y,5:yOOQO,5:z,5:zOLqQaO,5:xOOQO,5:x,5:xOOQO<<Gn<<GnO<nQ!fO<<GnOMRQ!fO<<HjOOQO-E8c-E8cOMdQWO1G1UOOQO,5;R,5;ROOQO-E8e-E8eOOQO7+&o7+&oOMqQWO,5;bOOQP1G.t1G.tO(QQWO'#EfOMyQWO,5;cOOQT1G.w1G.wOOQP<<Hj<<HjONRQ!fO,5;SOOQO-E8f-E8fO/OQWO<<HxONgQWO7+%aOOQS1G/}1G/}OOQS7+%j7+%jOOQS7+%f7+%fOOQS7+$v7+$vOOQS7+$x7+$xOOQO,5;U,5;UOOQO-E8h-E8hOOQO1G0Z1G0ZONnQ!fO,5;WOOQO-E8j-E8jOOQO<<Ih<<IhOOQO1G0d1G0dOOQOAN=YAN=YOOQPAN>UAN>UO!!RQWO,5;QOOQO-E8d-E8dO!!]QWOAN>dOOQS<<H{<<H{OOQOG24OG24O",
  stateData: "!!n~O#dOSROSSOS~OVXOYXO^TO_TOfaOgbOoaOpWOyVO!OUO!aYO!nZO!p[O!r]O!u^O!{_O#hPO#iRO~O#a#eP~P]O^XX^!}X_XXcXXjXXp!}XyXX!OXX!UXX!ZXX![XX!^XX#PXX#aXX#bXX#iXX#oXX#pXX#p!}X#x!}X!]XX~O#hjO~O^oO_oOcmOyqO!OpO!UrO#bsO#ilO#otO#ptO~OjvO![yO!^wO#P{O!Z#TX#a#TX!]#TX~P$WOd!OO#h|O~O#h!PO~O#h!RO~O#h!TO#p!VO#x!VO^!YX^#wX_!YXc!YXj!YXy!YX!O!YX!U!YX!Z!YX![!YX!^!YX#P!YX#a!YX#b!YX#i!YX#o!YX#p!YX!]!YX~Oj!XOn!WO~Og!^Oj!ZOo!^Op!^Ou!`O!i!]O#h!YO~O!^#uP~P'bOf!fOg!fOh!fOj!bOl!fOn!fOo!fOp!fOu!gO{!eO#h!aO#m!cO~On!iO{!eO#h!hO~O#h!kO~Op!nO#p!VO#x!VO^#wX~OjvO#p!VO#x!VO^#wX~O^!qO~O!Z!rO#a#eX!]#eX~O#a#eX!]#eX~P]OVXOYXO^TO_TOp!xOyVO!OUO#h!vO#iRO~OcmOjvO![!{O!^wO~Od#OO#h|O~Of!fOg#VOh!fOj!bOl!fOn!fOo!fOp!fOu!gO{!eO#h!aO#m!cO#s#WO~Oa#XO~P+gO!]#eP~P]O![!{O!^wO#P#]O!Z#Ta#a#Ta!]#Ta~OQ#^O^]a_]ac]aj]ay]a!O]a!U]a!Z]a![]a!^]a#P]a#a]a#b]a#i]a#o]a#p]a!]]aa]a~OQ#`O~Ow#aO!S#bO~Op!nO#p#dO#x#dO^#wa~O!Z#uP~P'bOa#tP~P(QOg!^Oj!ZOo!^Op!^Ou!`O!i!]O~O#h#hO~P/^OQ#mOc#pOr#lOy#oO#n#kO!^#uX!Z#uXa#uX~Oj#rO~OP#vOQmXrmXymX!ZmX#nmX^mXamXcmXfmXgmXhmXjmXlmXnmXomXpmXumX{mX#hmX#mmX!^mX#PmX#amXwmX!]mX~OQ#`Or#wOy#yO!Z#zO#n#kO~Oj#{O~O!Z#}O~On$OO{!eO~O!^$PO~OQ#mOr#lOy#oO!^wO#n#kO~O#h!TO^#_Xp#_X#p#_X#x#_X~O!O$WO!^wO#i$XO~P(QO!Z!rO#a#ea!]#ea~O^oO_oOyqO!OpO!UrO#bsO#ilO#otO#ptO~Oc#Waj#Wa![#Wa!^#Waa#Wa~P4dO![$_O!^wO~OQ#^O^]i_]ic]ij]iy]i!O]i!U]i!Z]i![]i!^]i#P]i#a]i#b]i#i]i#o]i#p]i!]]ia]i~Ow$aO!S$bO~O^oO_oOyqO!OpO#ilO~Oc!Tij!Ti!U!Ti!Z!Ti![!Ti!^!Ti#P!Ti#a!Ti#b!Ti#o!Ti#p!Ti!]!Tia!Ti~P7TOc!Vij!Vi!U!Vi!Z!Vi![!Vi!^!Vi#P!Vi#a!Vi#b!Vi#o!Vi#p!Vi!]!Via!Vi~P7TOc!Wij!Wi!U!Wi!Z!Wi![!Wi!^!Wi#P!Wi#a!Wi#b!Wi#o!Wi#p!Wi!]!Wia!Wi~P7TOQ#`O^$eOr#wOy#yO#n#kOa#rXc#rX!Z#rX~P(QO#s$fOQ#lX^#lXa#lXc#lXf#lXg#lXh#lXj#lXl#lXn#lXo#lXp#lXr#lXu#lXy#lX{#lX!Z#lX#h#lX#m#lX#n#lX~Oa$iOc$gO!Z$gO~O!]$jO~OQ#`Or#wOy#yO!^wO#n#kO~Oa#jP~P*bOa#kP~P(QOp!nO#p$pO#x$pO^#wi~O!Z$qO~OQ#`Oc$rOr#wOy#yO#n#kOa#tX~Oa$tO~OQ!bX^!dXa!bXr!bXy!bX#n!bX~O^$uO~OQ#mOa$vOr#lOy#oO#n#kO~Oa#uP~P'bOw$zO~P(QOc#pO!^#ua!Z#uaa#ua~OQ#mOr#lOy#oO#n#kOc!fa!^!fa!Z!faa!fa~OQ#`Oa%OOr#wOy#yO#n#kO~Ow%RO~P(QOn%SO|%SO~OQ#`Or#wOy#yO#n#kO!Zta^taatactaftagtahtajtaltantaotaptauta{ta#hta#mta!^ta#Pta#atawta!]ta~O!Z%TO~O!]%XO!x%VO!y%VO#m%UO~OQ#`Oc%ZOr#wOy#yO#P%]O#n#kO!Z#Oi#a#Oi!]#Oi~P(QO!Z%^OV!|iY!|i^!|i_!|if!|ig!|io!|ip!|iy!|i!O!|i!a!|i!n!|i!p!|i!r!|i!u!|i!{!|i#a!|i#h!|i#i!|i!]!|i~OjvO!Z#QX#a#QX!]#QX~P*bO!Z!rO~OQ#`Or#wOy#yO#n#kOa#XXc#XXf#XXg#XXh#XXj#XXl#XXn#XXo#XXp#XXu#XX{#XX!Z#XX#h#XX#m#XX~Oa#rac#ra!Z#ra~P(QOa%jOc$gO!Z$gO~Oa#jX~P$WOa%lO~Oc%mOa#kX~P(QOa%oO~OQ#`Or#wOw%pOy#yO#n#kO~Oc$rOa#ta~On%sO~Oa%uO~OQ#`Or#wOw%vOy#yO#n#kO~OQ#mOr#lOy#oO#n#kOc#]a!^#]a!Z#]aa#]a~Oa%wO~P4dOQ#`Or#wOw%xOy#yO#n#kO~Oa%yO~OP#vO!^mX~O!]%|O!x%VO!y%VO#m%UO~OQ#`Or#wOy#yO#n#kOc#`Xf#`Xg#`Xh#`Xj#`Xl#`Xn#`Xo#`Xp#`Xu#`X{#`X!Z#`X#P#`X#a#`X#h#`X#m#`X!]#`X~Oc%ZO#P&PO!Z#Oq#a#Oq!]#Oq~P(QOjvO!Z#Qa#a#Qa!]#Qa~P4dOQ#`Or#wOw&SOy#yO#n#kO~Oa#ric#ri!Z#ri~P(QOcmOa#ja~Oc%mOa#ka~OQ#`Or#wOy#yO#n#kOa#[ac#[a~Oa&WO~P(QOQ#`Or#wOy#yO#n#kOc#`af#`ag#`ah#`aj#`al#`an#`ao#`ap#`au#`a{#`a!Z#`a#P#`a#a#`a#h#`a#m#`a!]#`a~Oa#Yac#Ya~P(QO!Z&XO~Of#dpg#m|#iRSRr~",
  goto: "0^#zPPPPPP#{P$Q$^P$Q$j$QPP$sP$yPP%PPPP%jP%jP&ZPPP%jP'O%jP%jP%jP'jPP$QP(a$Q(jP$QP$Q$Q(p$QPPPP(w#{P)f)f)q)f)f)f)fP)f)t)f#{P#{P#{P){#{P*O*RPP#{P#{*U*aP*f*i*i*a*a*l*s*}+e+k+q+w+},T,_PPPP,e,k,pPP-[-_-bPPPP.u/UP/[/_/k0QP0VVdOhweXOhmrsuw#^#r$YeQOhmrsuw#^#r$YQkRQ!ulR%`$XQ}TR!}oQ#_}R$`!}Q#_!Or#x!d#U#[#f#u#|$U$]$c$o$y%Q%Y%d%e%q%}R$`#O!]!f[vy!X!b!g!q!{#U#`#b#o#w#y$U$_$b$d$e$g$m$r$u%Z%[%g%m%t&T![!f[vy!X!b!g!q!{#U#`#b#o#w#y$U$_$b$d$e$g$m$r$u%Z%[%g%m%t&TT%V$P%WY#l![!m#j#t${s#w!d#U#[#f#u#|$U$]$c$o$y%Q%Y%d%e%q%}![!f[vy!X!b!g!q!{#U#`#b#o#w#y$U$_$b$d$e$g$m$r$u%Z%[%g%m%t&TQ!i]R$O!jQ!QUQ#PpR%_$WQ!SVR#QqZuS!w$k$}%aQxSS!znzQ#s!_Q$R!mQ$V!qS$^!|#[Q%c$]Q%z%VR&R%dc!^Z_!W!Z!`#l#m#p%sR#i!ZZ#n![!m#j#t${R!j]R!l^R$Q!lU`OhwQ!UWR$S!nVeOhwR$Z!qR$Y!qShOwR!thQnSS!yn%kR%k$kQ$d#UQ$m#`Y%f$d$m%g%t&TQ%g$eQ%t$uR&T%mQ%n$mR&U%nQ$h#YR%i$hQ$s#fR%r$sQ#q![R$|#qQ%W$PR%{%WQ!o`Q#c!UT$T!o#cQ%[$UR&O%[QiOR#ZwVfOhwUSOhwQ!wmQ#RrQ#SsQ#TuQ$k#^Q$}#rR%a$YR$l#^R$n#`Q!d[S#Uv$gQ#[yQ#f!XQ#u!bQ#|!gQ$U!qQ$]!{d$c#U#`$d$e$m$u%g%m%t&TQ$o#bQ$y#oQ%P#wQ%Q#yS%Y$U%[Q%d$_Q%e$bQ%q$rR%}%ZQzSQ!pbQ!|nQ%b$YR&Q%aQ#YvR%h$gR#g!XQ!_ZQ#e!WQ$x#mR&V%sW![Z!W#m%sQ!m_Q#j!ZQ#t!`Q$w#lR${#pVcOhwSgOwR!sh",
  nodeNames: "⚠ Unit ( Comment LineComment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName ) ArgList , PseudoClassName ArgList VariableName AtKeyword PropertyVariable ValueName ( ParenthesizedValue ColorLiteral NumberLiteral StringLiteral Escape Interpolation BinaryExpression BinOp LogicOp UnaryExpression UnaryQueryOp CallExpression ] SubscriptExpression [ CallLiteral CallTag ParenthesizedContent IdSelector # IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp InterpolatedSelector ; when } { Block ImportStatement import KeywordQuery FeatureQuery FeatureName BinaryQuery UnaryQuery ParenthesizedQuery SelectorQuery selector CallQuery ArgList SubscriptQuery MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList from to SupportsStatement supports DetachedRuleSet PropertyName Declaration Important Inclusion IdSelector ClassSelector Inclusion CallExpression",
  maxTerm: 133,
  nodeProps: [
    ["isolate", -3,3,4,30,""],
    ["openedBy", 17,"(",59,"{"],
    ["closedBy", 26,")",60,"}"]
  ],
  propSources: [lessHighlighting],
  skippedNodes: [0,3,4],
  repeatNodeCount: 10,
  tokenData: "!2q~R!ZOX$tX^%l^p$tpq%lqr)Ors-xst/ltu6Zuv$tvw8^wx:Uxy;syz<Uz{<Z{|<t|}BQ}!OBc!O!PDo!P!QFY!Q![Jw![!]Kr!]!^Ln!^!_MP!_!`M{!`!aNl!a!b$t!b!c! m!c!}!&R!}#O!'y#O#P$t#P#Q!([#Q#R!(m#R#T$t#T#o!&R#o#p!)S#p#q!(m#q#r!)e#r#s!)v#s#y$t#y#z%l#z$f$t$f$g%l$g#BY$t#BY#BZ%l#BZ$IS$t$IS$I_%l$I_$I|$t$I|$JO%l$JO$JT$t$JT$JU%l$JU$KV$t$KV$KW%l$KW&FU$t&FU&FV%l&FV;'S$t;'S;=`!2k<%lO$t`$wSOy%Tz;'S%T;'S;=`%f<%lO%T`%YS|`Oy%Tz;'S%T;'S;=`%f<%lO%T`%iP;=`<%l%T~%qh#d~OX%TX^']^p%Tpq']qy%Tz#y%T#y#z']#z$f%T$f$g']$g#BY%T#BY#BZ']#BZ$IS%T$IS$I_']$I_$I|%T$I|$JO']$JO$JT%T$JT$JU']$JU$KV%T$KV$KW']$KW&FU%T&FU&FV']&FV;'S%T;'S;=`%f<%lO%T~'dh#d~|`OX%TX^']^p%Tpq']qy%Tz#y%T#y#z']#z$f%T$f$g']$g#BY%T#BY#BZ']#BZ$IS%T$IS$I_']$I_$I|%T$I|$JO']$JO$JT%T$JT$JU']$JU$KV%T$KV$KW']$KW&FU%T&FU&FV']&FV;'S%T;'S;=`%f<%lO%Tk)RUOy%Tz#]%T#]#^)e#^;'S%T;'S;=`%f<%lO%Tk)jU|`Oy%Tz#a%T#a#b)|#b;'S%T;'S;=`%f<%lO%Tk*RU|`Oy%Tz#d%T#d#e*e#e;'S%T;'S;=`%f<%lO%Tk*jU|`Oy%Tz#c%T#c#d*|#d;'S%T;'S;=`%f<%lO%Tk+RU|`Oy%Tz#f%T#f#g+e#g;'S%T;'S;=`%f<%lO%Tk+jU|`Oy%Tz#h%T#h#i+|#i;'S%T;'S;=`%f<%lO%Tk,RU|`Oy%Tz#T%T#T#U,e#U;'S%T;'S;=`%f<%lO%Tk,jU|`Oy%Tz#b%T#b#c,|#c;'S%T;'S;=`%f<%lO%Tk-RU|`Oy%Tz#h%T#h#i-e#i;'S%T;'S;=`%f<%lO%Tk-lS#PZ|`Oy%Tz;'S%T;'S;=`%f<%lO%T~-{WOY-xZr-xrs.es#O-x#O#P.j#P;'S-x;'S;=`/f<%lO-x~.jOn~~.mRO;'S-x;'S;=`.v;=`O-x~.yXOY-xZr-xrs.es#O-x#O#P.j#P;'S-x;'S;=`/f;=`<%l-x<%lO-x~/iP;=`<%l-xo/qY!OROy%Tz!Q%T!Q![0a![!c%T!c!i0a!i#T%T#T#Z0a#Z;'S%T;'S;=`%f<%lO%Tm0fY|`Oy%Tz!Q%T!Q![1U![!c%T!c!i1U!i#T%T#T#Z1U#Z;'S%T;'S;=`%f<%lO%Tm1ZY|`Oy%Tz!Q%T!Q![1y![!c%T!c!i1y!i#T%T#T#Z1y#Z;'S%T;'S;=`%f<%lO%Tm2QYl]|`Oy%Tz!Q%T!Q![2p![!c%T!c!i2p!i#T%T#T#Z2p#Z;'S%T;'S;=`%f<%lO%Tm2wYl]|`Oy%Tz!Q%T!Q![3g![!c%T!c!i3g!i#T%T#T#Z3g#Z;'S%T;'S;=`%f<%lO%Tm3lY|`Oy%Tz!Q%T!Q![4[![!c%T!c!i4[!i#T%T#T#Z4[#Z;'S%T;'S;=`%f<%lO%Tm4cYl]|`Oy%Tz!Q%T!Q![5R![!c%T!c!i5R!i#T%T#T#Z5R#Z;'S%T;'S;=`%f<%lO%Tm5WY|`Oy%Tz!Q%T!Q![5v![!c%T!c!i5v!i#T%T#T#Z5v#Z;'S%T;'S;=`%f<%lO%Tm5}Sl]|`Oy%Tz;'S%T;'S;=`%f<%lO%Tm6^YOy%Tz!_%T!_!`6|!`!c%T!c!}7a!}#T%T#T#o7a#o;'S%T;'S;=`%f<%lO%Td7TS!SS|`Oy%Tz;'S%T;'S;=`%f<%lO%Tm7h[h]|`Oy%Tz}%T}!O7a!O!Q%T!Q![7a![!c%T!c!}7a!}#T%T#T#o7a#o;'S%T;'S;=`%f<%lO%Ta8c[YPOy%Tz}%T}!O9X!O!Q%T!Q![9X![!c%T!c!}9X!}#T%T#T#o9X#o;'S%T;'S;=`%f<%lO%Ta9`[YP|`Oy%Tz}%T}!O9X!O!Q%T!Q![9X![!c%T!c!}9X!}#T%T#T#o9X#o;'S%T;'S;=`%f<%lO%T~:XWOY:UZw:Uwx.ex#O:U#O#P:q#P;'S:U;'S;=`;m<%lO:U~:tRO;'S:U;'S;=`:};=`O:U~;QXOY:UZw:Uwx.ex#O:U#O#P:q#P;'S:U;'S;=`;m;=`<%l:U<%lO:U~;pP;=`<%l:Uo;xSj_Oy%Tz;'S%T;'S;=`%f<%lO%T~<ZOa~m<bUVPrWOy%Tz!_%T!_!`6|!`;'S%T;'S;=`%f<%lO%To<{Y#pQrWOy%Tz!O%T!O!P=k!P!Q%T!Q![@p![#R%T#R#SAm#S;'S%T;'S;=`%f<%lO%Tm=pU|`Oy%Tz!Q%T!Q![>S![;'S%T;'S;=`%f<%lO%Tm>ZY#m]|`Oy%Tz!Q%T!Q![>S![!g%T!g!h>y!h#X%T#X#Y>y#Y;'S%T;'S;=`%f<%lO%Tm?OY|`Oy%Tz{%T{|?n|}%T}!O?n!O!Q%T!Q![@V![;'S%T;'S;=`%f<%lO%Tm?sU|`Oy%Tz!Q%T!Q![@V![;'S%T;'S;=`%f<%lO%Tm@^U#m]|`Oy%Tz!Q%T!Q![@V![;'S%T;'S;=`%f<%lO%Tm@w[#m]|`Oy%Tz!O%T!O!P>S!P!Q%T!Q![@p![!g%T!g!h>y!h#X%T#X#Y>y#Y;'S%T;'S;=`%f<%lO%TbAtS#xQ|`Oy%Tz;'S%T;'S;=`%f<%lO%TkBVScZOy%Tz;'S%T;'S;=`%f<%lO%TmBhXrWOy%Tz}%T}!OCT!O!P=k!P!Q%T!Q![@p![;'S%T;'S;=`%f<%lO%TmCYW|`Oy%Tz!c%T!c!}Cr!}#T%T#T#oCr#o;'S%T;'S;=`%f<%lO%TmCy[f]|`Oy%Tz}%T}!OCr!O!Q%T!Q![Cr![!c%T!c!}Cr!}#T%T#T#oCr#o;'S%T;'S;=`%f<%lO%ToDtW#iROy%Tz!O%T!O!PE^!P!Q%T!Q![>S![;'S%T;'S;=`%f<%lO%TlEcU|`Oy%Tz!O%T!O!PEu!P;'S%T;'S;=`%f<%lO%TlE|S#s[|`Oy%Tz;'S%T;'S;=`%f<%lO%T~F_VrWOy%Tz{Ft{!P%T!P!QIl!Q;'S%T;'S;=`%f<%lO%T~FyU|`OyFtyzG]z{Hd{;'SFt;'S;=`If<%lOFt~G`TOzG]z{Go{;'SG];'S;=`H^<%lOG]~GrVOzG]z{Go{!PG]!P!QHX!Q;'SG];'S;=`H^<%lOG]~H^OR~~HaP;=`<%lG]~HiW|`OyFtyzG]z{Hd{!PFt!P!QIR!Q;'SFt;'S;=`If<%lOFt~IYS|`R~Oy%Tz;'S%T;'S;=`%f<%lO%T~IiP;=`<%lFt~IsV|`S~OYIlYZ%TZyIlyzJYz;'SIl;'S;=`Jq<%lOIl~J_SS~OYJYZ;'SJY;'S;=`Jk<%lOJY~JnP;=`<%lJY~JtP;=`<%lIlmJ|[#m]Oy%Tz!O%T!O!P>S!P!Q%T!Q![@p![!g%T!g!h>y!h#X%T#X#Y>y#Y;'S%T;'S;=`%f<%lO%TkKwU^ZOy%Tz![%T![!]LZ!];'S%T;'S;=`%f<%lO%TcLbS_R|`Oy%Tz;'S%T;'S;=`%f<%lO%TkLsS!ZZOy%Tz;'S%T;'S;=`%f<%lO%ThMUUrWOy%Tz!_%T!_!`Mh!`;'S%T;'S;=`%f<%lO%ThMoS|`rWOy%Tz;'S%T;'S;=`%f<%lO%TlNSW!SSrWOy%Tz!^%T!^!_Mh!_!`%T!`!aMh!a;'S%T;'S;=`%f<%lO%TjNsV!UQrWOy%Tz!_%T!_!`Mh!`!a! Y!a;'S%T;'S;=`%f<%lO%Tb! aS!UQ|`Oy%Tz;'S%T;'S;=`%f<%lO%To! rYg]Oy%Tz!b%T!b!c!!b!c!}!#R!}#T%T#T#o!#R#o#p!$O#p;'S%T;'S;=`%f<%lO%Tm!!iWg]|`Oy%Tz!c%T!c!}!#R!}#T%T#T#o!#R#o;'S%T;'S;=`%f<%lO%Tm!#Y[g]|`Oy%Tz}%T}!O!#R!O!Q%T!Q![!#R![!c%T!c!}!#R!}#T%T#T#o!#R#o;'S%T;'S;=`%f<%lO%To!$TW|`Oy%Tz!c%T!c!}!$m!}#T%T#T#o!$m#o;'S%T;'S;=`%f<%lO%To!$r^|`Oy%Tz}%T}!O!$m!O!Q%T!Q![!$m![!c%T!c!}!$m!}#T%T#T#o!$m#o#q%T#q#r!%n#r;'S%T;'S;=`%f<%lO%To!%uSp_|`Oy%Tz;'S%T;'S;=`%f<%lO%To!&W[#h_Oy%Tz}%T}!O!&|!O!Q%T!Q![!&|![!c%T!c!}!&|!}#T%T#T#o!&|#o;'S%T;'S;=`%f<%lO%To!'T[#h_|`Oy%Tz}%T}!O!&|!O!Q%T!Q![!&|![!c%T!c!}!&|!}#T%T#T#o!&|#o;'S%T;'S;=`%f<%lO%Tk!(OSyZOy%Tz;'S%T;'S;=`%f<%lO%Tm!(aSw]Oy%Tz;'S%T;'S;=`%f<%lO%Td!(pUOy%Tz!_%T!_!`6|!`;'S%T;'S;=`%f<%lO%Tk!)XS!^ZOy%Tz;'S%T;'S;=`%f<%lO%Tk!)jS!]ZOy%Tz;'S%T;'S;=`%f<%lO%To!){Y#oQOr%Trs!*ksw%Twx!.wxy%Tz!_%T!_!`6|!`;'S%T;'S;=`%f<%lO%Tm!*pZ|`OY!*kYZ%TZr!*krs!+csy!*kyz!+vz#O!*k#O#P!-j#P;'S!*k;'S;=`!.q<%lO!*km!+jSo]|`Oy%Tz;'S%T;'S;=`%f<%lO%T]!+yWOY!+vZr!+vrs!,cs#O!+v#O#P!,h#P;'S!+v;'S;=`!-d<%lO!+v]!,hOo]]!,kRO;'S!+v;'S;=`!,t;=`O!+v]!,wXOY!+vZr!+vrs!,cs#O!+v#O#P!,h#P;'S!+v;'S;=`!-d;=`<%l!+v<%lO!+v]!-gP;=`<%l!+vm!-oU|`Oy!*kyz!+vz;'S!*k;'S;=`!.R;=`<%l!+v<%lO!*km!.UXOY!+vZr!+vrs!,cs#O!+v#O#P!,h#P;'S!+v;'S;=`!-d;=`<%l!*k<%lO!+vm!.tP;=`<%l!*km!.|Z|`OY!.wYZ%TZw!.wwx!+cxy!.wyz!/oz#O!.w#O#P!1^#P;'S!.w;'S;=`!2e<%lO!.w]!/rWOY!/oZw!/owx!,cx#O!/o#O#P!0[#P;'S!/o;'S;=`!1W<%lO!/o]!0_RO;'S!/o;'S;=`!0h;=`O!/o]!0kXOY!/oZw!/owx!,cx#O!/o#O#P!0[#P;'S!/o;'S;=`!1W;=`<%l!/o<%lO!/o]!1ZP;=`<%l!/om!1cU|`Oy!.wyz!/oz;'S!.w;'S;=`!1u;=`<%l!/o<%lO!.wm!1xXOY!/oZw!/owx!,cx#O!/o#O#P!0[#P;'S!/o;'S;=`!1W;=`<%l!.w<%lO!/om!2hP;=`<%l!.w`!2nP;=`<%l$t",
  tokenizers: [descendant, unitToken, argList, 0, 1, 2, 3, 4],
  topRules: {"StyleSheet":[0,5]},
  specialized: [{term: 116, get: (value) => spec_identifier[value] || -1},{term: 23, get: (value) => spec_AtKeyword[value] || -1}],
  tokenPrec: 2180
});

/**
A language provider for Less style sheets.
*/
const lessLanguage = /*@__PURE__*/LRLanguage.define({
    name: "less",
    parser: /*@__PURE__*/parser.configure({
        props: [
            /*@__PURE__*/indentNodeProp.add({
                Declaration: /*@__PURE__*/continuedIndent()
            }),
            /*@__PURE__*/foldNodeProp.add({
                Block: foldInside
            })
        ]
    }),
    languageData: {
        commentTokens: { block: { open: "/*", close: "*/" }, line: "//" },
        indentOnInput: /^\s*\}$/,
        wordChars: "@-"
    }
});
/**
Property, variable, @-variable, and value keyword completion
source.
*/
const lessCompletionSource = /*@__PURE__*/defineCSSCompletionSource(node => node.name == "VariableName" || node.name == "AtKeyword");
/**
Language support for Less.
*/
function less() {
    return new LanguageSupport(lessLanguage, lessLanguage.data.of({ autocomplete: lessCompletionSource }));
}

export { less, lessCompletionSource, lessLanguage };
