// @flow
import moment from 'moment';

export function transformMomentToString(date, input = 'ISO_8601') {
  switch (input) {
    case 'timestamp.seconds':
    case 'epoch':
      return String(date.unix());
    case 'timestamp.milliseconds':
      return  String(date.valueOf());
    case 'ISO_8601':
      return date.toISOString();
    default:
      return date.format(input);
  }
}

export function transformStringToMoment(dateString, input = moment.ISO_8601) {
  let rtnMoment = moment();
  switch (input) {
    case 'timestamp.seconds':
    case 'epoch':
      if (dateString) {
        rtnMoment = moment.unix(Number(dateString));
      }
      break;
    case 'timestamp.milliseconds':
      if (dateString) {
        rtnMoment = moment(Number(dateString));
      }
      break;
    default:
     rtnMoment = moment(dateString, input);
     break;
  }
  if (rtnMoment.isValid())
    return rtnMoment;
  return moment();
}