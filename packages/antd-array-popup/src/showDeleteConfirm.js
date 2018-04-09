import { Modal } from "antd";
const confirm = Modal.confirm;

export default function showConfirm({ refId, onChange, order, deploy }) {
  // eslint-disable-line
  confirm({
    title: "確定要刪除嗎？",
    content: "按確認刪除，即會永久刪除此項目！",
    onOk: () => {
      onChange(refId.child(order), "delete");
      deploy();
    },
    onCancel: () => {},
    okText: "確認",
    cancelText: "取消"
  });
}
