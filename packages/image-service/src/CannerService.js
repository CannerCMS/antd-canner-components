import ImageService from "./imageService";
import "whatwg-fetch";
import Promise from "promise-polyfill";
import config from "@canner/canner-config";

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

export default class CannerService extends ImageService {
  getServiceConfig() {
    return {
      customRequest: function(obj) {
        const { file, onProgress, onSuccess, onError } = obj;
        const url = getUploadUrl();
        getToken()
          .then(token => {
            return readImage(file).then(dimension => {
              if (dimension.width > 6000 || dimension.height > 6000) {
                throw new Error();
              }
              return { dimension, token };
            });
          })
          .then(obj => {
            const { dimension, token } = obj;
            const formData = new FormData();
            formData.append("files", file);
            const xhr = new XMLHttpRequest();
            xhr.addEventListener(
              "progress",
              function(e) {
                const done = e.position || e.loaded;
                const total = e.totalSize || e.total;
                const percent = done / total * 100;
                onProgress({ percent });
              },
              false
            );
            xhr.onreadystatechange = function() {
              if (this.readyState === 4) {
                if (xhr.status === 200) {
                  const json = JSON.parse(xhr.responseText);
                  onSuccess({
                    data: { link: getImgUrl(json.uploaded[0].id, dimension) }
                  });
                } else {
                  onError();
                }
              }
            };
            xhr.open("post", url, true);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
            xhr.send(formData);
          })
          .catch(() => {
            onError();
          });
      }
    };
  }
}

function readImage(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();

    fr.onload = function() {
      // file is loaded
      const img = new Image();
      img.onload = function() {
        res({
          width: img.width,
          height: img.height
        });
      };
      img.src = fr.result;
    };
    fr.onerror = function(e) {
      rej(e);
    };
    fr.readAsDataURL(file);
  });
}

function getToken() {
  const url = getTokenUrl();
  if (process.env.NODE_ENV === "development") {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjU5MTk4OTY3YjVhZmRjNGRiMjE0MWFkYyIsImlhdCI6MTQ5NzYwNjM5OX0.G1QCA_MC4DIGx4LR3DJos7e_mUCawFZNgpma9Z25CQU";
    return Promise.resolve(token);
  }
  return fetch(url, {
    credentials: "include"
  })
    .then(res => res.json())
    .then(json => json.token);
}

function getUploadUrl() {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://image.canner.io/upload";
    case "development":
    default:
      return "https://local.host:9999/upload";
  }
}

function getImgUrl(id, dimension) {
  let postfix = "";
  if (dimension.width > 1200) {
    postfix = "/-/resize/1200x";
  } else if (dimension.height > 1200) {
    postfix = "/-/resize/x1200";
  }
  switch (process.env.NODE_ENV) {
    case "production":
      return `https://image.canner.io/img/${id}${postfix}`;
    case "development":
    default:
      return `https://local.host:9999/img/${id}${postfix}`;
  }
}

function getTokenUrl() {
  switch (process.env.NODE_ENV) {
    case "production":
      return `https://www.canner.io/apps/${config.appUrl}/image/token`;
    case "development":
    default:
      return `https://local.host:4433/apps/${config.appUrl}/image/token`;
  }
}
