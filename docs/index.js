import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Menu, Layout} from 'antd';

// string
import InputDemo from './demos/string/input';
import LinkDemo from './demos/string/link';
import RadioDemo from './demos/string/radio';
import DatetimeDemo from './demos/string/datetime';

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
            <SubMenu key="string" title="String">
              <Menu.Item key="input">input</Menu.Item>
              <Menu.Item key="link">link</Menu.Item>
              <Menu.Item key="radio">radio</Menu.Item>
              <Menu.Item key="datetime">datetime</Menu.Item>
            </SubMenu>
            <SubMenu key="array" title="Array">
              <Menu.Item key="tab-top">tab-top</Menu.Item>
              <Menu.Item key="tab-bottom">tab-bottom</Menu.Item>
              <Menu.Item key="tab-left">tab-left</Menu.Item>
              <Menu.Item key="tab-right">tab-right</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {/* string */}
            {selectTab === 'string' && selectKey === 'input' ? <InputDemo/> : null}
            {selectTab === 'string' && selectKey === 'link' ? <LinkDemo/> : null}
            {selectTab === 'string' && selectKey === 'radio' ? <RadioDemo/> : null}
            {selectTab === 'string' && selectKey === 'datetime' ? <DatetimeDemo/> : null}

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
