# Best Award 🎵🏆

A modern Vue 3 web application for managing and voting on top singles, albums, and artists. Built with Composition API, modular services, and scalable architecture.

---

## 🚀 Features

✅ User authentication with Firebase (email/password)

✅ Voting system with real-time updates (using Firebase Realtime Database)

✅ Modular, reusable services for API calls and business logic

✅ Clean, responsive UI using CSS modules and scoped styles

✅ Optimized lazy-loading of assets and images

✅ Loader animations for enhanced UX

✅ Clear component separation (UI, icons, services, utils)

✅ Error handling and user feedback mechanisms

✅ Easy-to-extend architecture for future award categories

---

## 🛠 Tech Stack

* **Vue 3** + Composition API
* **Pinia** for state management
* **Firebase** (Authentication + Realtime Database)
* **Axios** for API calls
* **Vite** for blazing-fast dev server
* **ESLint** + **Prettier** for code quality

---

## 📦 Project Structure

```
/src
  /api           → Axios instances
  /components    → Vue components (UI, Icons, Pages)
  /services      → Business logic (e.g., voteService.js)
  /stores        → Pinia stores (auth, user data)
  /views         → Top-level page components
```

---

## 🔧 Setup & Installation

1️⃣ **Clone the repository:**

```bash
git clone https://github.com/YangBang74/best-award.git
```

2️⃣ **Install dependencies:**

```bash
cd best-award
npm install
```

3️⃣ **Configure Firebase:**

* Add your Firebase project settings to `.env` or directly in the `src/api` setup.

4️⃣ **Run locally:**

```bash
npm run dev
```

5️⃣ **Build for production:**

```bash
npm run build
```

---

## 🌍 Live Demo

🚧 https://best-award.vercel.app/

---

## 🤝 Contributing

If you want to contribute:

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
