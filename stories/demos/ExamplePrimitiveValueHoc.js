// @flow
import * as React from 'react';
import Inspector from 'react-inspector';
import type RefId from 'canner-ref-id';
import {set, update} from 'lodash';

type PrimitiveValue = string | boolean | number | Object | Array<any>;

export default (defaultValue: PrimitiveValue, rootValue: PrimitiveValue) => (ConfigOrComposedComponent: React.Element<*>) => {
  class ExamplePrimitiveValueWrapper extends ConfigOrComposedComponent {
    constructor(props: any) {
      super(props);

      this.state = {
        log: [],
        value: defaultValue,
        rootValue: defaultValue || rootValue
      };
    }

    onChange = (refId: RefId | {firstRefId: RefId, secondRefId: RefId}, type: string, delta: PrimitiveValue): Promise<void> => {
      if (Array.isArray(refId)) {
        // $FlowFixMe
        return refId.map(v => this.onChange(v.refId, v.type, v.value));
      }
      let {log, value} = this.state;
      if (type === 'update') {
        // $FlowFixMe
        if (refId.getPathArr()[0] === 'variants') {
          log.unshift({refId, type});
          // $FlowFixMe
          
          const createVal = set(value, refId.getPathArr().slice(1), delta);
          this.setState({log, value: createVal})
          // $FlowFixMe
        } else {
          log.unshift({refId, type, delta});
          this.setState({log, value: delta});
        }
      } else if (type === 'delete' && !refId.firstRefId) {
        log.unshift({refId, type});
        const pathArr = refId.getPathArr();
        const delValue = value.splice(pathArr[pathArr.length - 1], 1)
        this.setState({log, value: delValue})
      } else if (type === 'create') {
        // $FlowFixMe
        if (refId.getPathArr()[0] === 'variants') {
          log.unshift({refId, type});
          // $FlowFixMe
          const createVal = update(value, refId.getPathArr()[1], arr => arr.concat(delta))
          this.setState({log, value: createVal})
          // $FlowFixMe
        } else if (refId.getPathArr()[0] === 'relation'){
          log.unshift({refId, type, delta});
          this.setState({log, value: value.concat(delta)});
        } else {
          log.unshift({refId, type});
          const createVal = value.concat(delta || {});
          this.setState({log, value: createVal})
        }
      } else if (type === 'swap' && refId.firstRefId) {
        log.unshift({refId, type});

        // $FlowFixMe
        const {firstRefId, secondRefId} = refId;
        const firstRefIdArr = firstRefId.getPathArr();
        const secondRefIdArr = secondRefId.getPathArr();
        const firstIndex = firstRefIdArr[firstRefIdArr.length - 1];
        const secondIndex = secondRefIdArr[secondRefIdArr.length - 1];
        let newValue = value.slice()
        newValue[firstIndex] = value[secondIndex];
        newValue[secondIndex] = value[firstIndex];
        this.setState({log, value: newValue});
      } else if (type === 'connect') {
        log.unshift({refId, type, delta});
        const genAddValue = value => (value && value.concat) ? value.concat(delta) : delta;
        this.setState(preState => ({log, value: genAddValue(preState.value)}))
      } else if (type === 'disconnect') {
        log.unshift({refId, type, delta});
        const genDelValue = value => (value && value.filter) ? value.filter(v => v.id !== delta.id) : null;
        this.setState(preState => ({log, value: genDelValue(preState.value)}))
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

  return ExamplePrimitiveValueWrapper;
};