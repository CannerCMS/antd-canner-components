import orderBy from 'lodash/orderBy';

export function paginate(value: Array<Object>, currentPage: number, pageSize: number = 10) {
  const index = (currentPage - 1) * pageSize;
  return value.slice(index, index + pageSize);
}

export function filterWith(value: Array<Object>, where: Object) {
  return value.filter(v => {
    return Object.keys(where || {}).reduce((result: boolean, key: string) => {
      const condition = where[key];
      const data = v[key];
      return result && passCondition(data , condition);
    }, true);
  });
}

export function sortWith(value: Array<Object>, sortField: string, sortType: 'ASC' | 'DESC' = 'ASC') {
  return orderBy(value, sortField, sortType);
}

export function passCondition(data: any, condition: Object) {
  return Object.keys(condition).reduce((result, conditionKey) => {
    let isPass = true;
    const conditionValue = condition[conditionKey];
    switch(conditionKey) {
      case 'contains': {
        if (typeof data === 'string') {
          isPass = data && data.toLowerCase().indexOf(conditionValue.toLowerCase()) !== -1;
        } else if (Array.isArray(data) && data.length) {
          const lowerCaseData = data.map(d => d.toLowerCase());
          isPass = lowerCaseData.indexOf(conditionValue.toLowerCase()) !== -1;
        }
        break;
      }
      case 'eq':
        isPass = data === conditionValue;
        break;
      case 'gt':
        isPass = data > conditionValue;
        break;
      case 'gte':
        isPass = data >= conditionValue;
        break;
      case 'lt':
        isPass = data < conditionValue;
        break;
      case 'lte':
        isPass = data <= conditionValue;
        break;
      default:
        isPass = passCondition(data[conditionKey], conditionValue);
        break;
    }
    return result && isPass;
  }, true);
}
