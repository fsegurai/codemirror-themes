import { EditorView, basicSetup } from "codemirror";
import {EditorState} from "@codemirror/state";
import {markdown, markdownLanguage} from "@codemirror/lang-markdown";
import {languages} from "@codemirror/language-data";
import mdSample from "./markdown.example";
// import { solarizedDark } from "../packages/solarized-dark";

const elCM = document.querySelector("#codemirror")!;

let editor = new EditorView({
    doc: mdSample,
    extensions: [
      basicSetup,
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        addKeymap: true,
        extensions: [],
      }),
    //   solarizedDark,
    ],
  parent: elCM,
});

export default editor;
