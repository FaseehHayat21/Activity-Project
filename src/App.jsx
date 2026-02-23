import {} from "react";
import LandingPage from "./Pages/LandingPage/LandingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CustomerLogin from "./Component/Registration/CustomerLogin/CustomerLogin";
import CustomerSignup from "./Component/Registration/CustomerSignup/CustomerSignup";
import CustomerDashboard from "./Pages/CustomerDashboard/CustomerDashboard";
import Profile from "./Component/Customer/Profile/Profile";
import AdminPage from "./Component/Customer/Admin/AdminPage/AdminPage";
import AdminLogin from "./Component/Customer/Admin/AdminLogin/AdminLogin";
import DailyLog from "./Component/Dailylog/DailyLog";
import FitnessRoutines from "./Pages/FitnessRoutines/FitnessRoutines";
import PublicRoutines from "./Component/PublicRoutines/PublicRoutines";
import RoutineDetails from "./Component/RoutineDetails/RoutineDetails";
import UserProgress from "./Component/UserProgress/UserProgress";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/signup" element={<CustomerSignup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/fitnessroutines" element={<FitnessRoutines />} />
          <Route path="/routines" element={<PublicRoutines />} />
          <Route path="/routine/:id" element={<RoutineDetails />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/customerDashboard/" element={<CustomerDashboard />}>
            <Route index element={<Profile />} />
            <Route path="dailylog" element={<DailyLog />} />
          <Route path="progress" element={<UserProgress />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
