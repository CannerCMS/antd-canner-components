import React, { Component } from "react";
import PropTypes from "prop-types";
import validator from "../../utils/Validator";
import TransModal from "./TransModal";
import InfoModal from "./InfoModal";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import styles from "./style/bucket.scss";
import CSSModules from "react-css-modules";
import isUndefined from "lodash/isUndefined";
import { Button, Tag, Card, Icon } from "antd";
import { List } from "immutable";
const UNCATEGORIZED_BUCKET_INDEX = -1;

// value: [
//  {name: "300元", values: ["taipei"], ...metaData}
// ]
// 其中每個 object 稱做一個 bucket
// values 內儲存被分配到這個 bucket 的 option
// metaData 則可以決定這個 bucket 的其他資訊
// bucket中的 name 和 values 是固定會有的 key

@CSSModules(styles)
export default class Bucket extends Component {
  constructor(props) {
    super(props);
    this.transferBucket = this.transferBucket.bind(this);
    this.createBucket = this.createBucket.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.openTransModal = this.openTransModal.bind(this);
    this.openInfoModal = this.openInfoModal.bind(this);
  }

  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    createEmptyData: PropTypes.func.isRequired,
    schema: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    Items: PropTypes.func.isRequired,
    plugins: PropTypes.object.isRequired,
    uiParams: PropTypes.shape({
      options: PropTypes.array.isRequired,
      meta: PropTypes.object
    })
  };

  createBucket(id, type, EmptyBucket) {
    // 建立新 bucket 時被呼叫
    // addModal 會將 createEmptyData 的資料傳上來
    // 因為裡面不包含 values 所以必須再 set list()
    const { onChange } = this.props;
    onChange(id, type, EmptyBucket.set("values", new List()));
  }

  openDeleteModal(index) {
    this.deleteModal.showModal(index);
  }

  openTransModal(option, index) {
    this.transModal.showModal(option, index);
  }

  openInfoModal(bucket, i) {
    this.infoModal.showModal(bucket, i);
  }

  openAddModal() {
    const { value } = this.props;
    this.addModal.showModal(value.size);
  }

  transferBucket(option, srcBucketIndex, destBucketIndex) {
    // 將 option 從 srcBucket move to destBucket
    const { id, onChange, value } = this.props;
    // 這裡將 transfer 分成2個步驟
    // first step： 刪除來源 bucket 中的 option
    // second step: 增加 option 到目的bucket
    if (srcBucketIndex !== UNCATEGORIZED_BUCKET_INDEX) {
      const srcBucket = value.get(srcBucketIndex);
      const srcValues = srcBucket.get("values");
      onChange(
        `${id}/${srcBucketIndex}/values/${srcValues.indexOf(option.key)}`,
        "delete"
      );
    }

    if (destBucketIndex !== UNCATEGORIZED_BUCKET_INDEX) {
      const toBucket = value.get(destBucketIndex);
      const toValues = toBucket.get("values");
      onChange(
        `${id}/${destBucketIndex}/values/${toValues.size}`,
        "create",
        option.key
      );
    }
  }

  render() {
    const { value, uiParams, id, onChange } = this.props;
    const { options, metaData } = uiParams;
    // 找出未分類的 option
    const noAssigned = options.filter(option => {
      // 如果 find undefined 代表 option 還沒被分配
      return isUndefined(
        value.find(bucket => {
          // 回傳 option 是否被分配到 bucket
          return bucket.get("values").indexOf(option.key) !== -1;
        })
      );
    });
    const renderOption = (option, i, index) => (
      <Tag
        onClick={() => this.openTransModal(option, index)}
        color="orange"
        key={i}
      >
        {option.text}
        <Icon type="swap" />
      </Tag>
    );
    const renderCardExtra = (bucket, bucketIndex) => (
      <span>
        <a onClick={() => this.openInfoModal(bucket, bucketIndex)}>更多資訊</a>
        <Icon
          className={styles["close-icon"]}
          type="close"
          onClick={() => this.openDeleteModal(bucketIndex)}
        />
      </span>
    );

    // 因為 values 不提供使用者直接修改
    // 所以在這裡並不加上去
    const addSchema = {
      name: {
        type: "string",
        description: "類別名稱"
      },
      ...metaData
    };
    return (
      <div>
        <Card title="未分類" style={{ width: "100%", marginBottom: 30 }}>
          {noAssigned.map((option, i) => {
            return renderOption(option, i, -1);
          })}
        </Card>
        <Button
          type="primary"
          icon="plus"
          size="large"
          onClick={this.openAddModal}
        >
          增加類別
        </Button>
        <div styleName="board">
          {value.map((bucket, bucketIndex) => {
            const bucketName = bucket.get("name");
            return (
              <div styleName="bucket">
                <Card
                  title={bucketName}
                  extra={renderCardExtra(bucket, bucketIndex)}
                  style={{ width: "100%" }}
                >
                  {bucket.get("values").map((val, i) => {
                    const option = options.find(option => option.key === val);
                    return renderOption(option, i, bucketIndex);
                  })}
                </Card>
              </div>
            );
          })}
        </div>
        <TransModal
          value={value}
          transferBucket={this.transferBucket}
          ref={modal => (this.transModal = modal)}
        />
        <InfoModal
          {...this.props}
          schema={addSchema}
          ref={modal => (this.infoModal = modal)}
        />
        <AddModal
          {...this.props}
          schema={addSchema}
          onChange={this.createBucket}
          ref={modal => (this.addModal = modal)}
        />
        <DeleteModal
          id={id}
          onChange={onChange}
          ref={modal => (this.deleteModal = modal)}
        />
      </div>
    );
  }
}
