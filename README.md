# AI Highlighter Solver – Chrome Extension
A Chrome extension that lets you highlight any text, right-click, and get an AI-generated summary or solution inserted directly into the webpage.

## Features
- Right-click Solve with AI on highlighted text
- Sends the selected text to an AI model (OpenAI/OpenRouter)
- Injects the answer directly into the webpage
- Simple, clean dark-themed answer box

## Files
manifest.json
background.js
content.js
style.css

## Install
1. Open Chrome → go to chrome://extensions
2. Enable Developer Mode
3. Click Load unpacked
4. Select this project folder

## API Setup
Replace the key in background.js
"Authorization": "Bearer <INSERT KEY>"

Use a valid model:
Ex - model: "gpt-4o"

## How it works
- Background script handles the right-click menu and API request
- Content script inserts the AI’s response under your selected text
- CSS styles the answer box

  ## Usage
1. Highlight text
2. Right-click → Solve with AI
3. Answer appears immediately on the page
