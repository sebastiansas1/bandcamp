const extract = response => {
  const cookies = String(response.headers["set-cookie"]);
  const token = cookies.split("token=")[1].split(";")[0];
  return token;
};

export default { extract };
