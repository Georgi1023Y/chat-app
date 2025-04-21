import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import ThreeDPhone from "../components/ThreeDPhone";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useUserStore();

  const validateLogin = ({ email, password }) => {
    if (!email.trim()) {
      toast.error("Email is required");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = validateLogin(userInput);

    if (auth === true) {
      login(userInput);
    } else {
      toast.error("Invalid credentials");
      return;
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <Toaster />
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <Icon
                  icon="mingcute:chat-2-fill"
                  className="text-primary size-8"
                />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back!</h1>
              <p className="text-base-content/60">
                Log in to continue your journey
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ThreeDPhone
        title={"Stay Connected!"}
        subtitle={
          "Join our community to chat, share, and enjoy all that we offer."
        }
      />
    </div>
  );
};
export default LogIn;
