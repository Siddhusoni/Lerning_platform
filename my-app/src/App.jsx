import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import QuizPage from './pages/QuizPage';
import Dashboard from './pages/Dashboard';
import CourseDetails from './pages/CourseDetail';
import EnrollPage from './pages/EnrollPage';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsService from './pages/TermsService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQs from './pages/FAQs';
import AdminDashboard from './components/admin/AdminDashboard';
import NewsManagement from './components/admin/NewsManagement';
import CourseManagement from './components/admin/CourseManagement';
import Service from './pages/Services';
import EnrollCourse from './pages/EnrollCourse';
import MembershipPlan from './pages/MembershipPlan';
import UserMembershipPlan from './pages/UserMembershipPlan';
import MemberShipMange from './components/admin/MembershipMange';
import SubscriptionDetails from './pages/SubscriptionDetails';
import AdminAds from './components/admin/AdminAds';
import AdminAdsManage from './components/admin/AdminAdsManage';
import Auth from './components/Auth';


function App() {
  return (
    <Router>
      <Navbar/>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/enroll" element={<EnrollPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<NewsManagement />} />
          <Route path="/admin/course" element={<CourseManagement />} />
          <Route path="service" element={<Service />} />
          <Route path="/enroll/:id" element={<EnrollCourse />} />
          <Route path="/admin/membership" element={<MembershipPlan />} />
          <Route path="/Membership" element={<UserMembershipPlan />} />
          <Route path="/MemberShipMange" element={<MemberShipMange />} />
          <Route path="/subscription-details" element={<SubscriptionDetails />} />
          <Route path="/ads" element={<AdminAds/>} />
          <Route path="/adminads" element={<AdminAdsManage/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
