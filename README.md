# CodeBase

A full-stack, LeetCode-style coding practice platform. Solve problems, write code in an in-browser editor, and run it instantly against a real judge — all from a self-contained, dockerized stack.

## Features

- **In-browser code editor** powered by Monaco (the engine behind VS Code), with support for C++, Python, JavaScript, and Java
- **Live code execution** against a Judge0-based execution engine — get real stdout/stderr/status back, not a mock
- **User authentication** — signup/login with bcrypt-hashed passwords stored in MySQL, JWT-based sessions
- **Problem set** of curated LeetCode-style problems with full descriptions, difficulty, and acceptance rate
- **Dark, IDE-inspired UI** — the whole app is styled to feel like the code editor it's built around

## Tech stack

| Layer          | Technology                                  |
|----------------|----------------------------------------------|
| Frontend       | React, TypeScript, Vite, Tailwind CSS        |
| Code editor    | Monaco Editor                                |
| Backend        | Node.js, Express                             |
| Database       | MySQL 8                                      |
| Auth           | bcrypt (password hashing), JWT               |
| Code execution | Judge0 (public CE instance)                  |
| Containerization | Docker, Docker Compose                     |

## Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend   │────▶│   Backend    │────▶│    MySQL     │
│  (React/Vite)│      │ (Node/Express)│      │  (Docker)    │
└─────────────┘      └──────┬───────┘      └─────────────┘
                              │
                              ▼
                      ┌───────────────┐
                      │  Judge0 API    │
                      │ (code execution)│
                      └───────────────┘
```

All three services (frontend, backend, database) run as containers via Docker Compose — no external dependencies needed to run the full stack locally.

## Getting started

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. Create a `.env` file inside `server/` (see `.env.example` for the required variables):
   ```
   JWT_SECRET=your_secret_here
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=appuser
   DB_PASSWORD=your_password_here
   DB_NAME=leetcode_db
   ```

3. Build and start everything:
   ```bash
   docker-compose up --build
   ```

4. Open the app:
   - Frontend: [http://localhost:8080](http://localhost:8080)
   - Backend API: [http://localhost:4000](http://localhost:4000)

### First-time database setup

The `users` table needs to be created once inside the MySQL container:

```bash
docker exec -it codebase-db-1 mysql -u appuser -p leetcode_db
```

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|----------------------------------------|
| POST   | `/api/signup`     | Create a new user account              |
| POST   | `/api/login`      | Authenticate and receive a JWT         |
| POST   | `/api/execute`    | Run submitted code and get the result  |
| GET    | `/problems`       | List all problems                      |
| GET    | `/problem/:id`    | Get a single problem's details         |

## Roadmap

- [ ] Persist submissions to the database (currently in-memory)
- [ ] Real pass/fail judging against test cases (currently randomized for demo)
- [ ] User dashboard with solved-problem history
- [ ] Support for additional languages

## License

MIT


