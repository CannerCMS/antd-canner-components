/** @jsx builder */
import builder from 'canner-script';

module.exports = function({attributes}) {
  return (
    <object {...attributes}>
      <string keyName="html" />
    </object>
  );
}