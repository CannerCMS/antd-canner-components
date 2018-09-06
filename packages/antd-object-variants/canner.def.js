/** @jsx c */

import c from 'canner-script';

// eslint-disable-next-line
export default ({attributes, children}) => (
  <object {...attributes}>
    <array keyName="options">
      <string keyName="name" />
      <array keyName="values" ui="tag" />
    </array>
    <array keyName="variants"
      uiParams={{
        createKeys: [],
        disableDelete: true,
        columns: (attributes.uiParams || {}).columns || []
      }}
    >
      <string keyName="options" title="Variant Name" disabled />
      {children}
    </array>
  </object>
)