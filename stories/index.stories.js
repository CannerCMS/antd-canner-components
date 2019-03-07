import React from 'react';

import { storiesOf } from '@storybook/react';

import { Context } from "canner-helpers";
import contextValue from "./context";

// share
import ShareCardDemo from './demos/share/card';
import ShareRelationDemo from './demos/share/relation';

// boolean
import BooleanCardDemo from './demos/boolean/card';
import BooleanSwitchDemo from './demos/boolean/switch';

// number
import NumberInputDemo from './demos/number/input';
import NumberSliderDemo from './demos/number/slider';
import NumberRateDemo from './demos/number/rate';

// string
import InputDemo from './demos/string/input';
import MdeDemo from './demos/string/mde';
import LinkDemo from './demos/string/link';
import RadioDemo from './demos/string/radio';
import DatetimeDemo from './demos/string/datetime';
import TimepickerDemo from './demos/string/timepicker';
import TextareaDemo from './demos/string/textarea';
import SelectDemo from './demos/string/select';
import StringCardDemo from './demos/string/card';

// array
// import TabTopDemo from './demos/array/tabs-top';
// import TabBottomDemo from './demos/array/tabs-bottom';
// import TabLeftDemo from './demos/array/tabs-left';
// import TabRightDemo from './demos/array/tabs-right';
import TagsDemo from './demos/array/tags';
import GalleryDemo from './demos/array/gallery';
import SliderDemo from './demos/array/slider';
import PanelDemo from './demos/array/panel';
import TableDemo from './demos/array/table';
import TableRouteDemo from './demos/array/table-route/basic';
import TableRouteWithToolbarDemo from './demos/array/table-route/with-toolbar';
import TreeDemo from './demos/array/tree';

// object
import OptionsDemo from './demos/object/options';
import MapDemo from './demos/object/map';
import VariantsDemo from './demos/object/variants';
import ImageDemo from './demos/object/image';
import EditorDemo from './demos/object/editor';
import SlateDemo from './demos/object/slate_editor';

// relation
import SingleSelectDemo from './demos/relation/single-select';
import MultipleSelectDemo from './demos/relation/multiple-select';
import SingleSelectTreeDemo from './demos/relation/single-select-tree';
import MultipleSelectTreeDemo from './demos/relation/multiple-select-tree';

// indicator
import IndicatorAmountDemo from './demos/indicator/amount';
import IndicatorListDemo from './demos/indicator/list';
import "antd/dist/antd.css";

const CannerHelperContext = storyFn => (
  <Context.Provider value={contextValue()}>
    <div style={{padding: "20px"}}>
      {storyFn()}
    </div>
  </Context.Provider>
);

storiesOf('String Component', module)
  .addDecorator(CannerHelperContext)
  .add('Input', () => <InputDemo/>)
  .add('Link', () => <LinkDemo/>)
  .add('Radio', () => <RadioDemo/>)
  .add('DateTime', () => <DatetimeDemo/>)
  .add('TimePicker', () => <TimepickerDemo/>)
  .add('Textarea', () => <TextareaDemo/>)
  .add('Select', () => <SelectDemo/>)
  .add('String Card', () => <StringCardDemo/>)
  .add('Md Editor', () => <MdeDemo/>)


storiesOf('Array Component', module)
  .addDecorator(CannerHelperContext)
  .add('Tags', () => <TagsDemo/>)
  .add('Gallery', () => <GalleryDemo/>)
  .add('Slider', () => <SliderDemo/>)
  .add('Panel', () => <PanelDemo/>)
  .add('Table', () => <TableDemo/>)
  .add('Tree', () => <TreeDemo/>)

storiesOf('Array Component/Tab', module)
  .addDecorator(CannerHelperContext)
  // .add('Tab Top', () => <TabTopDemo/>)
  // .add('Tab Bottom', () => <TabBottomDemo/>)
  // .add('Tab Left', () => <TabLeftDemo/>)
  // .add('Tab Right', () => <TabRightDemo/>)

storiesOf('Array Component/Table Route', module)
  .addDecorator(CannerHelperContext)
  .add('Basic', () => <TableRouteDemo/>)
  .add('With Toolbar', () => <TableRouteWithToolbarDemo/>)
  
storiesOf('Object Component', module)
  .addDecorator(CannerHelperContext)
  .add('Options', () => <OptionsDemo/>)
  .add('Map', () => <MapDemo/>)
  .add('Variants', () => <VariantsDemo/>)
  .add('Image', () => <ImageDemo/>)
  .add('Editor', () => <EditorDemo/>)
  .add('Slate', () => <SlateDemo/>)

storiesOf('Number Component', module)
  .addDecorator(CannerHelperContext)
  .add('Input', () => <NumberInputDemo/>)
  .add('Slider', () => <NumberSliderDemo/>)
  .add('Rate', () => <NumberRateDemo/>)

storiesOf('Boolean Component', module)
  .addDecorator(CannerHelperContext)
  .add('Card', () => <BooleanCardDemo/>)
  .add('Switch', () => <BooleanSwitchDemo/>)

storiesOf('Indicator Component', module)
  .addDecorator(CannerHelperContext)
  .add('Amount', () => <IndicatorAmountDemo/>)
  .add('List', () => <IndicatorListDemo/>)

storiesOf('Relation Component', module)
  .addDecorator(CannerHelperContext)
  .add('Single', () => <SingleSelectDemo/>)
  .add('Multiple', () => <MultipleSelectDemo/>)
  .add('Single Tree', () => <SingleSelectTreeDemo/>)
  .add('Multiple Tree', () => <MultipleSelectTreeDemo/>)

storiesOf('Share Component', module)
  .addDecorator(CannerHelperContext)
  .add('Card', () => <ShareCardDemo/>)
  .add('Relation', () => <ShareRelationDemo/>)