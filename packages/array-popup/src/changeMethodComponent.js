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
    const { id } = this.props;
    if (res.length === 3) {
      [modifyId, type, value] = res;
    } else if (res[1] === "delete" || res[1] === "swap") {
      // delete items in array
      [modifyId, type] = res;
    } else if (res.length === 2) {
      [type, value] = res;
    }

    if (type === "swap") {
      const { firstId, secondId } = modifyId;

      modifyId = {
        firstId: firstId.slice(id.length + 1, firstId.length),
        secondId: secondId.slice(id.length + 1, secondId.length)
      };
    } else {
      modifyId = modifyId.slice(id.length + 1, modifyId.length);
    }
    this.setState(function(prevState) {
      const updated = this.editCannerJSON(
        prevState.record,
        modifyId,
        type,
        value
      );
      return {
        record: updated
      };
    });
  }

  onChangeApi(modifyId, type, obj = {}) {
    let { record } = this.state;
    const { id } = this.props;
    const newId = modifyId.slice(id.length + 1, modifyId.length);
    const updated = this.editCannerJSON(record, newId, type, obj.payload);
    this.setState({ record: updated });
  }

  onChangeMulti(changeQueue) {
    let { record } = this.state;
    const { id } = this.props;
    changeQueue.forEach(item => {
      let { id: modifyId, type, value } = item;
      modifyId = modifyId.slice(id.length + 1, modifyId.length);
      record = this.editCannerJSON(record, modifyId, type, value);
    });
    this.setState({ record });
  }

  editCannerJSON(cannerJSON, id, type, value) {
    let updated = cannerJSON;
    let idPath;
    if (!id) {
      return immutable.fromJS(value);
    }
    if (type !== "swap") {
      idPath = this.generateIdPath(id);
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
      const firstIdPath = this.generateIdPath(id.firstId);
      const secondIdPath = this.generateIdPath(id.secondId);
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
