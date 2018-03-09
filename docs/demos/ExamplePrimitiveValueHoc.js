// @flow
import * as React from 'react';
import {Card} from 'antd';

export default (defaultValue: string) => (ConfigOrComposedComponent: React.Element<*>) => {
  class ExamplePrimitiveValueWrapper extends ConfigOrComposedComponent {
    constructor(props: any) {
      super(props);

      this.state = {
        log: [],
        value: defaultValue
      };
    }

    onChange = (id: string, type: string, value: string) => {
      let {log} = this.state;
      log.unshift(JSON.stringify({id, type, value}));
      
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
            <Card>
              {log.map((item, i) => {
                return (
                  <p key={i}>{item}</p>
                );
              })}
            </Card>
          </div> : null}
        </div>
      );
    }
  }

  return ExamplePrimitiveValueWrapper;
};