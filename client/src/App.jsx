import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
// Pages will be imported here
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetails from './pages/JobDetails';
import Dashboard from './pages/Dashboard';
import MyApplications from './pages/MyApplications';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="jobs" element={<Home />} />
                    <Route path="jobs/:id" element={<JobDetails />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="my-applications" element={<MyApplications />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
