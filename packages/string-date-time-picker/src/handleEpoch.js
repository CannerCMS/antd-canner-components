import moment from "moment";

export default function(uiParams, cannerJSON) {
  if (
    uiParams &&
    uiParams.input === "epoch" &&
    typeof cannerJSON === "number"
  ) {
    return moment.unix(cannerJSON);
  }
  return cannerJSON;
}
