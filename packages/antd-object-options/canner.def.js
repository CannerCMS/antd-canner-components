/** @jsx c */

import c from 'canner-script';

// eslint-disable-next-line
export default ({attributes, children}) => (
  <object {...attributes}>
    <string keyName="key" />
    {children}
  </object>
)