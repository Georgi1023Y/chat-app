import Navbar from "./components/Navbar";
import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";

import { Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useUserStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogIn /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <UserProfile /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
