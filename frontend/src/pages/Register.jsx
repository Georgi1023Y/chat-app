import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import ThreeDPhone from "../components/ThreeDPhone";
import toast, { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateSignUp = ({ fullName, email, password }) => {
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false;
    } else if (!email.trim()) {
      toast.error("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    } else if (!password) {
      toast.error("Password is required");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    } else {
      return true;
    }
  };

  const { signup, isSigningUp } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = validateSignUp(userInput);

    if (auth === true) signup(userInput);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <Toaster />
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <Icon
                  icon="mingcute:chat-2-fill"
                  className="text-primary size-8"
                />
              </div>
              <h1 className="text-2xl font-bold mt-2"> Create Account</h1>
              <p className="text-base-content/60">
                Become part of something awesome
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="font-medium pb-2 text-sm">Full Name</span>
              </label>
              <div className="relative w-full text-sm">
                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                  <User className="w-4 h-4 text-gray-500" />
                </div>

                <input
                  type="text"
                  className="w-full border border-gray-300 bg-base-200 rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Georgi Beshirov"
                  value={userInput.fullName}
                  onChange={(e) =>
                    setUserInput({ ...userInput, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-medium pb-2 text-sm">Email</span>
              </label>
              <div className="relative w-full text-sm">
                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>

                <input
                  type="text"
                  className="w-full border border-gray-300 bg-base-200 rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                  value={userInput.email}
                  onChange={(e) =>
                    setUserInput({ ...userInput, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="font-medium pb-2 text-sm">Password</span>
              </label>
              <div className="relative w-full text-sm">
                <div className="absolute top-1/2 left-3 -translate-y-1/2">
                  <Lock className="w-4 h-4 text-gray-500" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full border border-gray-300 bg-base-200 rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="••••••••"
                  value={userInput.password}
                  onChange={(e) =>
                    setUserInput({ ...userInput, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ThreeDPhone
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default Register;
