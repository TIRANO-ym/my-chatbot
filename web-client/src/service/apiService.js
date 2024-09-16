import config from "../config.json";
// import axios from 'axios';

const get = (url) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:${config.SERVER_PORT}${url}`, {
      method: "get",
      headers: {
        "content-type" : "application/json",
      }
    })
    .then(res => res.json())
    .then(res => {
      resolve(res);
    });
  });
};

// const get = (url) => {
//   return axios.get(`http://localhost:${config.SERVER_PORT}${url}`);
// };

const post = (url, content) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:${config.SERVER_PORT}${url}`, {
      method: "post",
      headers: {
        "content-type" : "application/json",
      },
      body: JSON.stringify({ data: content })
    })
    .then(res => res.json())
    .then(res => {
      resolve(res);
    });
  });
};

const postFile = (url, formData) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:${config.SERVER_PORT}${url}`, {
      method: "post",
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      resolve(res);
    });
  });
};

// const postForGetFile = (url, content) => {
//   return new Promise((resolve) => {
//     fetch(`http://localhost:${config.SERVER_PORT}${url}`, {
//       method: "post",
//       headers: {
//         "content-type" : "application/json",
//       },
//       body: JSON.stringify({ data: content })
//     })
//     .then(res => res.blob())
//     .then(res => {
//       resolve(res);
//     });
//   });
// };

const apiService = {
  get: get,
  post: post,
  postFile: postFile
};

export default apiService;