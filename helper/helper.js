const ResponseObj = {
  status: null,
  data: null,
  message: "",
  err: "",
};
const sendRes = (status, data, message, err) => {
  ResponseObj.status = status;
  ResponseObj.data = data;
  ResponseObj.message = message;
  ResponseObj.err = err;
  return ResponseObj;
};

module.exports = {
    sendRes,
};
