import React, {useState} from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";

export default (props) => {
  const {value, onChange, refId} = props;
  const [mdValue, setMdValue] = useState(value);

  const handleChange = (value) => {
    onChange(refId, "update", value);
    return setMdValue(value);
  }

  return (
    <SimpleMDE
      value={mdValue}
      onChange={handleChange}
      options={{spellChecker: false}}
    />
  );
}