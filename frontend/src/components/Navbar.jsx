import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";
import { Icon } from "@iconify/react";
const Navbar = () => {
  const { logout, authUser } = useUserStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon
                  icon="mingcute:chat-2-fill"
                  className="text-primary size-6"
                />
              </div>
              <h1 className="text-lg font-bold">TalkHub</h1>
            </Link>
          </div> 

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className={`
              btn btn-outline btn-primary btn-sm gap-2 transition-colors
              
              `}
            >
              <Icon icon="hugeicons:settings-01" className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <div className="flex flex-row gap-5">
                <Link
                  to={"/profile"}
                  className={`btn btn-outline btn-primary btn-sm gap-2`}
                >
                  <Icon icon="iconoir:profile-circle" className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <Icon icon="grommet-icons:logout" className="size-4" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
