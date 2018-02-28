import React from 'react';
import Radio from '../src';
import renderer from 'react-test-renderer';

test('[string/radio] render success with value', () => {
  const component = renderer.create(
    <Radio
      id="radio"
      value="1"
      uiParams={{
        options: [{
          text: 'option 1',
          value: "1"
        }, {
          text: 'option 2',
          value: "2"
        }],
        defaultSelected: 1
      }}
      onChange={arg => arg}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});