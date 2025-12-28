# JSON AIO - All-In-One Developer Toolkit 🛡️

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-blue?style=for-the-badge&logo=vercel)](https://d21vtojgd3id3.cloudfront.net)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](./LICENSE)
[![React](https://img.shields.io/badge/Built_With-React_Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

**The privacy-first, offline-capable alternative to online JSON formatters.**

Most online JSON tools send your data to a backend server. **JSON AIO does not.** Every calculation—formatting, diffing, converting, and decoding—happens 100% inside your browser's JavaScript engine.

## 🚀 Live Demo
👉 **Use the Tool:** [https://d21vtojgd3id3.cloudfront.net](https://d21vtojgd3id3.cloudfront.net)

---

## ✨ Features

### 1. 🔒 Privacy-First Architecture
* **Zero Backend:** No database, no API calls, no tracking.
* **Secure:** Perfect for formatting sensitive production logs or debugging JWTs.

### 2. ⚡ Offline PWA (Progressive Web App)
* **Installable:** Adds a native app icon to your Desktop/Dock.
* **Offline-Ready:** Works perfectly even when you have no internet connection.

### 3. 🛠️ The Toolkit
* **JSON Editor:** High-performance Monaco Editor (VS Code engine) with syntax highlighting and error detection.
* **Diff Checker:** Compare two JSON objects side-by-side to find differences instantly.
* **JWT Decoder:** Decode JSON Web Tokens (Headers/Payloads) locally without pasting them into public sites.
* **Converter:** Smart JSON <-> String converter for cleaning up logs.
* **Sharable Links:** Share code snippets via URL (compressed with LZ-String, no database required).

---

## 🛠️ Tech Stack

* **Frontend:** React + Vite
* **Language:** JavaScript (ES6+)
* **Styling:** Tailwind CSS (Dark/Light Mode)
* **Editor Engine:** `@monaco-editor/react`
* **Routing:** `react-router-dom`
* **Infrastructure:** AWS S3 + CloudFront (CDN)
* **CI/CD:** GitHub Actions

---

## 📦 Installation (Run Locally)

If you want to run this project on your own machine:

```bash
# 1. Clone the repository
git clone [https://github.com/BhaskrPandey/json-aio-tool.git](https://github.com/BhaskrPandey/json-aio-tool.git)

# 2. Enter the directory
cd json-aio-tool

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev