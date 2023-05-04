import axios from "axios";
import "../config/axios";
import { LOGIN_URL } from "../config/urlConfigs";

const loginUser = () => {
  return axios
    .get(LOGIN_URL)
    .then((response) => {
      return { status: response?.status, data: response?.data };
    })
    .catch((error) => {
      handleError(error);
    });
};

const handleGETRequest = async (URL) => {
  const reponse = await axios
    .get(URL)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      handleError(error);
    });

  return reponse;
};

const handlePOSTRequest = async (url, payload) => {
  const response = await axios
    .post(url, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      handleError(error);
    });

  return response;
};

const handlePUTRequest = async (url, payload) => {
  const response = await axios
    .put(url, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      handleError(error);
    });

  return response;
};

const handleDELETERequest = async (URL) => {
  const reponse = await axios
    .delete(URL)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      handleError(error);
    });

  return reponse;
};

const handleError = (error) => {
  if (error.response) {
    return {
      error: error.response.data,
      status: error.response.status,
      message: error.response.message,
      headers: error.response.headers,
    };
  } else if (error.request) {
    return {
      error: error.message,
    };
  } else {
    return {
      error: error.message,
    };
  }
};

export {
  loginUser,
  handleGETRequest,
  handlePOSTRequest,
  handlePUTRequest,
  handleDELETERequest,
};
