import { io } from "socket.io-client";
import { useUserStore } from "../store/useUserStore";

const { authUser } = useUserStore();

const socket = io("http://localhost:5001", {
  query: {
    userId: authUser._id,
  },
});

export default socket;
