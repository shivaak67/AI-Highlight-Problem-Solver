chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "showSolution") {
    // Check if an existing solution box already exists nearby
    const existing = document.querySelector(".ai-solution-box");
    if (existing) existing.remove();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const answerEl = document.createElement("div");
    answerEl.className = "ai-solution-box";
    answerEl.innerText = msg.solution;

    range.collapse(false);
    range.insertNode(answerEl);
  }
});


