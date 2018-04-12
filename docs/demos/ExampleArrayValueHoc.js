// @flow
import * as React from 'react';
import Inspector from 'react-inspector';
import type RefId from 'canner-ref-id';
import type {List} from 'immutable';

type ArrayValue<T> = List<T>;

export default (defaultValue: ArrayValue<any>) => (ConfigOrComposedComponent: React.Element<*>) => {
  class ExampleArrayValueWrapper extends ConfigOrComposedComponent {
    constructor(props: any) {
      super(props);

      this.state = {
        log: [],
        value: defaultValue
      };
    }

    onChange = (refId: RefId | {firstRefId: RefId, secondRefId: RefId}, type: string, delta: ArrayValue<any>): Promise<void> => {
      let {log, value} = this.state;

      if (type === 'update') {
        log.unshift({refId, type, delta});
        this.setState({log, value: delta});
      } else if (type === 'delete' && !refId.firstRefId) {
        log.unshift({refId, type});
        const pathArr = refId.getPathArr();
        const delValue = value.remove(pathArr[pathArr.length - 1])
        this.setState({log, value: delValue})
      } else if (type === 'create') {
        log.unshift({refId, type});
        const createVal = value.push({})
        this.setState({log, value: createVal})
      } else if (type === 'swap' && refId.firstRefId) {
        log.unshift({refId, type});

        // $FlowFixMe
        const {firstRefId, secondRefId} = refId;
        const firstRefIdArr = firstRefId.getPathArr();
        const secondRefIdArr = secondRefId.getPathArr();
        const firstIndex = firstRefIdArr[firstRefIdArr.length - 1];
        const secondIndex = secondRefIdArr[secondRefIdArr.length - 1];
        let newValue = value.set(firstIndex, value.get(secondIndex));
        newValue = newValue.set(secondIndex, value.get(firstIndex));
        this.setState({log, value: newValue});
      }

      return Promise.resolve();
    }

    render() {
      const {log, value} = this.state;

      return (
        <div>
          <ConfigOrComposedComponent
            {...this.props}
            onChange={this.onChange}
            value={value}
            />
          {log.length ?
          <div>
            <h4>onChange log:</h4>
            <div style={{border: '1px solid #CCC', padding: '10px'}}>
              {log.map((item, i) => {
                return (
                  <Inspector data={item} key={i}/>
                );
              })}
            </div>
          </div> : null}
        </div>
      );
    }
  }

  return ExampleArrayValueWrapper;
};