import ImageService from "./imageService";

export default class ImgurService extends ImageService {
  getServiceConfig() {
    if (process.env.NODE_ENV === "production") {
      return {
        name: "image",
        accept: "image/*",
        action: "https://imgur-apiv3.p.mashape.com/3/image",
        headers: {
          "X-Mashape-Key": "bF1fkS9EKrmshtCbRspDUxPL5yhCp1rzz8ejsnqLqwI2KQC3s9",
          Authorization: "Client-ID cd7b1ab0aa39732",
          "X-Requested-With": null
        }
      };
    }

    return {
      name: "image",
      accept: "image/*",
      action: "https://api.imgur.com/3/image",
      headers: {
        Authorization: "Client-ID a214c4836559c77",
        "X-Requested-With": null
      }
    };
  }
}
