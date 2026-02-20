# Amazon Post Generator – Live Vanilla JS Frontend

**Live Demo**: https://amazon-post-generator-frontend.vercel.app/

Functional frontend (Vanilla JS UI + async calls).  
**Server Backend** (private Render): Prompt engineering for OpenRouter LLM.

![Vanilla JS](https://img.shields.io/badge/JS-Vanilla-blue) ![AI](https://img.shields.io/badge/AI-Prompt_Eng-orange) ![Vercel](https://img.shields.io/badge/Vercel-Frontend-black) ![Render](https://img.shields.io/badge/Render-Backend-green)

## How It Works
1. Frontend: Input product → JS fetch to backend.
2. Backend (Private): Prompt engineering → OpenRouter AI post gen.

## Demo Screenshots
![Home UI](AGP%20Home.png?raw=true)

![AI Output](AGP%20AI.png?raw=true)
## Real Frontend Code (From index.html)
``` js
generateBtn.addEventListener("click", async () => {
  const text = document.getElementById("textInput").value.trim();
  const url = document.getElementById("urlInput").value.trim();
  const code = document.getElementById("codeInput").value.trim();
  const model = document.getElementById("modelSelect").value;

  if (!text || !url) {
    alert("Please enter both description and product link.");
    return;
  }

  outputArea.textContent = "Generating...";
  const backendUrl = "https://amazon-post-generator-backend.onrender.com";
  try {
    const response = await fetch(`${backendUrl}/api/rewrite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, url, code, model })
    });

    const data = await response.json();

    if (response.ok) {
      outputArea.textContent = `${data.output}\n\n#AmazonFinds #AllAboutSavings ${data.productHashtag ? data.productHashtag : ""}\nReach Score: ${data.reachScore}`;
    } else {
      outputArea.textContent = `Error: ${data.error || "Unknown error"}`;
    }
  } catch (err) {
    outputArea.textContent = "Network or server error: " + err.message;
  }
});
