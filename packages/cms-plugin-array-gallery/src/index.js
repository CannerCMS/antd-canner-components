// @flow

import React, { Component } from "react";
import GridDraggable, { Section } from "grid-draggable";
import GridBreakpoint from "grid-breakpoint";
import { List } from "immutable";
import Item from "./item";
import Add from "./add";
import EditImage from "@canner/image-upload";
import "./style/index.css";
import code from "@canner/image-service-config";
import ImageServiceConfig from "@canner/image-service-config/lib/imageService";

type Props = defaultProps & {
  uiParams: {
    imageKey: string,
    thumbKey: string,
    titleKey: string,
    disableDrag: boolean,
    onChangeMulti: any => void
  },
  value: Array<{
    [string]: string
  }>
};

type State = {
  editPopup: boolean
};

export default class Gallery extends Component<Props, State> {
  imageKey: string;
  thumbKey: string;
  titleKey: string;
  serviceConfig: ImageServiceConfig;
  constructor(props) {
    super(props);
    const { uiParams } = props;
    this.imageKey = uiParams.imageKey || "image";
    this.thumbKey = uiParams.thumbKey || this.imageKey;
    this.titleKey = uiParams.titleKey || "title";
    this.state = {
      editPopup: false
    };
    const { service, dir, filename } = uiParams;
    this.serviceConfig = code/({
      service,
      dir,
      filename
    }).getServiceConfig();
  }

  static defaultProps = {
    value: List([]),
    uiParams: {}
  };

  onSwap = (fromKey: string, toKey: string) => {
    const { generateId, id } = this.props;
    const prevIndex = generateId(id, fromKey, "array");
    const currIndex = generateId(id, toKey, "array");

    this.props.onChange({ firstId: currIndex, secondId: prevIndex }, "swap");
  };

  showEditPopup = () => {
    this.setState({ editPopup: true });
  };

  closeEditPopup = () => {
    this.setState({ editPopup: false });
  };

  addImages = (values: Array<any>) => {
    const { id, transformData, onChangeMulti } = this.props;
    const that = this;

    const createValues = values.map((img: string) => {
      // + i to create multiple ids when upload multi data.
      const thumb = img.split("/");
      // if source is imgur, get min size image
      if (img.indexOf("imgur.com") > -1) {
        const filename = thumb[thumb.length - 1].split(".");
        thumb[thumb.length - 1] = `${filename[0]}m.${filename[1]}`; // change thumb to `m` size
      }
      const newData = {
        [that.thumbKey]: thumb.join("/"),
        [that.imageKey]: img
      };
      if (that.titleKey) {
        newData[that.titleKey] = "";
      }

      return {
        id,
        type: "create",
        value: transformData(newData)
      };
    });

    onChangeMulti(createValues);
    this.closeEditPopup();
  };

  deleteImage = (imageId: string) => {
    const r = confirm("您確定要刪除嗎？");
    if (r) {
      const { id, generateId, onChange } = this.props;
      const deleteId = generateId(id, imageId, "array");
      onChange(deleteId, "delete");
    }
  };

  changeTitle = (imageId: string, value: string) => {
    const { id, onChange, generateId, transformData } = this.props;
    const changeId = generateId(id, `${imageId}/${this.titleKey}`, "array"); // !!!!need to refactor key concat
    onChange(changeId, "update", transformData(value));
  };

  render() {
    const { editPopup } = this.state;
    const { value, uiParams } = this.props;

    let list = value.map((item, i) => {
      if (uiParams.disableDrag) {
        return (
          <Item
            image={item && item.get(this.imageKey)}
            title={item && item.get(this.titleKey)}
            disableDrag={uiParams.disableDrag}
            deleteImage={this.deleteImage}
            changeTitle={this.changeTitle}
            id={i}
            key={i}
          />
        );
      }

      return (
        <Section key={i} handle=".handle" dragClassName="drag">
          <Item
            image={item && item.get(this.imageKey)}
            title={item && item.get(this.titleKey)}
            disableDrag={uiParams.disableDrag}
            deleteImage={this.deleteImage}
            changeTitle={this.changeTitle}
            id={i}
            key={i}
          />
        </Section>
      );
    });

    list = list.push(<Add onClick={this.showEditPopup} />);

    return (
      <div>
        {uiParams.disableDrag ? (
          <GridBreakpoint lg={4} md={3} xs={6}>
            {list.toJS()}
          </GridBreakpoint>
        ) : (
          <GridDraggable onSwap={this.onSwap} lg={4} md={3} xs={6}>
            {list}
          </GridDraggable>
        )}
        <EditImage
          onChange={this.addImages}
          editPopup={editPopup}
          serviceConfig={this.serviceConfig}
          closeEditPopup={this.closeEditPopup}
          multiple={true}
        />
      </div>
    );
  }
}
