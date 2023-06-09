import axios from "axios";

const token = localStorage.getItem("appUserThemeSettingsCode") || "";

axios.defaults.headers.common["Accept"] = "application/json";
// axios.defaults.baseURL = "http://172.107.167.27:8083/api";
axios.defaults.baseURL =
  process.env.REACT_APP_BASEURL || "https://grandlotto.azurewebsites.net/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
