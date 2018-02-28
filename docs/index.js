import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Menu, Layout} from 'antd';

// share
import ShareCardDemo from './demos/share/card';

// boolean
import BooleanCardDemo from './demos/boolean/card';
import BooleanSwitchDemo from './demos/boolean/switch';

// number
import NumberInputDemo from './demos/number/input';
import NumberTextInputDemo from './demos/number/textInput';

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

// array
import TabTopDemo from './demos/array/tabs-top';
import TabBottomDemo from './demos/array/tabs-bottom';
import TabLeftDemo from './demos/array/tabs-left';
import TabRightDemo from './demos/array/tabs-right';

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
            </SubMenu>
            <SubMenu key="array" title="Array">
              <Menu.Item key="tab-top">tab-top</Menu.Item>
              <Menu.Item key="tab-bottom">tab-bottom</Menu.Item>
              <Menu.Item key="tab-left">tab-left</Menu.Item>
              <Menu.Item key="tab-right">tab-right</Menu.Item>
            </SubMenu>
            <SubMenu key="number" title="Number">
              <Menu.Item key="input">input</Menu.Item>
              <Menu.Item key="textInput">text-input</Menu.Item>
            </SubMenu>
            <SubMenu key="boolean" title="Boolean">
              <Menu.Item key="card">card</Menu.Item>
              <Menu.Item key="switch">switch</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {/* share */}
            {selectTab === 'share' && selectKey === 'card' ? <ShareCardDemo/> : null}

            {/* boolean */}
            {selectTab === 'boolean' && selectKey === 'card' ? <BooleanCardDemo/> : null}
            {selectTab === 'boolean' && selectKey === 'switch' ? <BooleanSwitchDemo/> : null}

            {/* number */}
            {selectTab === 'number' && selectKey === 'input' ? <NumberInputDemo/> : null}
            {selectTab === 'number' && selectKey === 'textInput' ? <NumberTextInputDemo/> : null}

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

            {/* array */}
            {selectTab === 'array' && selectKey === 'tab-top' ? <TabTopDemo/> : null}
            {selectTab === 'array' && selectKey === 'tab-left' ? <TabLeftDemo/> : null}
            {selectTab === 'array' && selectKey === 'tab-right' ? <TabRightDemo/> : null}
            {selectTab === 'array' && selectKey === 'tab-bottom' ? <TabBottomDemo/> : null}
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
