# 🌐 NTP Cuber 2

**NTP Cuber 2** is a modern, responsive web application designed to help speedcubers improve their skills through structured courses, algorithm resources, and personalized coaching.

🔗 **Live Demo:**  
https://jashan337.github.io/ntpcuber2/index.html

---

## 🚀 Features

### 🧠 Learning Platform
- Structured cubing courses from beginner to advanced
- Clear skill progression system
- Clean and focused learning experience

### 📊 Algorithm Resources
- 2×2 algorithms (CLL, EG-1, EG-2)
- Megaminx 4LLL breakdown (EO, CO, EP, CP)
- Organized multi-level navigation system

### 🌍 Multi-language Support
- English 🇺🇸 and Thai 🇹🇭 support
- Language saved using `localStorage`
- Real-time switching without page reload

### 🎯 Coaching System
- Dedicated coaching page
- Highlights personalized training services
- Designed for future booking integration

### 📱 Responsive Design
- Mobile-first layout
- Adaptive navigation (desktop dropdown + mobile drawer)
- Smooth transitions with modern UI

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- Tailwind CSS
- Vanilla JavaScript (ES6+)

### Architecture Highlights
- Custom Web Components (`<my-navbar>`)
- Modular JavaScript files
- Dynamic DOM rendering
- Client-side state using `localStorage`

---

## 📁 Project Structure
```bash
ntpcuber2/
├── algorithms/
│   ├── 2x2/
│   │   ├── cll.html
│   │   ├── eg1.html
│   │   └── eg2.html
│   └── megaminx/
│       └── 4lll.html
│
├── js/
│   ├── alg.js
│   ├── coaching.js
│   ├── footer.js
│   ├── index.js
│   ├── langswitch.js
│   ├── navbar.js
│   └── resources.js
│
├── index.html
├── course.html
├── coaching.html
├── learning-page.html
├── resources.html
└── README.md
```

---

## ⚙️ How to Run Locally

### Option 1: Open Directly
Simply open: index.html in your browser.

---

### Option 2: Local Server (Recommended)
python -m http.server \
Then visit: \
http://localhost:8000

---

## 🌍 Deployment

This project is hosted using **GitHub Pages**.

### Steps:
1. Push code to repository
2. Go to **Settings → Pages**
3. Select branch (`main`)
4. Set root folder (`/`)

---

## ✨ Key Features & Implementation

### 🧩 Custom Navbar Component
- Built using Web Components
- Handles:
  - navigation routing
  - dropdown menus
  - mobile menu
  - language switching

---

### 🌐 Language System
- Centralized translation object
- Dynamic DOM updates
- Persistent language state using `localStorage`

```js
window.dispatchEvent(new CustomEvent('languageChanged'))
```

---

### ⚡ Dynamic UI Rendering
- Journey timeline and course cards generated dynamically
- Reduces duplication across pages

---

### 📈 Future Improvements
- User authentication & tracking
- Payment gateway for courses
- Dashboard for student progress
- Search and filter for algorithms
- Migration to React / Next.js


### 🧑‍💻 Author
**Natthaphat Mahtani** \
Speedcuber & Developer \
Focused on building structured and efficient learning systems for cubers.

### ⭐ Support
If you like this project, consider:
- ⭐ Starring the repo
- Sharing with the cubing community


### 📌 Notes
- Lightweight and fast (no frameworks)
- Fully client-side architecture
- Designed with scalability in mind

