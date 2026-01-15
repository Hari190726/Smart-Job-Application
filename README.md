# 🌟 Smart Job Portal

Welcome! This is a complete Job Portal application where **Candidates** can apply for jobs and **Recruiters** can post jobs and manage applications.

---

## ✨ Features

### 👤 For Candidates
*   **Search Jobs**: Find jobs by title, location, or keywords.
*   **Apply easily**: Apply with your resume in seconds.
*   **Save Jobs**: Heart your favorite jobs to view them later.
*   **Track Status**: See if you are Shortlisted or Rejected in "My Applications".
*   **Share**: Share job links with friends easily.

### 🏢 For Recruiters
*   **Post Jobs**: Create detailed job listings.
*   **Company Profile**: Showcase your company logo, website, and description.
*   **Dashboard**: See beautiful charts of your application stats.
*   **Manage Applications**: View resumes and update status (Shortlist/Reject) with one click.
*   **Export**: Download candidate data to Excel.

---

## 🚀 Getting Started

Follow these simple steps to run the project on your computer.

### Prerequisites (What you need installed)
1.  **Node.js**: [Download here](https://nodejs.org/) (Version 14 or higher).
2.  **XAMPP (for MySQL)**: [Download here](https://www.apachefriends.org/index.html).

---

### Step 1: Setup the Backend (Server)

1.  Open your terminal (Command Prompt or PowerShell).
2.  Go to the `server` folder:
    ```bash
    cd server
    ```
3.  Install the necessary tools:
    ```bash
    npm install
    ```
4.  **Important**: Create a file named `.env` inside the `server` folder and paste this exact content:
    ```env
    PORT=5000
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=job_portal
    JWT_SECRET=mysecretkey123
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```
    *You should see "Server running on port 5000" and "Database connected".*

---

### Step 2: Setup the Frontend (Client)

1.  Open a **new** terminal window.
2.  Go to the `client` folder:
    ```bash
    cd client
    ```
3.  Install the necessary tools:
    ```bash
    npm install
    ```
4.  Start the website:
    ```bash
    npm run dev
    ```
5.  Open the link shown (usually `http://localhost:5173`) in your browser.

---

## ❓ Troubleshooting (Common Issues)

### 🔴 Error: `connect ECONNREFUSED 127.0.0.1:3306`
**What it means:** The server cannot connect to your Database.
**How to fix:**
1.  Open **XAMPP Control Panel**.
2.  Find **MySQL** and click the **Start** button.
3.  Wait for it to turn **Green**.
4.  Go back to your server terminal and try `npm run dev` again.

### 🔴 Error: `MySQL shutdown unexpectedly` in XAMPP
**What it means:** Your database files might be corrupted.
**How to fix:**
1.  Go to `C:\xampp\mysql`.
2.  Rename the `data` folder to `data_old`.
3.  Create a new empty folder named `data`.
4.  Copy content from `backup` folder into the new `data` folder.
5.  Copy your database folder (`job_portal`) from `data_old` to `data`.
6.  **Crucial**: Copy the `ibdata1` file from `data_old` to `data`.
7.  Restart MySQL in XAMPP.

### 🔴 Page is Blank or white?
*   Check the browser console (F12 > Console) for errors.
*   Make sure `npm run dev` is running in **both** the client and server terminals.

---

## 🛠️ Tech Stack
*   **Frontend**: React, TailwindCSS, Vite
*   **Backend**: Node.js, Express
*   **Database**: MySQL

## 📂 Project Structure

```
/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # Axios configuration
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Application pages
│   │   └── ...
│   └── ...
│
└── server/                 # Node.js Backend
    ├── config/            # Database config
    ├── controllers/       # Route logic
    ├── middleware/        # Auth & Upload middleware
    ├── models/            # Sequelize models
    ├── routes/            # API routes
    ├── uploads/           # Stored resume files
    └── ...
```

## 🛡️ API Endpoints

- **Auth**: `/auth/register`, `/auth/login`
- **Jobs**: `/jobs` (GET, POST, GET :id)
- **Applications**: `/applications` (GET, POST, PATCH status)
- **Saved Jobs**: `/saved-jobs` (POST toggle, GET list, GET check)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).