import * as monaco from "monaco-editor";
// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired

const editorContainer = document.getElementById("container");
const consoleSection = document.getElementById("console");

let prevEditorValue = 'console.log("Hello world!");\n';
const editor = monaco.editor.create(editorContainer, {
  value: prevEditorValue,
  language: "javascript",
  theme: "vs-dark",
});
window.addEventListener("resize", () => {
  editor.layout();
});

// save changes
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    prevEditorValue = editor.getValue();
  }
});

const restoreButton = document.getElementById("restore_button");
restoreButton.addEventListener("click", () => {
  editor.setValue(prevEditorValue);
});

const consoleLog = (content) => {
  consoleSection.insertAdjacentHTML(
    "beforeend",
    `<p class="console_log">${content}</p>`
  );
};

const consoleError = (error) => {
  consoleSection.insertAdjacentHTML(
    "beforeend",
    `<p class="console_error">${error}</p>`
  );
};

const consoleClear = () => {
  consoleSection.innerHTML = "";
};

{
  // rewrite the standard "console" object for userFunc
  const console = {
    log: consoleLog,
    error: consoleError,
    clear: consoleClear,
  };

  const runButton = document.getElementById("run_button");
  runButton.addEventListener("click", () => {
    const editorValue = editor.getValue();
    const userFunc = new Function("console", editorValue);
    try {
      consoleClear();
      userFunc(console);
      prevEditorValue = editor.getValue();
    } catch (error) {
      consoleError(error);
    }
  });

  const clearButton = document.getElementById("clear_button");
  clearButton.addEventListener("click", () => {
    prevEditorValue = editor.getValue();
    editor.setValue("");
    consoleClear();
  });
}
