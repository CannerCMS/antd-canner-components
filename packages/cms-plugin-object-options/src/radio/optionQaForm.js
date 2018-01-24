import React, { Component } from "react";
import { createFromRes, createFromItem } from "../qaOps";
import qaSchema from "../qaSchema";
import { Map } from "immutable";

// utils
const generateIdPath = id => {
  const split = id.split("/");
  return split.splice(2, split.length);
};
const QA_ID = "form/key";
const COLNAME = "col";
const wrapWithObject = cannerJSON => Map({ [COLNAME]: cannerJSON }); // eslint-disable-line

export default class OptionQaForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeMulti = this.onChangeMulti.bind(this);
    this.state = {
      cannerJSON: wrapWithObject(props.cannerJSON),
      schema: qaSchema({ [COLNAME]: props.schema }, props.description),
      errors: []
    };
  }

  static propTypes = {
    description: PropTypes.string,
    optionKey: PropTypes.string.isRequired,
    onOptionDataChange: PropTypes.func.isRequired,
    plugins: PropTypes.object.isRequired,
    Items: PropTypes.func.isRequired,
    createEmptyData: PropTypes.func.isRequired,
    cannerJSON: PropTypes.any.isRequired,
    schema: PropTypes.object.isRequired
  };

  onChange(...res) {
    let { cannerJSON } = this.state;
    const { optionKey, onOptionDataChange } = this.props;
    const qaOp = createFromRes(res, generateIdPath);
    cannerJSON = qaOp.mutate(cannerJSON);
    onOptionDataChange({ key: optionKey, data: cannerJSON.get(COLNAME) });
    this.setState({ cannerJSON });
  }

  onChangeMulti(changeQueue) {
    const that = this;
    const { optionKey, onOptionDataChange } = this.props;
    let { cannerJSON } = this.state;
    changeQueue.forEach(item => {
      let { id, type, value } = item;
      cannerJSON = createFromItem(id, type, value, generateIdPath).mutate(
        cannerJSON
      );
    });
    onOptionDataChange({ key: optionKey, data: cannerJSON.get(COLNAME) });
    that.setState({ cannerJSON });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cannerJSON: wrapWithObject(nextProps.cannerJSON),
      schema: qaSchema({ [COLNAME]: nextProps.schema }, nextProps.description)
    });
  }

  render() {
    const { Items, plugins } = this.props;
    const { cannerJSON, schema } = this.state;
    return (
      <div>
        {renderChildren(child => {
          if (child.name === )
        })}
      </div>
      <Items
        cannerJSON={cannerJSON}
        schema={schema}
        plugins={plugins}
        onChange={this.onChange}
        onChangeMulti={this.onChangeMulti}
        id={QA_ID}
      />
    );
  }
}
