// @flow

import React, {useState, forwardRef, useImperativeHandle} from "react";
import { Modal } from "antd";

import { FormattedMessage } from "react-intl";
import defaultMessage from "@canner/antd-locales";
import { Item, ConfirmButton, ResetButton } from "canner-helpers";
import type {FieldId} from "types/DefaultProps";

type Props = {
  onChange: (refId: FieldId | {[string]: FieldId}, type: string, value?: any) => Promise<void>
  | (Array<{
    refId: FieldId | {[string]: FieldId},
    type: string,
    value?: any
  }>) => Promise<void>,
  reset: Function,
  createKeys?: Array<string>,
  refId: FieldId,
  items: {[string]: any}
}

export default forwardRef((props: Props, ref: any) => {
  const {reset, refId, createKeys, onChange} = props;
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState(0);

  useImperativeHandle(ref, () => ({
    showModal(i: number) {
      onChange(refId, "create");
      setVisible(true);
      setOrder(i)
    }
  }));

  const closeModalAndReset = () => {
    reset(refId);
    setVisible(false);
  }

  const footer = (
    <div>
      <ConfirmButton
        text={<FormattedMessage
          id="array.table.modal.okText"
          defaultMessage={defaultMessage.en["array.table.modal.okText"]}
        />}
        callback={closeModalAndReset}
      />
      <ResetButton
        text={<FormattedMessage
          id="array.table.modal.cancelText"
          defaultMessage={defaultMessage.en["array.table.modal.cancelText"]}
        />}
        callback={closeModalAndReset}
      />
    </div>
  );

  if (!visible) {
    return <div/>
  }

  // visible
  return (
    <Modal
      width="80%"
      visible={visible}
      onCancel={closeModalAndReset}
      afterClose={closeModalAndReset}
      closable={false}
      maskClosable={false}
      footer={footer}
    >
      <Item
        refId={refId.child(order)}
        filter={createKeys && (child => createKeys.indexOf(child.name) !== -1)}
      />
    </Modal>
  );
})
