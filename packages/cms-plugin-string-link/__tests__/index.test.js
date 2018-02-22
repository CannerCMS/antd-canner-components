import React from 'react';
import Link from '../src';
import renderer from 'react-test-renderer';
import {IntlProvider} from 'react-intl';

test('link render success with value', () => {
  const component = renderer.create(
    <IntlProvider locale="en">
      <Link value="this is a test link"/>
    </IntlProvider>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});