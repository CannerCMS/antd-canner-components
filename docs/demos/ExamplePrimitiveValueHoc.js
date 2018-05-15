// @flow
import * as React from 'react';
import Inspector from 'react-inspector';
import type RefId from 'canner-ref-id';

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
      if (refId.length) {
        // $FlowFixMe
        return refId.map(v => this.onChange(v.refId, v.type, v.value));
      }
      let {log, value} = this.state;
      if (type === 'update') {
        // $FlowFixMe
        if (refId.getPathArr()[0] === 'variants') {
          log.unshift({refId, type});
          // $FlowFixMe
          const createVal = value.setIn(refId.getPathArr().slice(1), delta)
          this.setState({log, value: createVal})
          // $FlowFixMe
        } else {
          log.unshift({refId, type, delta});
          this.setState({log, value: delta});
        }
      } else if (type === 'delete' && !refId.firstRefId) {
        log.unshift({refId, type});
        const pathArr = refId.getPathArr();
        const delValue = value.remove(pathArr[pathArr.length - 1])
        this.setState({log, value: delValue})
      } else if (type === 'create') {
        // $FlowFixMe
        if (refId.getPathArr()[0] === 'variants') {
          log.unshift({refId, type});
          // $FlowFixMe
          const createVal = value.update(refId.getPathArr()[1], list => list.push(delta))
          this.setState({log, value: createVal})
          // $FlowFixMe
        } else if (refId.getPathArr()[0] === 'relation'){
          log.unshift({refId, type, delta});
          this.setState({log, value: value.push(delta)});
        } else {
          log.unshift({refId, type});
          const createVal = value.push({})
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
        let newValue = value.set(firstIndex, value.get(secondIndex));
        newValue = newValue.set(secondIndex, value.get(firstIndex));
        this.setState({log, value: newValue});
      } else if (type === 'connect') {
        log.unshift({refId, type, delta});
        this.setState({refId, log, value: value.push(delta)});
      } else if (type === 'disconnect') {
        log.unshift({refId, type, delta});
        const delValue = value.filter(v => v.get('id') !== (delta: any).get('id'));
        this.setState({log, value: delValue})
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