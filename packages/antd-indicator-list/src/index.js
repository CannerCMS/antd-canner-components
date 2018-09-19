// @flow
import * as React from 'react';
import { List } from 'antd';

// type
import type {IndicatorDefaultProps} from 'types/IndicatorDefaultProps';

type Props = IndicatorDefaultProps & {
  uiParams: {
    avatar: (value: any) => React.Node,
    title: (value: any) => React.Node,
    description: (value:any) => React.Node,
    content: (value: any) => React.Node
  }
};

const getRandomKey = () => (Math.random().toString(36).substr(2, 10));

const IndicatorList = ({ value, style, uiParams: {
  avatar,
  title,
  description,
  content
} }: Props) => {
  return (
    <List
      style={{overflow: 'scroll', maxHeight: 600, ...style}}
      dataSource={value}
      renderItem={item => (
        <List.Item key={item.id || getRandomKey()}>
          <List.Item.Meta
            avatar={avatar(item)}
            title={title(item)}
            description={description(item)}
          />
          { content(item) }
        </List.Item>
      )}
    >
  </List>
  );
}

export default IndicatorList;
