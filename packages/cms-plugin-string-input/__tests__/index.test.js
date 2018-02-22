import React from 'react';
import Input from '../src';
import renderer from 'react-test-renderer';

test('[input] render success with value', () => {
  const component = renderer.create(
    <Input value="this is a test"/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});