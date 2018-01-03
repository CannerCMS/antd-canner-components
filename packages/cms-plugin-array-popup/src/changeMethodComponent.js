import { Component } from "react";
import PropTypes from "prop-types";
import immutable from "immutable";

export default class ChangeMethodComponent extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  onChange(...res) {
    let modifyId;
    let type;
    let value;
    if (res.length === 3) {
      [modifyId, type, value] = res;
    } else if (res[1] === "delete" || res[1] === "swap") {
      // delete items in array
      [modifyId, type] = res;
    } else if (res.length === 2) {
      [type, value] = res;
    } else if (res.length === 1) {
      res[0].forEach(args => {
        this.onChange(args.id, args.type, args.value);
      });
      return ;
    }
    this.setState(function(prevState) {
      const updated = this.editCannerJSON(
        prevState.value,
        modifyId,
        type,
        value
      );
      return {
        value: updated
      };
    });
  }

  editCannerJSON(cannerJSON, id, type, value) {
    let updated = cannerJSON;
    let idPath;
    if (!id) {
      return immutable.fromJS(value);
    }
    if (type !== "swap") {
      idPath = id.split('/').slice(1);
    }
    if (type === "update") {
      updated = cannerJSON.setIn(idPath, value);
    } else if (type === "delete") {
      updated = cannerJSON.deleteIn(idPath);
    } else if (type === "create") {
      const originValue = cannerJSON.getIn(idPath);
      const newValue = (originValue || new immutable.List()).push(value);
      updated = cannerJSON.setIn(idPath, newValue);
    } else if (type === "swap") {
      const firstIdPath = id.firstId.split('/').slice(1);
      const secondIdPath = id.secondId.split('/').slice(1);
      const firstValue = cannerJSON.getIn(firstIdPath);
      const secondValue = cannerJSON.getIn(secondIdPath);
      updated = cannerJSON.setIn(firstIdPath, secondValue);
      updated = updated.setIn(secondIdPath, firstValue);
    }
    return updated;
  }

  generateIdPath(id) {
    const split = id.split("/");
    return split.splice(1, split.length);
  }
}
