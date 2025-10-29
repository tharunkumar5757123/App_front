// src/utils/socket.js
import { io } from "socket.io-client";

// Use environment variable or fallback to localhost
const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Initialize Socket.io connection
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,       // Automatically connect
  reconnection: true,      // Enable reconnection
  reconnectionAttempts: 5, // Retry up to 5 times
  reconnectionDelay: 1000, // Wait 1s between retries
  timeout: 20000,          // Connection timeout
});

// Optional: debug logs
socket.on("connect", () => {
  console.log("✅ Connected to socket server:", SOCKET_URL);
});

socket.on("disconnect", (reason) => {
  console.log("⚠️ Disconnected from socket server:", reason);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

export default socket;
