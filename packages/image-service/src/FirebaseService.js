import firebase from "firebase";
import ImageService from "./imageService";

export default class FirebaseService extends ImageService {
  getServiceConfig() {
    return {
      customRequest: function(obj) {
        // 在這裡不處理 firebase 的登入，
        // 登入應該要在 canner-web 的 qaformContainer 完成
        // 如果沒有登入 無法上傳
        const { file, onProgress, onSuccess, onError } = obj;
        const images = firebase
          .storage()
          .ref(this.dir)
          .child(this.filename || file.name);
        const uploadTask = images.put(file);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            const percent =
              snapshot.bytesTransferred / snapshot.totalBytes * 100;
            onProgress({ percent });
          },
          function() {
            onError();
          },
          function() {
            onSuccess({ data: { link: uploadTask.snapshot.downloadURL } });
          }
        );
      }
    };
  }
}
