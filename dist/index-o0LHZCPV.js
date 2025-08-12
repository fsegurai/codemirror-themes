import { N as NodeProp, T as Tree, E as EditorState, F as Facet, V as ViewPlugin, a as EditorView, I as IterMode, l as logException, b as TreeFragment, P as Parser, c as NodeType, S as StateEffect, d as StateField, t as tags, s as styleTags, D as Decoration, e as Direction, n as html, o as EditorSelection, p as parseMixed, L as LRParser, f as ExternalTokenizer } from './playground-BiGk7PXY.js';

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
// Check whether a delimited node is aligned (meaning there are
// non-skipped nodes on the same line as the opening delimiter). And
// if so, return the opening token.
function bracketedAligned(context) {
    let tree = context.node;
    let openToken = tree.childAfter(tree.from), last = tree.lastChild;
    if (!openToken)
        return null;
    let sim = context.options.simulateBreak;
    let openLine = context.state.doc.lineAt(openToken.from);
    let lineEnd = sim == null || sim <= openLine.from ? openLine.to : Math.min(openLine.to, sim);
    for (let pos = openToken.to;;) {
        let next = tree.childAfter(pos);
        if (!next || next == last)
            return null;
        if (!next.type.isSkipped) {
            if (next.from >= lineEnd)
                return null;
            let space = /^ */.exec(openLine.text.slice(openToken.to - openLine.from))[0].length;
            return { from: openToken.from, to: openToken.to + space };
        }
        pos = next.to;
    }
}
/**
An indentation strategy for delimited (usually bracketed) nodes.
Will, by default, indent one unit more than the parent's base
indent unless the line starts with a closing token. When `align`
is true and there are non-skipped nodes on the node's opening
line, the content of the node will be aligned with the end of the
opening node, like this:

    foo(bar,
        baz)
*/
function delimitedIndent({ closing, align = true, units = 1 }) {
    return (context) => delimitedStrategy(context, align, units, closing);
}
function delimitedStrategy(context, align, units, closing, closedAt) {
    let after = context.textAfter, space = after.match(/^\s*/)[0].length;
    let closed = closing && after.slice(space, space + closing.length) == closing || closedAt == context.pos + space;
    let aligned = align ? bracketedAligned(context) : null;
    if (aligned)
        return closed ? context.column(aligned.from) : context.column(aligned.to);
    return context.baseIndent + (closed ? 0 : context.unit * units);
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
const interpolationStart = 1,
  tagStart = 2,
  endTagStart = 3,
  text = 180,
  endrawTagStart = 4,
  rawText = 181,
  endcommentTagStart = 5,
  commentText = 182,
  InlineComment = 6;

function wordChar(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
const base = /*@__PURE__*/new ExternalTokenizer(input => {
    let start = input.pos;
    for (;;) {
        let { next } = input;
        if (next < 0)
            break;
        if (next == 123 /* Ch.BraceL */) {
            let after = input.peek(1);
            if (after == 123 /* Ch.BraceL */) {
                if (input.pos > start)
                    break;
                input.acceptToken(interpolationStart, 2);
                return;
            }
            else if (after == 37 /* Ch.Percent */) {
                if (input.pos > start)
                    break;
                let scan = 2, size = 2;
                for (;;) {
                    let next = input.peek(scan);
                    if (next == 32 /* Ch.Space */ || next == 10 /* Ch.Newline */) {
                        ++scan;
                    }
                    else if (next == 35 /* Ch.Hash */) {
                        ++scan;
                        for (;;) {
                            let comment = input.peek(scan);
                            if (comment < 0 || comment == 10 /* Ch.Newline */)
                                break;
                            scan++;
                        }
                    }
                    else if (next == 45 /* Ch.Dash */ && size == 2) {
                        size = ++scan;
                    }
                    else {
                        let end = next == 101 /* Ch.e */ && input.peek(scan + 1) == 110 /* Ch.n */ && input.peek(scan + 2) == 100 /* Ch.d */;
                        input.acceptToken(end ? endTagStart : tagStart, size);
                        return;
                    }
                }
            }
        }
        input.advance();
        if (next == 10 /* Ch.Newline */)
            break;
    }
    if (input.pos > start)
        input.acceptToken(text);
});
function rawTokenizer(endTag, text, tagStart) {
    return new ExternalTokenizer(input => {
        let start = input.pos;
        for (;;) {
            let { next } = input;
            if (next == 123 /* Ch.BraceL */ && input.peek(1) == 37 /* Ch.Percent */) {
                let scan = 2;
                for (;; scan++) {
                    let ch = input.peek(scan);
                    if (ch != 32 /* Ch.Space */ && ch != 10 /* Ch.Newline */)
                        break;
                }
                let word = "";
                for (;; scan++) {
                    let next = input.peek(scan);
                    if (!wordChar(next))
                        break;
                    word += String.fromCharCode(next);
                }
                if (word == endTag) {
                    if (input.pos > start)
                        break;
                    input.acceptToken(tagStart, 2);
                    break;
                }
            }
            else if (next < 0) {
                break;
            }
            input.advance();
            if (next == 10 /* Ch.Newline */)
                break;
        }
        if (input.pos > start)
            input.acceptToken(text);
    });
}
const comment = /*@__PURE__*/rawTokenizer("endcomment", commentText, endcommentTagStart);
const raw = /*@__PURE__*/rawTokenizer("endraw", rawText, endrawTagStart);
const inlineComment = /*@__PURE__*/new ExternalTokenizer(input => {
    if (input.next != 35 /* Ch.Hash */)
        return;
    input.advance();
    for (;;) {
        if (input.next == 10 /* Ch.Newline */ || input.next < 0)
            break;
        if ((input.next == 37 /* Ch.Percent */ || input.next == 125 /* Ch.BraceR */) && input.peek(1) == 125 /* Ch.BraceR */)
            break;
        input.advance();
    }
    input.acceptToken(InlineComment);
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_identifier = {__proto__:null,contains:32, or:36, and:36, true:50, false:50, empty:52, forloop:54, tablerowloop:56, continue:58, in:128, with:194, for:196, as:198, if:234, endif:238, unless:244, endunless:248, elsif:252, else:256, case:262, endcase:266, when:270, endfor:278, tablerow:284, endtablerow:288, break:292, cycle:298, echo:302, render:306, include:312, assign:316, capture:322, endcapture:326, increment:330, decrement:334};
const spec_TagName = {__proto__:null,if:82, endif:86, elsif:90, else:94, unless:100, endunless:104, case:110, endcase:114, when:118, for:126, endfor:136, tablerow:142, endtablerow:146, break:150, continue:154, cycle:158, comment:164, endcomment:170, raw:176, endraw:182, echo:186, render:190, include:202, assign:206, capture:212, endcapture:216, increment:220, decrement:224, liquid:228};
const parser = /*@__PURE__*/LRParser.deserialize({
  version: 14,
  states: "HOQYOPOOOOOP'#F{'#F{OeOaO'#CdOsQhO'#CfO!bQxO'#DQO#{OPO'#DTO$ZOPO'#D^O$iOPO'#DcO$wOPO'#DkO%VOPO'#DsO%eOSO'#EOO%jOQO'#EUO%oOPO'#EhOOOP'#G`'#G`OOOP'#G]'#G]OOOP'#Fz'#FzQYOPOOOOOP-E9y-E9yOOQW'#Cg'#CgO&`Q!jO,59QO&gQ!jO'#G^OsQhO'#CsOOQW'#G^'#G^OOOP,59l,59lO)PQhO,59lOsQhO,59pOsQhO,59tO)ZQhO,59vOsQhO,59yOsQhO,5:OOsQhO,5:SO!]QhO,5:WO!]QhO,5:`O)`QhO,5:dO)eQhO,5:fO)jQhO,5:hO)oQhO,5:kO)tQhO,5:qOsQhO,5:vOsQhO,5:xOsQhO,5;OOsQhO,5;QOsQhO,5;TOsQhO,5;XOsQhO,5;ZO+TQhO,5;]O+[OPO'#CdOOOP,59o,59oO#{OPO,59oO+jQxO'#DWOOOP,59x,59xO$ZOPO,59xO+oQxO'#DaOOOP,59},59}O$iOPO,59}O+tQxO'#DfOOOP,5:V,5:VO$wOPO,5:VO+yQxO'#DqOOOP,5:_,5:_O%VOPO,5:_O,OQxO'#DvOOOS'#GQ'#GQO,TOSO'#ERO,]OSO,5:jOOOQ'#GR'#GRO,bOQO'#EXO,jOQO,5:pOOOP,5;S,5;SO%oOPO,5;SO,oQxO'#EkOOOP-E9x-E9xO,tQ#|O,59SOsQhO,59VOsQhO,59VO,yQhO'#C|OOQW'#F|'#F|O-OQhO1G.lOOOP1G.l1G.lOsQhO,59VOsQhO,59ZO-WQ!jO,59_O-iQ!jO1G/WO-pQhO1G/WOOOP1G/W1G/WO-xQ!jO1G/[O.ZQ!jO1G/`OOOP1G/b1G/bO.lQ!jO1G/eO.}Q!jO1G/jO/qQ!jO1G/nO/xQhO1G/rO/}QhO1G/zOOOP1G0O1G0OOOOP1G0Q1G0QO0SQhO1G0SOOOS1G0V1G0VOOOQ1G0]1G0]O0_Q!jO1G0bO0fQ!jO1G0dO1QQ!jO1G0jO1cQ!jO1G0lO1jQ!jO1G0oO1{Q!jO1G0sO2^Q!jO1G0uO2oQhO'#EsO2vQhO'#ExO2}QhO'#FRO3UQhO'#FYO3]QhO'#F^O3dQhO'#FqOOQW'#Ga'#GaOOQW'#GT'#GTO3kQhO1G0wOsQhO'#EtOsQhO'#EyOsQhO'#E}OOQW'#FP'#FPOsQhO'#FSOsQhO'#FWO!]QhO'#FZO!]QhO'#F_OOQW'#Fc'#FcOOQW'#Fe'#FeO3rQhO'#FfOsQhO'#FhOsQhO'#FjOsQhO'#FmOsQhO'#FoOsQhO'#FrOsQhO'#FvOsQhO'#FxOOOP1G0w1G0wOOOP1G/Z1G/ZO3wQhO,59rOOOP1G/d1G/dO3|QhO,59{OOOP1G/i1G/iO4RQhO,5:QOOOP1G/q1G/qO4WQhO,5:]OOOP1G/y1G/yO4]QhO,5:bOOOS-E:O-E:OOOOP1G0U1G0UO4bQxO'#ESOOOQ-E:P-E:POOOP1G0[1G0[O4gQxO'#EYOOOP1G0n1G0nO4lQhO,5;VOOQW1G.n1G.nOOQW1G.q1G.qO7QQ!jO1G.qOOQW'#DO'#DOO7[QhO,59hOOQW-E9z-E9zOOOP7+$W7+$WO9UQ!jO1G.qO9`Q!jO1G.uOsQhO1G.yO;uQhO7+$rOOOP7+$r7+$rOOOP7+$v7+$vOOOP7+$z7+$zOOOP7+%P7+%POOOP7+%U7+%UOsQhO'#F}O;}QhO7+%YOOOP7+%Y7+%YOsQhO7+%^OsQhO7+%fO<VQhO'#GPO<[QhO7+%nOOOP7+%n7+%nO<dQhO7+%nO<iQhO7+%|OOOP7+%|7+%|O!]QhO'#E`OOQW'#GS'#GSO<qQhO7+&OOsQhO'#E`OOOP7+&O7+&OOOOP7+&U7+&UO=PQhO7+&WOOOP7+&W7+&WOOOP7+&Z7+&ZOOOP7+&_7+&_OOOP7+&a7+&aOOQW,5;_,5;_O2oQhO,5;_OOQW'#Ev'#EvOOQW,5;d,5;dO2vQhO,5;dOOQW'#E{'#E{OOQW,5;m,5;mO2}QhO,5;mOOQW'#FU'#FUOOQW,5;t,5;tO3UQhO,5;tOOQW'#F['#F[OOQW,5;x,5;xO3]QhO,5;xOOQW'#Fa'#FaOOQW,5<],5<]O3dQhO,5<]OOQW'#Ft'#FtOOQW-E:R-E:ROOOP7+&c7+&cO=XQ!jO,5;`O>rQ!jO,5;eO@]Q!jO,5;iOBYQ!jO,5;nOCsQ!jO,5;rOEfQhO,5;uOEkQhO,5;yOEpQhO,5<QOGgQ!jO,5<SOIYQ!jO,5<UOKYQ!jO,5<XOMVQ!jO,5<ZONxQ!jO,5<^O!!cQ!jO,5<bO!$`Q!jO,5<dOOOP1G/^1G/^OOOP1G/g1G/gOOOP1G/l1G/lOOOP1G/w1G/wOOOP1G/|1G/|O!&]QhO,5:nO!&bQhO,5:tOOOP1G0q1G0qOsQhO1G/SO!&gQ!jO7+$eOOOP<<H^<<H^O!&xQ!jO,5<iOOQW-E9{-E9{OOOP<<Ht<<HtO!)ZQ!jO<<HxO!)bQ!jO<<IQOOQW,5<k,5<kOOQW-E9}-E9}OOOP<<IY<<IYO!)iQhO<<IYOOOP<<Ih<<IhO!)qQhO,5:zOOQW-E:Q-E:QOOOP<<Ij<<IjO!)vQ!jO,5:zOOOP<<Ir<<IrOOQW1G0y1G0yOOQW1G1O1G1OOOQW1G1X1G1XOOQW1G1`1G1`OOQW1G1d1G1dOOQW1G1w1G1wO!*eQhO1G1^OsQhO1G1aOsQhO1G1eO!,XQhO1G1lO!-{QhO1G1lO!.QQhO1G1nO!]QhO'#FlOOQW'#GU'#GUO!/tQhO1G1pO!1hQhO1G1uOOOP1G0Y1G0YOOOP1G0`1G0`O!3[Q!jO7+$nOOQW<<HP<<HPOOQW'#Dp'#DpO!5_QhO'#DoOOQW'#GO'#GOO!6xQhOAN>dOOOPAN>dAN>dO!7QQhOAN>lOOOPAN>lAN>lO!7YQhOAN>tOOOPAN>tAN>tOsQhO1G0fO!]QhO1G0fO!7bQ!jO7+&{O!8qQ!jO7+'PO!:QQhO7+'WO!;tQhO,5<WOOQW-E:S-E:SOsQhO,5:ZOOQW-E9|-E9|OOOPG24OG24OOOOPG24WG24WOOOPG24`G24`O!;yQ!jO7+&QOOQW7+&Q7+&QO!<eQhO<<JgO!=uQhO<<JkO!?VQhO<<JrOsQhO1G1rO!@yQ!jO1G/uO!BmQ!jO7+'^",
  stateData: "!Dm~O%OOSUOS~OPROQSO$zPO~O$zPOPWXQWX$yWX~OfeOifOjfOkfOlfOmfOnfOofO%RbO~OuhOvgOyiO}jO!PkO!SlO!XmO!]nO!aoO!ipO!mqO!orO!qsO!ttO!zuO#PvO#RwO#XxO#ZyO#^zO#b{O#d|O#f}O~OPROQSOR!RO$zPO~OPROQSOR!UO$zPO~OPROQSOR!XO$zPO~OPROQSOR![O$zPO~OPROQSOR!_O$zPO~O$|!`O~O${!cO~OPROQSOR!hO$zPO~O]!jO`!qOa!kOb!lOq!mO~OX!pO~P%}Od!rOX%QX]%QX`%QXa%QXb%QXq%QXh%QXv%QX!^%QX#T%QX#U%QXm%QX#i%QX#k%QX#n%QX#r%QX#t%QX#w%QX#{%QX$S%QX$W%QX$Z%QX$]%QX$_%QX$b%QX$d%QX$g%QX$k%QX$m%QX#p%QX#y%QX$i%QXe%QX%R%QX#V%QX$P%QX$U%QX~Oq!mOv!vO~PsOv!yO~Ov#PO~Ov#QO~On#RO~Ov#SO~Ov#TO~Om#oO#U#lO#i#fO#n#gO#r#hO#t#iO#w#jO#{#kO$S#mO$W#nO$Z#pO$]#qO$_#rO$b#sO$d#tO$g#uO$k#vO$m#wO~Ov#xO~P)yO$zPOPWXQWXRWX~O{#zO~O!U#|O~O!Z$OO~O!f$QO~O!k$SO~O$|!`OT!uX~OT$VO~O${!cOS!{X~OS$YO~O#`$[O~O^$]O~O%R$`O~OX$cOq!mO~O]!jO`!qOa!kOb!lOh$fO~Ov$hO~P%}Oq!mOv$hO~O]!jO`!qOa!kOb!lOv$iO~O]!jO`!qOa!kOb!lOv$jO~O]!jO`!qOa!kOb!lOv$kO~O]!jO`!qOa!kOb!lOv$lO~O]!jO`!qOa!kOb!lO!^$mO~Ov$oO~P/`O!b$pO~O!b$qO~Os$uOv$tO!^$rO~Ov$wO~P%}O]!jO`!qOa!kOb!lOv$|O!^$xO#T${O#U${O~O]!jO`!qOa!kOb!lOv$}O~Ov%PO~P%}O]!jO`!qOa!kOb!lOv%QO~O]!jO`!qOa!kOb!lOv%RO~O]!jO`!qOa!kOb!lOv%SO~O#k%VO~P)yO#p%YO~P)yO#y%]O~P)yO$P%`O~P)yO$U%cO~P)yO$i%fO~P)yOv%hO~P)yOn%pO~Ov%xO~Ov%yO~Ov%zO~Ov%{O~Ov%|O~O!w%}O~O!}&OO~Ov&PO~Oa!kOX_i]_iq_ih_iv_i!^_i#T_i#U_im_i#i_i#k_i#n_i#r_i#t_i#w_i#{_i$S_i$W_i$Z_i$]_i$__i$b_i$d_i$g_i$k_i$m_i#p_i#y_i$i_ie_i%R_i#V_i$P_i$U_i~O`!qOb!lO~P4qOs&QOXpaqpavpampa#Upa#ipa#npa#rpa#tpa#wpa#{pa$Spa$Wpa$Zpa$]pa$_pa$bpa$dpa$gpa$kpa$mpa#kpa#ppa#ypa$Ppa$Upa$ipa~O`_ib_i~P4qO`!qOa!kOb!lOXci]ciqcihcivci!^ci#Tci#Ucimci#ici#kci#nci#rci#tci#wci#{ci$Sci$Wci$Zci$]ci$_ci$bci$dci$gci$kci$mci#pci#yci$icieci%Rci#Vci$Pci$Uci~Oq!mOv&SO~Ov&VO!^$mO~On&YO~Ov&[O!^$rO~On&]O~Oq!mOv&^O~Ov&aO!^$xO#T${O#U${O~Oq!mOv&cO~O]!jO`!qOa!kOb!lOm#ha#U#ha#i#ha#k#ha#n#ha#r#ha#t#ha#w#ha#{#ha$S#ha$W#ha$Z#ha$]#ha$_#ha$b#ha$d#ha$g#ha$k#ha$m#ha~O]!jO`!qOa!kOb!lOm#ma#U#ma#i#ma#n#ma#p#ma#r#ma#t#ma#w#ma#{#ma$S#ma$W#ma$Z#ma$]#ma$_#ma$b#ma$d#ma$g#ma$k#ma$m#ma~O]!jO`!qOa!kOb!lOm#qav#qa#U#qa#i#qa#n#qa#r#qa#t#qa#w#qa#{#qa$S#qa$W#qa$Z#qa$]#qa$_#qa$b#qa$d#qa$g#qa$k#qa$m#qa#k#qa#p#qa#y#qa$P#qa$U#qa$i#qa~O]!jO`!qOa!kOb!lOm#va#U#va#i#va#n#va#r#va#t#va#w#va#y#va#{#va$S#va$W#va$Z#va$]#va$_#va$b#va$d#va$g#va$k#va$m#va~Om#zav#za#U#za#i#za#n#za#r#za#t#za#w#za#{#za$S#za$W#za$Z#za$]#za$_#za$b#za$d#za$g#za$k#za$m#za#k#za#p#za#y#za$P#za$U#za$i#za~P/`O!b&kO~O!b&lO~Os&nO!^$rOm$Yav$Ya#U$Ya#i$Ya#n$Ya#r$Ya#t$Ya#w$Ya#{$Ya$S$Ya$W$Ya$Z$Ya$]$Ya$_$Ya$b$Ya$d$Ya$g$Ya$k$Ya$m$Ya#k$Ya#p$Ya#y$Ya$P$Ya$U$Ya$i$Ya~Om$[av$[a#U$[a#i$[a#n$[a#r$[a#t$[a#w$[a#{$[a$S$[a$W$[a$Z$[a$]$[a$_$[a$b$[a$d$[a$g$[a$k$[a$m$[a#k$[a#p$[a#y$[a$P$[a$U$[a$i$[a~P%}O]!jO`!qOa!kOb!lO!^&pOm$^av$^a#U$^a#i$^a#n$^a#r$^a#t$^a#w$^a#{$^a$S$^a$W$^a$Z$^a$]$^a$_$^a$b$^a$d$^a$g$^a$k$^a$m$^a#k$^a#p$^a#y$^a$P$^a$U$^a$i$^a~O]!jO`!qOa!kOb!lOm$aav$aa#U$aa#i$aa#n$aa#r$aa#t$aa#w$aa#{$aa$S$aa$W$aa$Z$aa$]$aa$_$aa$b$aa$d$aa$g$aa$k$aa$m$aa#k$aa#p$aa#y$aa$P$aa$U$aa$i$aa~Om$cav$ca#U$ca#i$ca#n$ca#r$ca#t$ca#w$ca#{$ca$S$ca$W$ca$Z$ca$]$ca$_$ca$b$ca$d$ca$g$ca$k$ca$m$ca#k$ca#p$ca#y$ca$P$ca$U$ca$i$ca~P%}O]!jO`!qOa!kOb!lOm$fa#U$fa#i$fa#n$fa#r$fa#t$fa#w$fa#{$fa$S$fa$W$fa$Z$fa$]$fa$_$fa$b$fa$d$fa$g$fa$i$fa$k$fa$m$fa~O]!jO`!qOa!kOb!lOm$jav$ja#U$ja#i$ja#n$ja#r$ja#t$ja#w$ja#{$ja$S$ja$W$ja$Z$ja$]$ja$_$ja$b$ja$d$ja$g$ja$k$ja$m$ja#k$ja#p$ja#y$ja$P$ja$U$ja$i$ja~O]!jO`!qOa!kOb!lOm$lav$la#U$la#i$la#n$la#r$la#t$la#w$la#{$la$S$la$W$la$Z$la$]$la$_$la$b$la$d$la$g$la$k$la$m$la#k$la#p$la#y$la$P$la$U$la$i$la~Ov&tO~Ov&uO~O]!jO`!qOa!kOb!lOe&wO~O]!jO`!qOa!kOb!lOv$qa!^$qam$qa#U$qa#i$qa#n$qa#r$qa#t$qa#w$qa#{$qa$S$qa$W$qa$Z$qa$]$qa$_$qa$b$qa$d$qa$g$qa$k$qa$m$qa#k$qa#p$qa#y$qa$P$qa$U$qa$i$qa~O]!jO`!qOa!kOb!lO%R&xO~Ov&|O~P!(xOv'OO~P!(xOv'QO!^$rO~Os'RO~O]!jO`!qOa!kOb!lO#V'SOv#Sa!^#Sa#T#Sa#U#Sa~O!^$mOm#ziv#zi#U#zi#i#zi#n#zi#r#zi#t#zi#w#zi#{#zi$S#zi$W#zi$Z#zi$]#zi$_#zi$b#zi$d#zi$g#zi$k#zi$m#zi#k#zi#p#zi#y#zi$P#zi$U#zi$i#zi~O!^$rOm$Yiv$Yi#U$Yi#i$Yi#n$Yi#r$Yi#t$Yi#w$Yi#{$Yi$S$Yi$W$Yi$Z$Yi$]$Yi$_$Yi$b$Yi$d$Yi$g$Yi$k$Yi$m$Yi#k$Yi#p$Yi#y$Yi$P$Yi$U$Yi$i$Yi~On'VO~Oq!mOm$[iv$[i#U$[i#i$[i#n$[i#r$[i#t$[i#w$[i#{$[i$S$[i$W$[i$Z$[i$]$[i$_$[i$b$[i$d$[i$g$[i$k$[i$m$[i#k$[i#p$[i#y$[i$P$[i$U$[i$i$[i~O!^&pOm$^iv$^i#U$^i#i$^i#n$^i#r$^i#t$^i#w$^i#{$^i$S$^i$W$^i$Z$^i$]$^i$_$^i$b$^i$d$^i$g$^i$k$^i$m$^i#k$^i#p$^i#y$^i$P$^i$U$^i$i$^i~Oq!mOm$civ$ci#U$ci#i$ci#n$ci#r$ci#t$ci#w$ci#{$ci$S$ci$W$ci$Z$ci$]$ci$_$ci$b$ci$d$ci$g$ci$k$ci$m$ci#k$ci#p$ci#y$ci$P$ci$U$ci$i$ci~O]!jO`!qOa!kOb!lOXpqqpqvpqmpq#Upq#ipq#npq#rpq#tpq#wpq#{pq$Spq$Wpq$Zpq$]pq$_pq$bpq$dpq$gpq$kpq$mpq#kpq#ppq#ypq$Ppq$Upq$ipq~Os'YOv!cX%R!cXm!cX#U!cX#i!cX#n!cX#r!cX#t!cX#w!cX#{!cX$P!cX$S!cX$W!cX$Z!cX$]!cX$_!cX$b!cX$d!cX$g!cX$k!cX$m!cX$U!cX~Ov'[O%R&xO~Ov']O%R&xO~Ov'^O!^$rO~Om#}q#U#}q#i#}q#n#}q#r#}q#t#}q#w#}q#{#}q$P#}q$S#}q$W#}q$Z#}q$]#}q$_#}q$b#}q$d#}q$g#}q$k#}q$m#}q~P!(xOm$Rq#U$Rq#i$Rq#n$Rq#r$Rq#t$Rq#w$Rq#{$Rq$S$Rq$U$Rq$W$Rq$Z$Rq$]$Rq$_$Rq$b$Rq$d$Rq$g$Rq$k$Rq$m$Rq~P!(xO!^$rOm$Yqv$Yq#U$Yq#i$Yq#n$Yq#r$Yq#t$Yq#w$Yq#{$Yq$S$Yq$W$Yq$Z$Yq$]$Yq$_$Yq$b$Yq$d$Yq$g$Yq$k$Yq$m$Yq#k$Yq#p$Yq#y$Yq$P$Yq$U$Yq$i$Yq~Os'dO~O]!jO`!qOa!kOb!lOv#Sq!^#Sq#T#Sq#U#Sq~O%R&xOm#}y#U#}y#i#}y#n#}y#r#}y#t#}y#w#}y#{#}y$P#}y$S#}y$W#}y$Z#}y$]#}y$_#}y$b#}y$d#}y$g#}y$k#}y$m#}y~O%R&xOm$Ry#U$Ry#i$Ry#n$Ry#r$Ry#t$Ry#w$Ry#{$Ry$S$Ry$U$Ry$W$Ry$Z$Ry$]$Ry$_$Ry$b$Ry$d$Ry$g$Ry$k$Ry$m$Ry~O!^$rOm$Yyv$Yy#U$Yy#i$Yy#n$Yy#r$Yy#t$Yy#w$Yy#{$Yy$S$Yy$W$Yy$Z$Yy$]$Yy$_$Yy$b$Yy$d$Yy$g$Yy$k$Yy$m$Yy#k$Yy#p$Yy#y$Yy$P$Yy$U$Yy$i$Yy~O]!jO`!qOa!kOb!lOv!ci%R!cim!ci#U!ci#i!ci#n!ci#r!ci#t!ci#w!ci#{!ci$P!ci$S!ci$W!ci$Z!ci$]!ci$_!ci$b!ci$d!ci$g!ci$k!ci$m!ci$U!ci~O]!jO`!qOa!kOb!lOm$`qv$`q!^$`q#U$`q#i$`q#n$`q#r$`q#t$`q#w$`q#{$`q$S$`q$W$`q$Z$`q$]$`q$_$`q$b$`q$d$`q$g$`q$k$`q$m$`q#k$`q#p$`q#y$`q$P$`q$U$`q$i$`q~O",
  goto: "7o%UPPPPPPPP%VP%V%g&zPP&zPPP&zPPP&zPPPPPPPP'xP(YP(]PP(](mP(}P(]P(]P(])TP)eP(])kP){P(]PP(]*RPP*c*m*wP(]*}P+_P(]P(]P(]P(]+eP+u+xP(]+{P,],`P(]P(]P,cPPP(]P(]P(],gP,wP(]P(]P(]P,}-_P-oP,}-uP.VP,}P,}P,}.]P.mP,}P,}.s/TP,}/ZP/kP,}P,},}P,}P,}P/q,}P,}P,}/uP0VP,}P,}P0]0{1c2R2]2o3R3X3_3e4TPPPPPP4Z4kP%V7_m^OTUVWX[`!Q!T!W!Z!^!g!vdRehijlmnvwxyz{|!k!l!q!r#f#g#h#j#k#q#r#s#t#u#v#w$f$m$p$q${&Q&k&l'R'Y'dQ!}oQ#OpQ%n#lQ%o#mQ&_$xQ'W&pR'`'S!wfRehijlmnvwxyz{|!k!l!q!r#f#g#h#j#k#q#r#s#t#u#v#w$f$m$p$q${&Q&k&l'R'Y'dm!nch!o!t!u#U#X$g$v%O%q%t&o&sR$a!mm]OTUVWX[`!Q!T!W!Z!^!gmTOTUVWX[`!Q!T!W!Z!^!gQ!PTR#y!QmUOTUVWX[`!Q!T!W!Z!^!gQ!SUR#{!TmVOTUVWX[`!Q!T!W!Z!^!gQ!VVR#}!WmWOTUVWX[`!Q!T!W!Z!^!ga&z&W&X&{&}'T'U'a'ba&y&W&X&{&}'T'U'a'bQ!YWR$P!ZmXOTUVWX[`!Q!T!W!Z!^!gQ!]XR$R!^mYOTUVWX[`!Q!T!W!Z!^!gR!bYR$U!bmZOTUVWX[`!Q!T!W!Z!^!gR!eZR$X!eT$y#V$zm[OTUVWX[`!Q!T!W!Z!^!gQ!f[R$Z!gm#c}#]#^#_#`#a#b#e%U%X%[%_%b%em#]}#]#^#_#`#a#b#e%U%X%[%_%b%eQ%T#]R&d%Um#^}#]#^#_#`#a#b#e%U%X%[%_%b%eQ%W#^R&e%Xm#_}#]#^#_#`#a#b#e%U%X%[%_%b%eQ%Z#_R&f%[m#`}#]#^#_#`#a#b#e%U%X%[%_%b%eQ%^#`R&g%_m#a}#]#^#_#`#a#b#e%U%X%[%_%b%eQ%a#aR&h%bT&q%r&rm#b}#]#^#_#`#a#b#e%U%X%[%_%b%eQ%d#bR&i%eQ`OQ!QTQ!TUQ!WVQ!ZWQ!^XQ!g[_!i`!Q!T!W!Z!^!gSQO`SaQ!Oi!OTUVWX[!Q!T!W!Z!^!gQ!ocQ!uh^$b!o!u$g$v%O&o&sQ$g!tQ$v#UQ%O#XQ&o%qR&s%tQ$n!|S&U$n&jR&j%mQ&{&WQ&}&XW'Z&{&}'a'bQ'a'TR'b'UQ$s#RW&Z$s&m'P'cQ&m%pQ'P&]R'c'VQ!aYR$T!aQ!dZR$W!dQ$z#VR&`$zQ#e}Q%U#]Q%X#^Q%[#_Q%_#`Q%b#aQ%e#b_%g#e%U%X%[%_%b%eQ&r%rR'X&rm_OTUVWX[`!Q!T!W!Z!^!gQcRQ!seQ!thQ!wiQ!xjQ!zlQ!{mQ!|nQ#UvQ#VwQ#WxQ#XyQ#YzQ#Z{Q#[|Q$^!kQ$_!lQ$d!qQ$e!rQ%i#fQ%j#gQ%k#hQ%l#jQ%m#kQ%q#qQ%r#rQ%s#sQ%t#tQ%u#uQ%v#vQ%w#wQ&R$fQ&T$mQ&W$pQ&X$qQ&b${Q&v&QQ'T&kQ'U&lQ'_'RQ'e'YR'f'dm#d}#]#^#_#`#a#b#e%U%X%[%_%b%e",
  nodeNames: "⚠ {{ {% {% {% {% InlineComment Template Text }} Interpolation VariableName MemberExpression . PropertyName BinaryExpression contains CompareOp LogicOp AssignmentExpression AssignOp ) ( RangeExpression .. BooleanLiteral empty forloop tablerowloop continue StringLiteral NumberLiteral Filter | FilterName : Tag TagName %} IfDirective Tag if EndTag endif Tag elsif Tag else UnlessDirective Tag unless EndTag endunless CaseDirective Tag case EndTag endcase Tag when , ForDirective Tag for in Parameter ParameterName EndTag endfor TableDirective Tag tablerow EndTag endtablerow Tag break Tag continue Tag cycle Comment Tag comment CommentText EndTag endcomment RawDirective Tag raw RawText EndTag endraw Tag echo Tag render RenderParameter with for as Tag include Tag assign CaptureDirective Tag capture EndTag endcapture Tag increment Tag decrement Tag liquid IfDirective Tag if EndTag endif UnlessDirective Tag unless EndTag endunless Tag elsif Tag else CaseDirective Tag case EndTag endcase Tag when ForDirective Tag EndTag endfor TableDirective Tag tablerow EndTag endtablerow Tag break Tag Tag cycle Tag echo Tag render RenderParameter Tag include Tag assign CaptureDirective Tag capture EndTag endcapture Tag increment Tag decrement",
  maxTerm: 189,
  nodeProps: [
    ["closedBy", 1,"}}",-4,2,3,4,5,"%}",22,")"],
    ["openedBy", 9,"{{",21,"(",38,"{%"],
    ["group", -12,11,12,15,19,23,25,26,27,28,29,30,31,"Expression"]
  ],
  skippedNodes: [0,6],
  repeatNodeCount: 11,
  tokenData: ")Q~RkXY!vYZ!v]^!vpq!vqr#Xrs#duv$Uwx$axy$|yz%R{|%W|}&r}!O&w!O!P'T!Q![&a![!]'e!^!_'j!_!`'r!`!a'j!c!}'z#R#S'z#T#o'z#p#q(p#q#r(u%W;'S'z;'S;:j(j<%lO'z~!{S%O~XY!vYZ!v]^!vpq!v~#[P!_!`#_~#dOa~~#gUOY#dZr#drs#ys;'S#d;'S;=`$O<%lO#d~$OOn~~$RP;=`<%l#d~$XP#q#r$[~$aOv~~$dUOY$aZw$awx#yx;'S$a;'S;=`$v<%lO$a~$yP;=`<%l$a~%ROf~~%WOe~P%ZQ!O!P%a!Q![&aP%dP!Q![%gP%lRoP!Q![%g!g!h%u#X#Y%uP%xR{|&R}!O&R!Q![&XP&UP!Q![&XP&^PoP!Q![&XP&fSoP!O!P%a!Q![&a!g!h%u#X#Y%u~&wO!^~~&zRuv$U!O!P%a!Q![&a~'YQ]S!O!P'`!Q![%g~'eOh~~'jOs~~'oPa~!_!`#_~'wPd~!_!`#__(TV^WuQ%RT!Q!['z!c!}'z#R#S'z#T#o'z%W;'S'z;'S;:j(j<%lO'z_(mP;=`<%l'z~(uOq~~(xP#q#r({~)QOX~",
  tokenizers: [base, raw, comment, inlineComment, 0, 1, 2, 3],
  topRules: {"Template":[0,7]},
  specialized: [{term: 187, get: (value) => spec_identifier[value] || -1},{term: 37, get: (value) => spec_TagName[value] || -1}],
  tokenPrec: 0
});

function completions(words, type) {
    return words.split(" ").map(label => ({ label, type }));
}
const Filters = /*@__PURE__*/completions("abs append at_least at_most capitalize ceil compact concat date default " +
    "divided_by downcase escape escape_once first floor join last lstrip map minus modulo " +
    "newline_to_br plus prepend remove remove_first replace replace_first reverse round rstrip " +
    "size slice sort sort_natural split strip strip_html strip_newlines sum times truncate " +
    "truncatewords uniq upcase url_decode url_encode where", "function");
const Tags = /*@__PURE__*/completions("cycle comment endcomment raw endraw echo increment decrement liquid if elsif " +
    "else endif unless endunless case endcase for endfor tablerow endtablerow break continue " +
    "assign capture endcapture render include", "keyword");
const Expressions = /*@__PURE__*/completions("empty forloop tablerowloop in with as contains", "keyword");
const forloop = /*@__PURE__*/completions("first index index0 last length rindex", "property");
const tablerowloop = /*@__PURE__*/completions("col col0 col_first col_last first index index0 last length rindex rindex0 row", "property");
function findContext(context) {
    var _a;
    let { state, pos } = context;
    let node = syntaxTree(state).resolveInner(pos, -1).enterUnfinishedNodesBefore(pos);
    let before = ((_a = node.childBefore(pos)) === null || _a === void 0 ? void 0 : _a.name) || node.name;
    if (node.name == "FilterName")
        return { type: "filter", node };
    if (context.explicit && before == "|")
        return { type: "filter" };
    if (node.name == "TagName")
        return { type: "tag", node };
    if (context.explicit && before == "{%")
        return { type: "tag" };
    if (node.name == "PropertyName" && node.parent.name == "MemberExpression")
        return { type: "property", node, target: node.parent };
    if (node.name == "." && node.parent.name == "MemberExpression")
        return { type: "property", target: node.parent };
    if (node.name == "MemberExpression" && before == ".")
        return { type: "property", target: node };
    if (node.name == "VariableName")
        return { type: "expression", from: node.from };
    let word = context.matchBefore(/[\w\u00c0-\uffff]+$/);
    if (word)
        return { type: "expression", from: word.from };
    if (context.explicit && node.name != "CommentText" && node.name != "StringLiteral" &&
        node.name != "NumberLiteral" && node.name != "InlineComment")
        return { type: "expression" };
    return null;
}
function resolveProperties(state, node, context, properties) {
    let path = [];
    for (;;) {
        let obj = node.getChild("Expression");
        if (!obj)
            return [];
        if (obj.name == "forloop") {
            return path.length ? [] : forloop;
        }
        else if (obj.name == "tablerowloop") {
            return path.length ? [] : tablerowloop;
        }
        else if (obj.name == "VariableName") {
            path.unshift(state.sliceDoc(obj.from, obj.to));
            break;
        }
        else if (obj.name == "MemberExpression") {
            let name = obj.getChild("PropertyName");
            if (name)
                path.unshift(state.sliceDoc(name.from, name.to));
            node = obj;
        }
        else {
            return [];
        }
    }
    return properties ? properties(path, state, context) : [];
}
/**
Returns a completion source for liquid templates. Optionally takes
a configuration that adds additional custom completions.
*/
function liquidCompletionSource(config = {}) {
    let filters = config.filters ? config.filters.concat(Filters) : Filters;
    let tags = config.tags ? config.tags.concat(Tags) : Tags;
    let exprs = config.variables ? config.variables.concat(Expressions) : Expressions;
    let { properties } = config;
    return (context) => {
        var _a;
        let cx = findContext(context);
        if (!cx)
            return null;
        let from = (_a = cx.from) !== null && _a !== void 0 ? _a : (cx.node ? cx.node.from : context.pos);
        let options;
        if (cx.type == "filter")
            options = filters;
        else if (cx.type == "tag")
            options = tags;
        else if (cx.type == "expression")
            options = exprs;
        else /* property */
            options = resolveProperties(context.state, cx.target, context, properties);
        return options.length ? { options, from, validFor: /^[\w\u00c0-\uffff]*$/ } : null;
    };
}
/**
This extension will, when the user types a `%` between two
matching braces, insert two percent signs instead and put the
cursor between them.
*/
const closePercentBrace = /*@__PURE__*/EditorView.inputHandler.of((view, from, to, text) => {
    if (text != "%" || from != to || view.state.doc.sliceString(from - 1, to + 1) != "{}")
        return false;
    view.dispatch(view.state.changeByRange(range => ({
        changes: { from: range.from, to: range.to, insert: "%%" },
        range: EditorSelection.cursor(range.from + 1)
    })), {
        scrollIntoView: true,
        userEvent: "input.type"
    });
    return true;
});

function directiveIndent(except) {
    return (context) => {
        let back = except.test(context.textAfter);
        return context.lineIndent(context.node.from) + (back ? 0 : context.unit);
    };
}
const tagLanguage = /*@__PURE__*/LRLanguage.define({
    name: "liquid",
    parser: /*@__PURE__*/parser.configure({
        props: [
            /*@__PURE__*/styleTags({
                "cycle comment endcomment raw endraw echo increment decrement liquid in with as": tags.keyword,
                "empty forloop tablerowloop": tags.atom,
                "if elsif else endif unless endunless case endcase for endfor tablerow endtablerow break continue": tags.controlKeyword,
                "assign capture endcapture": tags.definitionKeyword,
                "contains": tags.operatorKeyword,
                "render include": tags.moduleKeyword,
                VariableName: tags.variableName,
                TagName: tags.tagName,
                FilterName: /*@__PURE__*/tags.function(tags.variableName),
                PropertyName: tags.propertyName,
                CompareOp: tags.compareOperator,
                AssignOp: tags.definitionOperator,
                LogicOp: tags.logicOperator,
                NumberLiteral: tags.number,
                StringLiteral: tags.string,
                BooleanLiteral: tags.bool,
                InlineComment: tags.lineComment,
                CommentText: tags.blockComment,
                "{% %} {{ }}": tags.brace,
                "( )": tags.paren,
                ".": tags.derefOperator,
                ", .. : |": tags.punctuation
            }),
            /*@__PURE__*/indentNodeProp.add({
                Tag: /*@__PURE__*/delimitedIndent({ closing: "%}" }),
                "UnlessDirective ForDirective TablerowDirective CaptureDirective": /*@__PURE__*/directiveIndent(/^\s*(\{%-?\s*)?end\w/),
                IfDirective: /*@__PURE__*/directiveIndent(/^\s*(\{%-?\s*)?(endif|else|elsif)\b/),
                CaseDirective: /*@__PURE__*/directiveIndent(/^\s*(\{%-?\s*)?(endcase|when)\b/),
            }),
            /*@__PURE__*/foldNodeProp.add({
                "UnlessDirective ForDirective TablerowDirective CaptureDirective IfDirective CaseDirective RawDirective Comment"(tree) {
                    let first = tree.firstChild, last = tree.lastChild;
                    if (!first || first.name != "Tag")
                        return null;
                    return { from: first.to, to: last.name == "EndTag" ? last.from : tree.to };
                }
            })
        ]
    }),
    languageData: {
        commentTokens: { line: "#" },
        indentOnInput: /^\s*{%-?\s*(?:end|elsif|else|when|)$/
    }
});
const baseHTML = /*@__PURE__*/html();
function makeLiquid(base) {
    return tagLanguage.configure({
        wrap: parseMixed(node => node.type.isTop ? {
            parser: base.parser,
            overlay: n => n.name == "Text" || n.name == "RawText"
        } : null)
    }, "liquid");
}
/**
A language provider for Liquid templates.
*/
const liquidLanguage = /*@__PURE__*/makeLiquid(baseHTML.language);
/**
Liquid template support.
*/
function liquid(config = {}) {
    let base = config.base || baseHTML;
    let lang = base.language == baseHTML.language ? liquidLanguage : makeLiquid(base.language);
    return new LanguageSupport(lang, [
        base.support,
        lang.data.of({ autocomplete: liquidCompletionSource(config) }),
        base.language.data.of({ closeBrackets: { brackets: ["{"] } }),
        closePercentBrace
    ]);
}

export { closePercentBrace, liquid, liquidCompletionSource, liquidLanguage };
