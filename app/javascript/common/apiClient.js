import axios from "axios";

// Keep credentials and JSON defaults in one place for all frontend requests.
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Accept = "application/json";

export default axios;
