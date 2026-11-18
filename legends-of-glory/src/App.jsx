import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Landing from './pages/Landing';
import LandingIntro from './pages/LandingIntro';
import StaffManagement from './pages/StaffManagement';
import Vote from './pages/Vote';
import ArtistPage from './pages/ArtistPage';
import BehindTheScenes from './pages/BehindTheScenes';
import StaffPage from './pages/StaffPage';
import ArtistStories from './pages/ArtistStories';
import Backstory from './pages/Backstory';
import News from './pages/News';
import Trailers from './pages/Trailers';
import GloryIntellect from './pages/GloryIntellect';
import Neecole from './pages/Neecole';
import LegendsSeasons from './pages/LegendsSeasons';
import Season2 from './pages/Season2';
import Season3 from './pages/Season3';
import Glenn from './pages/Glenn';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<LegendsSeasons />} />
      <Route path="/season-1" element={<LandingIntro />} />
      <Route path="/season-2" element={<Season2 />} />
      <Route path="/season-3" element={<Season3 />} />
      <Route path="/glenn" element={<Glenn />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/staff-management" element={<StaffManagement />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/artist/:id" element={<ArtistPage />} />
      <Route path="/behind-the-scenes" element={<BehindTheScenes />} />
      <Route path="/staff" element={<StaffPage />} />
      <Route path="/artist-stories" element={<ArtistStories />} />
      <Route path="/backstory" element={<Backstory />} />
      <Route path="/news" element={<News />} />
      <Route path="/trailers" element={<Trailers />} />
      <Route path="/glory-intellect" element={<GloryIntellect />} />
      <Route path="/neecole" element={<Neecole />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App