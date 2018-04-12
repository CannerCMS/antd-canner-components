// @flow
import * as React from 'react';
import Inspector from 'react-inspector';
import type RefId from 'canner-ref-id';

type PrimitiveValue = string | boolean | number;

export default (defaultValue: PrimitiveValue) => (ConfigOrComposedComponent: React.Element<*>) => {
  class ExamplePrimitiveValueWrapper extends ConfigOrComposedComponent {
    constructor(props: any) {
      super(props);

      this.state = {
        log: [],
        value: defaultValue
      };
    }

    onChange = (refId: RefId, type: string, value: PrimitiveValue) => {
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

  return ExamplePrimitiveValueWrapper;
};