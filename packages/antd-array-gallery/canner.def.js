/** @jsx c */

import c from 'canner-script';

export default ({attributes, children}) => {
  return (
    <array {...attributes}>
      <image keyName={(attributes.uiParams || {}).imageKey || "image"}/>
      {children}
    </array>
  )
}