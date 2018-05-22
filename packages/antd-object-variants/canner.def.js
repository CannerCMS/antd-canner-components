/** @jsx c */

import c from 'canner-script';

// eslint-disable-next-line
export default ({attributes, children}) => (
  <object {...attributes}>
    <array keyName="options">
      <string keyName="name" />
      <array keyName="values" ui="tag" />
    </array>
    <array keyName="variants">
      <string keyName="options" />
      {children}
    </array>
  </object>
)