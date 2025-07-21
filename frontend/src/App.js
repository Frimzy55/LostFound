import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LoginPage from './authen/LoginPage';
import SignupPage from './authen/SignupPage';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import ReportLostItem from './sidemenus/ReportLostItem';
import ReportFoundItem from './sidemenus/ReportFoundItem';
import MyReports from './sidemenus/MyReports';
import MatchedItems from './sidemenus/MatchedItems';
import Notifications from './sidemenus/Notifications';
import Profile from './sidemenus/Profile';
import ChangePassword from './sidemenus/ChangePassword';
import Help from './sidemenus/Help';
import DashboardHome from './sidemenus/DashboardHome'; // <- create this

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* STUDENT DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<StudentDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="report-lost" element={<ReportLostItem />} />
          <Route path="report-found" element={<ReportFoundItem />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="matched-items" element={<MatchedItems />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* ADMIN ROUTE */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
