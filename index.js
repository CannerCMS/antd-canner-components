import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Menu, Layout} from 'antd';
import contextValue from './context';
import {Context} from '@canner/react-cms-helpers';
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
import LinkDemo from './demos/string/link';
import RadioDemo from './demos/string/radio';
import DatetimeDemo from './demos/string/datetime';
import TimepickerDemo from './demos/string/timepicker';
import TextareaDemo from './demos/string/textarea';
import SelectDemo from './demos/string/select';
import ImageDemo from './demos/string/image';
import StringCardDemo from './demos/string/card';
import EditorDemo from './demos/string/editor';

// array
import TabTopDemo from './demos/array/tabs-top';
import TabBottomDemo from './demos/array/tabs-bottom';
import TabLeftDemo from './demos/array/tabs-left';
import TabRightDemo from './demos/array/tabs-right';
import TagsDemo from './demos/array/tags';
import GalleryDemo from './demos/array/gallery';
import SliderDemo from './demos/array/slider';
import PanelDemo from './demos/array/panel';
import TableDemo from './demos/array/table';
import TableRouteDemo from './demos/array/table-route';

// object
import OptionsDemo from './demos/object/options';
import MapDemo from './demos/object/map';
import VariantsDemo from './demos/object/variants';

// relation
import SingleSelectDemo from './demos/relation/single-select';
import MultipleSelectDemo from './demos/relation/multiple-select';

const {SubMenu} = Menu;
const {Content, Sider} = Layout;

class Demo extends Component {
  constructor() {
    super();

    this.switchDemo = this.switchDemo.bind(this);
    this.state = {
      selectKey: 'tab-top',
      selectTab: 'array'
    };
  }

  switchDemo(item) {
    this.setState({
      selectKey: item.keyPath[0],
      selectTab: item.keyPath[1]
    })
  }

  render() {
    const {selectKey, selectTab} = this.state;

    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[selectKey]}
            defaultOpenKeys={[selectTab]}
            onClick={this.switchDemo}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="share" title="Share">
              <Menu.Item key="card">card</Menu.Item>
              <Menu.Item key="relation">relation</Menu.Item>
            </SubMenu>
            <SubMenu key="string" title="String">
              <Menu.Item key="input">input</Menu.Item>
              <Menu.Item key="link">link</Menu.Item>
              <Menu.Item key="radio">radio</Menu.Item>
              <Menu.Item key="datetime">datetime</Menu.Item>
              <Menu.Item key="timepicker">timepicker</Menu.Item>
              <Menu.Item key="textarea">textarea</Menu.Item>
              <Menu.Item key="select">select</Menu.Item>
              <Menu.Item key="image">image</Menu.Item>
              <Menu.Item key="card">card</Menu.Item>
              <Menu.Item key="editor">editor</Menu.Item>
            </SubMenu>
            <SubMenu key="array" title="Array">
              <Menu.Item key="tab-top">tab-top</Menu.Item>
              <Menu.Item key="tab-bottom">tab-bottom</Menu.Item>
              <Menu.Item key="tab-left">tab-left</Menu.Item>
              <Menu.Item key="tab-right">tab-right</Menu.Item>
              <Menu.Item key="tags">tags</Menu.Item>
              <Menu.Item key="gallery">gallery</Menu.Item>
              <Menu.Item key="slider">slider</Menu.Item>
              <Menu.Item key="panel">panel</Menu.Item>
              <Menu.Item key="table">table</Menu.Item>
              <Menu.Item key="table-route">table-route</Menu.Item>
            </SubMenu>
            <SubMenu key="number" title="Number">
              <Menu.Item key="input">input</Menu.Item>
              <Menu.Item key="slider">slider</Menu.Item>
              <Menu.Item key="rate">rate</Menu.Item>
            </SubMenu>
            <SubMenu key="boolean" title="Boolean">
              <Menu.Item key="card">card</Menu.Item>
              <Menu.Item key="switch">switch</Menu.Item>
            </SubMenu>
            <SubMenu key="object" title="Object">
              <Menu.Item key="options">options</Menu.Item>
              <Menu.Item key="map">map</Menu.Item>
              <Menu.Item key="variants">variants</Menu.Item>
            </SubMenu>
            <SubMenu key="relation" title="Relation">
              <Menu.Item key="single-select">single-select</Menu.Item>
              <Menu.Item key="multiple-select">multiple-select</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Context.Provider value={contextValue()}>
            {/* share */}
            {selectTab === 'share' && selectKey === 'card' ? <ShareCardDemo/> : null}
            {selectTab === 'share' && selectKey === 'relation' ? <ShareRelationDemo /> : null}

