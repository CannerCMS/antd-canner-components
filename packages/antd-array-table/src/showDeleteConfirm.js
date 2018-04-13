import { Modal } from "antd";
const confirm = Modal.confirm;

export default function showConfirm({ refId, onChange, intl, order, deploy }) {
  // eslint-disable-line
  confirm({
    title: intl.formatMessage({ id: "array.table.delete.confirm" }),
    onOk: () => {
      onChange(refId.child(order), "delete")
        .then(() => {
          if(deploy) {
            deploy();
          }
        })
    }
  });
}
