# Student Handout: Workout / Study Timer (React Native Web)

This assignment is intentionally **almost** done. Your job is to complete a few TODOs (like a mini FreeCodeCamp-style challenge).

## What you’ll practice

- Following instructions
- Small, focused coding changes (TypeScript/JavaScript)
- A lightweight Git workflow: branch → commit → pull request

---

## 1) Git 101 (just enough to finish)

Git is a tool for tracking changes in code.

- **Repository (repo):** the project folder + change history
- **Branch:** a safe “lane” for your work so `main` stays stable
- **Commit:** a small, named snapshot of your changes
- **Pull Request (PR):** how you submit your branch back into `main`

Optional learning (if you’re curious): https://git-scm.com/

---

## 2) Getting started in CodeSandbox (recommended)

### Create a free CodeSandbox account

1. Go to https://codesandbox.io/
2. Sign up (GitHub login is easiest if you already have it)

### Import the project repo

1. From your CodeSandbox dashboard, choose **Import / Create → Repository**
2. Paste the repo URL your interviewer gave you
3. Let it install dependencies and start up

### Start the project (dev mode)

- Usually CodeSandbox auto-starts the dev server.
- If not, open the terminal and run:
  - `npm install`
  - `npm run dev`

---

## 3) The assignment

Complete the TODOs in:

- `src/timerLogic.ts`

When you’re done, the app’s **Quick Checks** should all show ✅.

---

## 4) Required Git workflow (what you must do)

### A) Create a new branch

Run:

```bash
git checkout -b feature/your-name
```

Example:

```bash
git checkout -b feature/jordan
```

### B) Commit your changes (with a clear message)

Check your changes:

```bash
git status
```

Stage them:

```bash
git add .
```

Commit with a message that explains the change:

```bash
git commit -m "Fix time formatting and stop timer at zero"
```

### C) Push your branch

```bash
git push -u origin feature/your-name
```

### D) Open a Pull Request (PR) to `main`

1. Go to the repo on GitHub
2. Click **Compare & pull request**
3. Make sure the PR targets `main`
4. In the PR description, include:
   - What you changed
   - Anything that was tricky
   - A screenshot showing the Quick Checks are ✅

---

## 5) Running it on your laptop (optional)

### Install prerequisites

- Node.js (LTS) + npm
- Git

### Clone the repo

```bash
git clone <REPO_URL>
cd workout-study-timer-rnw
```

### Start the dev server

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:3000`).

### Run the checks (optional)

```bash
npm run check
```

---

## 6) What “done” looks like (submission checklist)

- [ ] Branch created: `feature/<your-name>`
- [ ] TODOs completed in `src/timerLogic.ts`
- [ ] Quick Checks show ✅✅✅✅✅
- [ ] At least 1 meaningful commit message
- [ ] PR opened to `main`
- [ ] PR description includes:
  - what you changed
  - tricky parts
  - screenshot of checks