            {/* boolean */}
            {selectTab === 'boolean' && selectKey === 'card' ? <BooleanCardDemo/> : null}
            {selectTab === 'boolean' && selectKey === 'switch' ? <BooleanSwitchDemo/> : null}

            {/* number */}
            {selectTab === 'number' && selectKey === 'input' ? <NumberInputDemo/> : null}
            {selectTab === 'number' && selectKey === 'slider' ? <NumberSliderDemo/> : null}
            {selectTab === 'number' && selectKey === 'rate' ? <NumberRateDemo/> : null}

            {/* string */}
            {selectTab === 'string' && selectKey === 'input' ? <InputDemo/> : null}
            {selectTab === 'string' && selectKey === 'link' ? <LinkDemo/> : null}
            {selectTab === 'string' && selectKey === 'radio' ? <RadioDemo/> : null}
            {selectTab === 'string' && selectKey === 'datetime' ? <DatetimeDemo/> : null}
            {selectTab === 'string' && selectKey === 'timepicker' ? <TimepickerDemo/> : null}
            {selectTab === 'string' && selectKey === 'textarea' ? <TextareaDemo/> : null}
            {selectTab === 'string' && selectKey === 'select' ? <SelectDemo/> : null}
            {selectTab === 'string' && selectKey === 'image' ? <ImageDemo/> : null}
            {selectTab === 'string' && selectKey === 'card' ? <StringCardDemo/> : null}
            {selectTab === 'string' && selectKey === 'editor' ? <EditorDemo/> : null}

            {/* array */}
            {selectTab === 'array' && selectKey === 'tab-top' ? <TabTopDemo/> : null}
            {selectTab === 'array' && selectKey === 'tab-left' ? <TabLeftDemo/> : null}
            {selectTab === 'array' && selectKey === 'tab-right' ? <TabRightDemo/> : null}
            {selectTab === 'array' && selectKey === 'tab-bottom' ? <TabBottomDemo/> : null}
            {selectTab === 'array' && selectKey === 'tags' ? <TagsDemo/> : null}
            {selectTab === 'array' && selectKey === 'gallery' ? <GalleryDemo/> : null}
            {selectTab === 'array' && selectKey === 'slider' ? <SliderDemo/> : null}
            {selectTab === 'array' && selectKey === 'panel' ? <PanelDemo/> : null}
            {selectTab === 'array' && selectKey === 'table' ? <TableDemo/> : null}
            {selectTab === 'array' && selectKey === 'table-route' ? <TableRouteDemo/> : null}

            {/* object */}
            {selectTab === 'object' && selectKey === 'options' ? <OptionsDemo/> : null}
            {selectTab === 'object' && selectKey === 'map' ? <MapDemo/> : null}
            {selectTab === 'object' && selectKey === 'variants' ? <VariantsDemo/> : null}

            {/* relation */}
            {selectTab === 'relation' && selectKey === 'single-select' ? <SingleSelectDemo/> : null}
            {selectTab === 'relation' && selectKey === 'multiple-select' ? <MultipleSelectDemo/> : null}
            
            </Context.Provider>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(
  <Demo/>,
  document.getElementById("root")
);
