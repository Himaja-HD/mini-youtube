import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannelByUser } from './features/channel/channelThunks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Home from './pages/HomePage';
import Header from './components/Header';
import Nav from './components/Nav';
import Profile from './pages/ProfilePage';
import ChannelPage from './pages/ChannelPage';
import CreateChannelPage from './pages/CreateChannelPage';
import SearchPage from './pages/SearchPage';
import VideoPage from './pages/VideoPage';
import MyChannelPage from './pages/MyChannelPage';
import ProtectedRoute from './components/ProtectedRoute';
import UploadPage from "./components/UploadPage";

function App() {
  const dispatch = useDispatch(); // dispatch
  const user = useSelector((state) => state.auth.user); // user

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchChannelByUser()); // fetch channel
    }
  }, [dispatch, user?._id]); // deps

  return (
    <div className="text-black min-h-screen"> {/* container */}
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover /> {/* toast */}
      <Header /> {/* header */}
      <Nav /> {/* nav */}

      <Routes> {/* routes */}
        <Route path="/" element={<Home />} /> {/* home */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* profile */}
        <Route path="/channel/:id" element={<ChannelPage />} /> {/* channel */}
        <Route path="/create-channel" element={<ProtectedRoute><CreateChannelPage /></ProtectedRoute>} /> {/* create channel */}
        <Route path="/channels/me" element={<ProtectedRoute><MyChannelPage /></ProtectedRoute>} /> {/* my channel */}
        <Route path="/login" element={<Login />} /> {/* login */}
        <Route path="/register" element={<Register />} /> {/* register */}
        <Route path="/search/:query" element={<SearchPage />} /> {/* search */}
        <Route path="/videos/:id" element={<VideoPage />} /> {/* video */}
        <Route path="/upload" element={<UploadPage />} /> {/* upload */}
      </Routes>
    </div>
  );
}

export default App;
