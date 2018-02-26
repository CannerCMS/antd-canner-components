// setup file
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Gallery from '../src';
import {shallow, configure} from 'enzyme';
import immutable from 'immutable';
import {Section} from 'grid-draggable';

configure({ adapter: new Adapter() });

test('[array/gallery] render two draggable section', () => {
  const wrapper = shallow(
    <Gallery
      id="gallery"
      value={immutable.fromJS([{
        image: "./test.png",
        title: "image1"
      }, {
        image: "./test2.png",
        title: "image2"
      }])}/>
  );

  expect(wrapper.find(Section)).toHaveLength(2);
});