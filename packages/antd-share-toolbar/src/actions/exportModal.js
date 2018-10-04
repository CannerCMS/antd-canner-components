// @flow

import React from 'react';
import { Modal, Form, Radio, Select, Button } from 'antd';
import get from 'lodash/get';
import { withApollo } from 'react-apollo';
import {FormattedMessage, injectIntl} from 'react-intl';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

type Props = {
  form: Object,
  value: Array<Object>,
  selectedValue: Array<Object>,
  fileName: string,
  triggerModal: Function,
  fields: Array<Object>,
  client: any,
  intl: Object,
  title: string,
  visible: boolean,
  query: Object,
  keyName: string
}

type State = {
  downloading: boolean
}

const ALL = 'ALL';
const THIS_PAGE = 'THIS_PAGE';
const SELECTED = 'SElECTED';
const DOWNLOAD = 'DOWNLOAD';

// $FlowFixMe
@injectIntl
@withApollo
@Form.create()
export default class ExportModal extends React.Component<Props, State> {
  state = {
    downloading: false
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    const {
      form,
      value,
      selectedValue,
      allValue,
      fileName,
      triggerModal,
      fields,
    } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const {exportData, exportFieldKeys, exportWay} = values;
        let csv = [];
        const fieldsData = fields.filter(field => exportFieldKeys.find(key => key === field.keyName));
        if (exportData === ALL) {
          csv = genCSV(allValue, fieldsData);
        } else if (exportData === THIS_PAGE) {
          csv = genCSV(value, fieldsData);
        } else if (exportData === SELECTED) {
          csv = genCSV(selectedValue, fieldsData);
        }
        if (exportWay === DOWNLOAD) {
          this.setState({
            downloading: true
          });
          download(fileName, csv);
          this.setState({
            downloading: false
          }, triggerModal);
        } else {
          // not support other exportWay for now
        }
      }
    });
  }

  handleCancel = () => {
    this.props.triggerModal();
  }

  render() {
    const {selectedValue, visible, fields, form: {getFieldDecorator}, title, intl} = this.props;
    const {downloading} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <Modal
        title={<FormattedMessage id="actions.export.modal.title" />}
        visible={visible}
        footer={null}
        closable
        maskClosable
        onCancel={this.handleCancel}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="actions.export.data.label" />}
          >
            {getFieldDecorator('exportData', {
              initialValue: selectedValue.length ? 'SELECTED' : 'ALL',
            })(
              <RadioGroup>
                <Radio value={ALL}>
                  <FormattedMessage id="actions.export.data.all" />
                  {title}
                </Radio>
                <Radio value={THIS_PAGE}>
                  <FormattedMessage id="actions.export.data.thisPage" />
                </Radio>
                <Radio value="SELECTED" disabled={!selectedValue.length}>
                  <FormattedMessage
                    id="actions.export.data.selected"
                    values={{
                      length: selectedValue.length,
                      title
                    }}
                  />
                </Radio>
              </RadioGroup>
            )}
          </FormItem>
          
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage id="actions.export.way.label" />
            }
          >
            {getFieldDecorator('exportWay', {
              initialValue: DOWNLOAD,
            })(
              <RadioGroup disabled={true}>
                <Radio value={DOWNLOAD}>
                  <FormattedMessage id="actions.export.way.csv" />
                </Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage id="actions.export.fields.label" />
            }
          >
            {getFieldDecorator('exportFieldKeys', {
              initialValue: fields.map(field => field.keyName),
            })(
              <Select
                mode="multiple"
                placeholder={intl.formatMessage({
                  id: "actions.export.fields.placeholder"
                })}
              >
                {
                  fields.map(field => (
                    <Option value={field.keyName} key={field.keyName}>{field.title || field.keyName}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button htmlType="button" onClick={this.handleCancel}>取消</Button>
            <Button loading={downloading} type="primary" htmlType="submit" style={{ marginLeft: 24 }}>匯出</Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

function genCSV(data: Array<Object>, fields: Array<Object>) {
  const fieldNames = fields.map(field => field.title || field.keyName);
  const rows = [fieldNames];
  data.forEach((datum) => {
    const values = [];
    fields.forEach((field) => {
      let value = get(datum, field.keyName);
      if (field.render) {
        value = field.render(value);
      }
      if (Array.isArray(value)) {
        value = value.join(';');
      }
      values.push(value);
    });
    rows.push(values);
  });
  let csvContent = 'data:text/csv;charset=utf-8,';
  rows.forEach((rowArray) => {
    const row = rowArray.join(',');
    csvContent += `${row}\r\n`;
  });
  return csvContent;
}

function download(fileName, csvContent) {
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${fileName}.csv`);
  link.innerHTML = '';
  document.body && document.body.appendChild(link); // Required for FF

  link.click();
}