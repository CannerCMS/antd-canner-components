import {paginate, filterWith, sortWith} from '../src/utils';

function createArray(length, createObject) {
  const data = [];

  for(var i = 0; i < length; i++) {
    data.push(createObject(i));
  }
  return data;
}

describe('paginate', () => {
  it('should get second page', () => {
    const value = createArray(30, i => ({id: i}));
    const result = paginate(value, 2, 10);
    expect(result.length).toBe(10);
    expect(result[0].id).toBe(10);
    expect(result[9].id).toBe(19);
  });
})

describe('filterWith', () => {
  it('should get answer equal true', () => {
    const value = createArray(30, i => ({id: i, answer: i % 3 === 0}));
    const result = filterWith(value, {answer: {eq: true}});
    expect(result).toEqual(value.filter(v => v.answer));
  });
})

describe('sortWith', () => {
  it('should change order', () => {
    const value = createArray(30, i => ({id: i, number: Math.random()}));
    const result = sortWith(value, 'number', 'ASC');
    const asc = result.reduce((result, current, currentIndex, source) => {
      if (currentIndex === 0) {
        return result;
      }
      return result && source[currentIndex - 1].number < current.number
    }, true);
    expect(asc).toBe(true);
  });
})