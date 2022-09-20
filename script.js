require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });

let editor = "";
require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("container"), {
    value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
    language: "javascript",
  });
});

const runButton = document.getElementById("run_button");
runButton.addEventListener("click", () => {
  const editorValue = editor.getValue();
  const userFunc = new Function(editorValue);
  userFunc();
});
