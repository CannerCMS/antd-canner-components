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

    onChange = (refId: RefId, type: string, value: ArrayValue<any>) => {
      let {log} = this.state;
      log.unshift({refId, type, value});
      
      this.setState({log, value});
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