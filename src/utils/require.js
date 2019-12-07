import fetch from 'dva/fetch';
import queryString from 'query-string';
import { message } from "antd";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  // console.log(response)
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      // console.log(data)
      if (data.code === 2000) {
        // console.log(data)
        // console.log(data.msg !== null)
        data.msg && message.success(data.msg)
      } else {
        // data.msg && message.error(data.msg)
        // cookie.clearCookie()
        // document.location.replace("#/login");
      }
      return data
    })
    .catch(err => {
      // console.log(err);
      message.error('网络错误')
    });
}

export function post(url, params) {
  return request(url, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryString.stringify(params)
  })
}

export function coursetablePost(url, params) {
  return request(url, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      // 'Content-Type':'application/json',
    },
    body: params
  })
}

export function avatar(url, params) {
  let formData = new FormData()
  for (let key in params) {
    formData.append(key, params[key])
  }

  return request(url, {
    credentials: 'same-origin',
    method: 'post',
    body: formData
  })
}

export function get(url, params) {
  return request(url + '?' + queryString.stringify(params), { credentials: 'same-origin' });
}

export function CORSrequest(url, options) {
  return fetch(url, options)
    .then(parseJSON)
    .then(data => {
      if (!data.success) {
        // console.log(data.msg.text);
      }
      return data
    })
    .catch(err => {
      // console.log(err);
      message.error('网络错误')
    });
}

export function JSONpost(url, params) {
  return CORSrequest(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
}


export function download(url, params) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url + '?' + queryString.stringify(params), true);
  oReq.responseType = "blob";
  oReq.onload = function (oEvent) {
    var content = oReq.response;

    var elink = document.createElement('a');
    elink.download = 'info.xlsx';
    elink.style.display = 'none';

    var blob = new Blob([content]);
    elink.href = URL.createObjectURL(blob);

    document.body.appendChild(elink);
    elink.click();

    document.body.removeChild(elink);
  };
  oReq.send();
}
/**
 * 
 * @param {路由} url 
 * @param {参数} params
 * 向后端传输formData数据格式的数据 
 */
export function postFormData(url, params) {
  return request(url, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: params
  })
}

export function coursetableGet(url, params) {
  return request(url, {
    credentials: 'same-origin',
    method: 'get',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: params
  })
}