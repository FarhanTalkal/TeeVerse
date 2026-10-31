const defaultBackendUrl = import.meta.env.DEV
  ? "http://localhost:8080/api/v1/dalle"
  : "https://teeverse.onrender.com/api/v1/dalle";

const config = {
  backendUrl: import.meta.env.VITE_BACKEND_URL || defaultBackendUrl,
};

export default config;
