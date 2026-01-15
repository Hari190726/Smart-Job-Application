# Smart Job Portal

A full-stack job portal application connecting candidates with recruiters. Built with React, Node.js, Express, and MySQL.

## 🚀 Features

### For Candidates
- **User Authentication**: Secure registration and login.
- **Job Search**: Browse and search for jobs by title, location, and type.
- **Job Details**: View comprehensive job descriptions and requirements.
- **Apply for Jobs**: Submit applications with resume uploads.
- **Saved Jobs**: Save interesting jobs to view later.
- **My Applications**: Track the status of your submitted applications.

### For Recruiters
- **Job Posting**: Create and manage job listings.
- **Dashboard**: Visual analytics of application statistics (charts).
- **Application Management**: View, shortlist, or reject applications.
- **Resume Preview**: View candidate resumes directly in the browser.
- **Export Data**: Download application data as Excel/CSV.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API requests
- **React Hook Form** for form handling
- **Chart.js** for dashboard analytics
- **Lucide React** for icons

### Backend
- **Node.js & Express**
- **MySQL** (Database)
- **Sequelize** (ORM)
- **JWT** (JSON Web Tokens) for authentication
- **Multer** for file uploads
- **Bcryptjs** for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL Server (e.g., XAMPP, MySQL Workbench)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Hari190726/Smart-Job-Application.git
cd Smart-Job-Application
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=job_portal
JWT_SECRET=your_super_secret_key
```

Start the backend server:
```bash
# This will automatically create the database tables
npm run dev
```
*Note: Ensure your MySQL server is running before starting the backend.*

### 3. Frontend Setup
Open a new terminal, navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

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
