import FirebaseService from "./FirebaseService";
import ImgurService from "./ImgurService";
import CannerService from "./CannerService";

export default function(config) {
  const { service } = config;
  switch (service) {
    case "firebase":
      return new FirebaseService(config);
    case "imgur":
      return new ImgurService(config);
    case "canner":
    default:
      return new CannerService(config);
  }
}
