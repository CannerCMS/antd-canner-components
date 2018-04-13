import React from 'react';
import Input from '../src';
import renderer from 'react-test-renderer';

test('[array/breadcrumb] render success with value', () => {
  const component = renderer.create(
    <Input value="this is a test"/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});