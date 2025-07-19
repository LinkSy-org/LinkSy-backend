let BASE_URL = process.env.REACT_APP_BASE_URL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:3000/";
}

export { BASE_URL };