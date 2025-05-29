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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchChannelByUser());
    }
  }, [dispatch, user?._id]);

  return (
    <div className="text-black min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover />
      <Header />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/channel/:id" element={<ChannelPage />} />
        <Route path="/channels/me" element={<ProtectedRoute><MyChannelPage /></ProtectedRoute>} />
        <Route path="/create-channel" element={<ProtectedRoute><CreateChannelPage /></ProtectedRoute>} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/videos/:id" element={<VideoPage />} />
        <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;