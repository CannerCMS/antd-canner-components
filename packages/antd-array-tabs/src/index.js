// // @flow
import React, { useState } from "react";
// import { DragDropContextProvider, DragSource, DropTarget } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { Button, Icon, Modal, Tabs } from "antd";
// import {injectIntl} from 'react-intl';
// import {Item, ConfirmButton, ResetButton} from 'canner-helpers';

// // types
// import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
// import type {
//   FieldItems,
//   DeployFn
// } from 'types/DefaultProps';
// import {intlShape} from 'react-intl';

// const {confirm} = Modal;
// const TabPane = Tabs.TabPane;
console.log('outside')

export default () => {
  console.log('hihi')
  return (<div/>)
}

// // Drag & Drop node
// class TabNode extends React.Component {
//   render() {
// 		const {
// 			connectDragSource,
//       connectDropTarget,
//       children,
// 		} = this.props

// 		return connectDragSource(
// 			connectDropTarget(children),
//     );
// 	}
// }

// const cardTarget = {
//   drop(props, monitor) {
//     const dragKey = monitor.getItem().index;
//     const hoverKey = props.index;

//     if (dragKey === hoverKey) {
//       return;
//     }

//     props.moveTabNode(dragKey, hoverKey);
//     monitor.getItem().index = hoverKey;
//   },
// };

// const cardSource = {
// 	beginDrag(props) {
// 		return {
// 			id: props.id,
// 			index: props.index,
// 		}
// 	},
// };

// const WrapTabNode = DropTarget(
// 	'DND_NODE',
// 	cardTarget,
// 	(connect) => ({
// 		connectDropTarget: connect.dropTarget(),
// 	}),
// )(
// 	DragSource(
// 		'DND_NODE',
// 		cardSource,
// 		(connect, monitor) => ({
// 			connectDragSource: connect.dragSource(),
// 			isDragging: monitor.isDragging(),
// 		}),
// 	)(TabNode),
// );

// type Props = ArrayDefaultProps<FieldItems> & {
//   uiParams: {
//     titleKey?: string,
//     titlePrefix?: string,
//     position?: "top" | "left" | "right" | "bottom"
//   },
//   deploy: DeployFn,
//   intl: intlShape
// };

// const TabUi = (props: Props) => {
//   const [activeKey, setActiveKey] = useState('0');
//   const {uiParams = {}, value = [], intl, onChange, deploy, refId} = props;
//   const position = uiParams.position || "top";
//   const panelFields = [];

//   const handleTabChange = (key: string) => {
//     setActiveKey(key);
//   }

//   const handleCreate = () => {
//     const size = value.length;
//     onChange(refId, 'create');
//     setActiveKey(`${size}`);
//   };

//   const handleDelete = (index: number) => {
//     confirm({
//       title: intl.formatMessage({ id: "array.tab.delete.confirm" }),
//       onOk() {
//         onChange(refId.child(index), "delete")
//           .then(() => {
//             if (deploy) {
//               return deploy(refId);
//             }

//             return Promise.resolve();
//           })
//           .then(() => {
//             setActiveKey(`${value.length - 2}`);
//           });
//       }
//     })
//   };

//   class DraggableTabs extends React.Component {
//     state = {
//       order: [],
//     };
  
//     moveTabNode = (dragKey, hoverKey) => {
//       const newOrder = this.state.order.slice();
//       const { children } = this.props;
  
//       React.Children.forEach(children, (c) => {
//         if (newOrder.indexOf(c.key) === -1) {
//           newOrder.push(c.key);
//         }
//       });
  
//       const dragIndex = newOrder.indexOf(dragKey);
//       const hoverIndex = newOrder.indexOf(hoverKey);
  
//       newOrder.splice(dragIndex, 1);
//       newOrder.splice(hoverIndex, 0, dragKey);
  
//       this.setState({
//         order: newOrder,
//       });
//     };
  
//     renderTabBar = (props, DefaultTabBar) => (
//     <DefaultTabBar
//       extraContent={<Button style={{margin: '6px'}}onClick={handleCreate}>+ Add</Button>}
//       {...props}>
//         {node => (
//           <WrapTabNode key={node.key} index={node.key} moveTabNode={this.moveTabNode}>{node}</WrapTabNode>
//         )}
//       </DefaultTabBar>
//     );
  
//     render() {
//       const { order } = this.state;
//       const { children } = this.props;
  
//       const tabs = [];
//       React.Children.forEach(children, (c) => {
//         tabs.push(c);
//       });
  
//       const orderTabs = tabs.slice().sort((a, b) => {
//         const orderA = order.indexOf(a.key);
//         const orderB = order.indexOf(b.key);
  
//         if (orderA !== -1 && orderB !== -1) {
//           return orderA - orderB;
//         }
//         if (orderA !== -1) {
//           return -1;
//         }
//         if (orderB !== -1) {
//           return 1;
//         }
  
//         const ia = tabs.indexOf(a);
//         const ib = tabs.indexOf(b);
  
//         return ia - ib;
//       });
  
//       return (
//         <DragDropContextProvider backend={HTML5Backend}>
//           <Tabs
//             renderTabBar={this.renderTabBar}
//             {...this.props}
//           >
//             {orderTabs}
//           </Tabs>
//         </DragDropContextProvider>
//       );
//     }
//   }

//   // set array content
//   value.forEach((item, i) => {
//     const thisId = refId.child(i);

//     // generate panel title
//     let title;
//     const defaultTitle = `${intl.formatMessage({
//       id: "array.tab.item"
//     })} ${i + 1}`;

//     if (uiParams.titleKey) {
//       title = item[uiParams.titleKey] || defaultTitle;
//     } else if (uiParams.titlePrefix) {
//       title = `${uiParams.titlePrefix}${i + 1}` || defaultTitle;
//     } else {
//       title = defaultTitle;
//     }

//     const deleteBtn = (index: number) => (
//       <Icon type="close-circle" onClick={() => handleDelete(index)} />
//     );

//     if (position === 'right' && activeKey === `${i}`) {
//       title = [title, ' ', deleteBtn(i)];
//     } else if (activeKey === `${i}`) {
//       title = [deleteBtn(i), ' ', title];
//     }

//     panelFields.push(
//       <TabPane
//         tab={title}
//         id={thisId}
//         key={`${i}`}
//         style={{
//           overflow: 'hidden',
//           padding: '0 10px'
//         }}
//       >
//         <Item
//           refId={thisId}
//         />
//         {
//           thisId.getPathArr().length === 2 && (
//             <div>
//               <ConfirmButton refId={thisId} />
//               <ResetButton refId={thisId} />
//             </div>
//           )
//         }
//       </TabPane>
//     );
//   });

//   return (
//     <div style={{width: '100%'}}>
//       <DraggableTabs onChange={handleTabChange}>
//         {panelFields}
//       </DraggableTabs>
//     </div>
//   );



// }

// export default injectIntl()(TabUi);
