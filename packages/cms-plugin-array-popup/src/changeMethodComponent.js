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

  onChangeMulti(changeQueue) {
    let stateValue = this.state.value;
    changeQueue.forEach(item => {
      let { id: modifyId, type, value } = item;
      modifyId = modifyId.slice();
      stateValue = this.editCannerJSON(stateValue, modifyId, type, value);
    });
    this.setState({ value: stateValue });
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
      if (idPath.slice(-1)[0] === "0")
        updated = cannerJSON.setIn(idPath.slice(0, -1), new immutable.List());
      updated = updated.setIn(idPath, value);
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
