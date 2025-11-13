# React Chat Dashboard

A responsive React + TypeScript app built with Vite.  
It includes:

- **Zustand** for global state management (search & chat)
- **React Router** for routing
- **Vitest + React Testing Library** for tests
- **Docker Compose** for easy local and production runs
- A **Chat window** with live timer and conversation handling
- Fully **responsive layout** (desktop + mobile)

---

## 🛠️ Setup Instructions

### 1️⃣ Clone and install

```bash
git clone git@github.com:rayto510/chatbot-web.git
cd chatbot-web
npm install
```

### 2️⃣ Run locally (dev)

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

Run all unit and integration tests:

```bash
npm test
```

---

## 🐳 Run with Docker Compose

### 1️⃣ Build and run

```bash
docker compose up --build
```

Visit [http://localhost:5173](http://localhost:5173)

### 2️⃣ Stop and remove containers

```bash
docker compose down
```

---

## 🧩 Features Overview

### Layout

- **Navbar**: logo + search input.
- **Side Menu**: "Apps" and "Documents" links.
- **Content Area**: scrollable pages loaded via React Router.

### Search

- Controlled by Zustand store (`useSearchStore`).
- Filters paragraphs dynamically as you type.
- Includes “clear” button to reset results.

### Chat

- **Header:** shows elapsed seconds, Reset & Close buttons.
- **Messages:** user on right, bot on left (randomized replies).
- **Input:** sends via Enter or Send button.
- **State:** managed via `useChatStore` (Zustand).

### Responsiveness

- Desktop: grid layout with sidebar + fixed chat window (400×600).
- Mobile: sidebar overlays, chat goes full-screen.

---

## 🧪 Testing Strategy

Uses **Vitest** + **React Testing Library**:

- Layout rendering
- Routing behavior
- Search filtering logic
- Chat interactions, timer, reset/close
- Mocks for `fetch()` (used in `Apps` and `Documents` pages)

---

## ⚙️ Design Decisions

| Topic                | Choice                         | Reason                                      |
| -------------------- | ------------------------------ | ------------------------------------------- |
| **State**            | Zustand                        | Simplicity + lightweight global store       |
| **Router**           | React Router v6                | Nested routes and outlet-based layouts      |
| **Styling**          | Plain CSS                      | Direct control and easy theme customization |
| **Testing**          | Vitest + RTL                   | Fast, browser-like unit testing             |
| **Containerization** | Docker Compose                 | Simple local + prod orchestration           |
| **Chat Timer**       | `useEffect` interval + Zustand | Easy reset + consistent cleanup             |

## 🚀 Future Enhancements

- Chat persistence (localStorage or API)
- Light/dark theme toggle
- Multi-language support
- Animated transitions

---

## 👨‍💻 Author Notes

This project demonstrates a **modern, testable, containerized** React setup.  
It’s optimized for performance, clarity, and maintainability — suitable for both local dev and production deployment.
