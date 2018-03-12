// @flow

import React, { Component } from "react";
import GridDraggable, { Section } from "grid-draggable";
import GridBreakpoint from "grid-breakpoint";
import { List } from "immutable";
import Item from "./item";
import Add from "./add";
import EditImage from "@canner/image-upload";
import createImageService from "@canner/image-service-config";
import typeof ImageServiceConfig from "@canner/image-service-config/lib/imageService";

import "./style/index.css";

// types
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {GenerateIdFn} from 'types/DefaultProps';

type FieldItem = {
  [string]: any
}

type Props = ArrayDefaultProps<FieldItem> & {
  uiParams: {
    imageKey: string,
    thumbKey: string,
    titleKey?: string,
    service?: string,
    dir?: string,
    filename?: string,
    disableDrag: boolean
  },
  generateId: GenerateIdFn,
  value: List<any>,
  transformData: Function
};

type State = {
  editPopup: boolean
};

export default class Gallery extends Component<Props, State> {
  imageKey: string;
  thumbKey: string;
  titleKey: ?string;
  serviceConfig: ImageServiceConfig;

  constructor(props: Props) {
    super(props);
    const { uiParams } = props;
    this.imageKey = uiParams.imageKey || "image";
    this.thumbKey = uiParams.thumbKey || this.imageKey;
    this.titleKey = uiParams.titleKey;

    this.state = {
      editPopup: false
    };

    // service settings
    const { service, dir, filename } = uiParams;
    const key = this.props.id.split('/')[0];
    this.serviceConfig = createImageService({
      service,
      dir,
      filename
    }, {key}).getServiceConfig();
  }

  static defaultProps = {
    value: new List(),
    uiParams: {}
  };

  onSwap = (fromKey: number, toKey: number) => {
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

  addImages = (values: string | Array<string>) => {
    const { id, transformData, onChange } = this.props;
    const that = this;

    if (Array.isArray(values)) {
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
          id: 'test',
          type: "create",
          value: transformData(newData)
        };
      });
      onChange(createValues);
    } else {
      onChange(id, "create", List([{
        [that.thumbKey]: values,
        [that.imageKey]: values
      }]));
    }
    this.closeEditPopup();
  };

  deleteImage = (imageId: string) => {
    const r = confirm("Are you sure to delete this item?");
    if (r) {
      const { id, generateId, onChange } = this.props;
      const deleteId = generateId(id, imageId, "array");
      onChange(deleteId, "delete");
    }
  };

  changeTitle = (imageId: string, value: string) => {
    const { id, onChange, generateId, transformData } = this.props;
    const changeId = generateId(id, `${imageId}/${this.titleKey}`, "array"); // !!!!need to refactor key concat
    onChange(id, "update", transformData(value));
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
            id={`${i}`}
            key={i}
          />
        );
      }

      return (
        // $FlowFixMe
        <Section key={i} handle=".handle" dragClassName="drag">
          <Item
            image={item && item.get(this.imageKey)}
            title={item && item.get(this.titleKey)}
            disableDrag={uiParams.disableDrag}
            deleteImage={this.deleteImage}
            changeTitle={this.changeTitle}
            id={`${i}`}
            key={i}
          />
        </Section>
      );
    });

    list = list.push(<Add key="add" onClick={this.showEditPopup} />);
    return (
      <div style={{maxWidth: '800px'}}>
        {uiParams.disableDrag ? (
          <GridBreakpoint lg={4} md={4} sm={12} xs={12}>
            {list.toJS()}
          </GridBreakpoint>
        ) : (
          <GridDraggable onSwap={this.onSwap} lg={4} md={6} sm={12} xs={12}>
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
