chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "solveWithAI",
    title: "Solve with AI",
    contexts: ["selection"]
  });
});

function sendSolution(tabId, message) {
  chrome.tabs.sendMessage(tabId, message, () => {
    if (chrome.runtime.lastError) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      }, () => {
        chrome.tabs.sendMessage(tabId, message);
      });
    }
  });
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "solveWithAI") {
    const selectedText = info.selectionText;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer <INSERT KEY>"
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "If text is informational, summarize it. If it's a homework problem, solve it step-by-step and give the final answer."
            },
            { role: "user", content: selectedText }
          ]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Full error:", data);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const answer = data?.choices?.[0]?.message?.content || "⚠️ No content received";

      sendSolution(tab.id, {
        action: "showSolution",
        solution: answer
      });

    } catch (err) {
      console.error("AI request failed:", err);
      sendSolution(tab.id, {
        action: "showSolution",
        solution: "⚠️ Error: Could not fetch AI response. Check console for details."
      });
    }
  }
});
