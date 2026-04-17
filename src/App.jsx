import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FriendDetailPage from './pages/FriendDetailPage';
import TimelinePage from './pages/TimelinePage';
import StatsPage from './pages/StatsPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import { TimelineProvider } from './context/TimelineContext';
import { FriendsProvider } from './context/FriendsContext';

export default function App() {
  return (
    <FriendsProvider>
      <TimelineProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/friend/:id" element={<FriendDetailPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </TimelineProvider>
    </FriendsProvider>
  );
}
