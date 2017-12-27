export default function sorterFunc(columns) {
  return columns.map(col => {
    col.sorter = genSorter(col);
    return col;
  });
}

function genSorter(col) {
  const { sorter, dataIndex } = col;
  const { type } = sorter;
  switch (type) {
    case "$value":
      return (a, b) => a[dataIndex] - b[dataIndex];
    case "$length":
      return (a, b) => a[dataIndex].length - b[dataIndex].length;
    default:
      return undefined;
  }
}
