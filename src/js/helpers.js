import { TIMEOUT_SEC } from './config.js';

export const apiCall = async function (dataObj, isSend = false) {
  try {
    const fetchPromise = getFetchPromise(dataObj, isSend);
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getFetchPromise = function (data, isSend = false) {
  if (!isSend) return fetch(data.url);
  return fetch(data.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data.uploadData),
  });
};
