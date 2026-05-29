# TaskFlow - Task Management Dashboard

A modern, responsive Task Management Dashboard built with React + Vite + Tailwind CSS.

## Tech Stack

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- JSON Server

## Features

- Authentication (Register/Login with validation)
- Protected routes
- Dashboard analytics cards
- Task CRUD (create/edit/delete/update status)
- Task fields: title, description, priority, due date, status
- Search, priority filters, pagination
- Drag and drop interaction for task status adjustments
- Dark mode
- Toast notifications
- Modal popup for add/edit tasks
- Empty and loading states
- Fully responsive SaaS-style UI

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Start JSON Server in one terminal:

```bash
npm run server
```

3. Start Vite dev server in another terminal:

```bash
npm run dev
```

4. Open app:

- [http://localhost:5173](http://localhost:5173)

## JSON Server / Mock API Guide

- API base URL: `http://localhost:3001`
- Endpoints used:
  - `GET /tasks?userId=<id>`
  - `POST /tasks`
  - `PATCH /tasks/:id`
  - `DELETE /tasks/:id`

You can edit seed data in `db.json`.

## Deployment (Vercel)

1. Push this project to GitHub.
2. In Vercel, click **Add New Project** and import repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

> Note: Vercel deploy hosts frontend only. For production API, host JSON server separately or replace with a real backend/MockAPI.

## Folder Structure (ZIP-ready)

```text
.
├── db.json
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
└── src
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets
    ├── components
    │   ├── common
    │   │   ├── EmptyState.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Spinner.jsx
    │   │   ├── TextInput.jsx
    │   │   └── ToastContainer.jsx
    │   ├── layout
    │   │   ├── Navbar.jsx
    │   │   └── Sidebar.jsx
    │   └── tasks
    │       ├── TaskCard.jsx
    │       ├── TaskFilters.jsx
    │       ├── TaskList.jsx
    │       └── TaskModal.jsx
    ├── context
    │   ├── AuthContext.jsx
    │   ├── TaskContext.jsx
    │   ├── ThemeContext.jsx
    │   └── ToastContext.jsx
    ├── hooks
    │   ├── useDebounce.js
    │   └── useLocalStorage.js
    ├── layouts
    │   └── DashboardLayout.jsx
    ├── pages
    │   ├── CompletedPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── LoginPage.jsx
    │   ├── NotFoundPage.jsx
    │   ├── ProfilePage.jsx
    │   ├── RegisterPage.jsx
    │   └── TasksPage.jsx
    ├── routes
    │   ├── AppRoutes.jsx
    │   └── ProtectedRoute.jsx
    ├── services
    │   ├── apiClient.js
    │   ├── authService.js
    │   └── taskService.js
    └── utils
        ├── constants.js
        ├── date.js
        └── validators.js
```
