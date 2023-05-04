const useFetch = async (url, method, body) => {
  const baseURL =
    process.env.REACT_APP_BASEURL ||
    "https://test-server2-fasta.herokuapp.com/api";

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (localStorage.token) {
    headers.Authorization = "Bearer " + localStorage.token;
  }

  let configuration = {
    method: method,
    mode: "cors",
    headers: headers,
  };

  if (method !== "GET") {
    configuration.body = JSON.stringify(body);
  }

  const resp = await fetch(baseURL + url, configuration).then((res) =>
    res.json()
  );
  console.log(resp);
  return resp;
};

export default useFetch;
