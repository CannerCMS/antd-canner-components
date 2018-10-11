// @flow
import React, {Component} from 'react';
import {Button, Icon, Dropdown, Menu} from 'antd';
import {FormattedMessage} from 'react-intl';
import ExportModal from './exportModal';
import ImportModal from './importModal';

type Props = {
  export?: {
    fields?: [{
      keyName: string,
      title: string,
      render?: * => string
    }],
    title?: string,
    filename?: string
  },
  import?: {
    fields?: [{
      keyName: string,
      title: string,
    }],
    title?: string,
    filename?: string
  },
  filter?: {
  },
  async: boolean,
  unPaginatedValue: Array<Object>,
  value: Array<Object>,
  filters: Array<Object>,
  addFilter: Function,
  displayedFilters: Array<number>
}

type State = {
  exportModalVisible: boolean,
  importModalVisible: boolean
}

export default class Actions extends Component<Props, State> {
  state = {
    exportModalVisible: false,
    importModalVisible: false,
  }

  triggerExportModal = () => {
    this.setState({
      exportModalVisible: !this.state.exportModalVisible
    });
  }

  triggerImportModal = () => {
    this.setState({
      importModalVisible: !this.state.importModalVisible
    });
  }


  addFilter = (e: Object) => {
    const {displayedFilters, addFilter} = this.props;
    const index = Number(e.key);
    if (displayedFilters.indexOf(index) === -1) {
      addFilter(index);
    }
  }

  render() {
    const {
      filters,
      value,
      unPaginatedValue,
      selectedValue,
      query,
      keyName,
      items,
      filter,
      request,
      deploy
    } = this.props;
    const {exportModalVisible, importModalVisible} = this.state;
    const exp = this.props.export || {};
    const imp = this.props.import || {};
    const exportFields = exp.fields || Object.keys(items).map(keyName => items[keyName]);
    let importFields = exp.fields || Object.keys(items).map(keyName => items[keyName]);
    // in csv format, it's difficult to write array or object type
    importFields = importFields.filter(item => ['string', 'number', 'boolean'].indexOf(item.type) >= 0)
    const menu = (
      <Menu onClick={this.addFilter}>
        {
          filters.map((filter, index) => (
            <Menu.Item key={index}>
              {filter.label}
            </Menu.Item>
          ))
        }
      </Menu>
    );
    return (
      <React.Fragment>
        <Button.Group>
          {this.props.export && (
            <Button onClick={this.triggerExportModal}>
              <Icon type="download" />
              <FormattedMessage id="query.actions.export"/>
            </Button>
          )}
          {
            this.props.import && (
              <Button onClick={this.triggerImportModal}>
                <Icon type="upload" />
                <FormattedMessage id="query.actions.import"/>
              </Button>
            )
          }
          {
            filter && (
              <Dropdown overlay={menu}>
                <Button>
                  <Icon type="filter" />
                  <FormattedMessage id="query.actions.filter"/>
                </Button>
              </Dropdown>
            )
          }
        </Button.Group>
        {/* $FlowFixMe */}
        <ExportModal
          visible={exportModalVisible}
          triggerModal={this.triggerExportModal}
          title={exp.title || ''}
          value={value || []}
          selectedValue={selectedValue || []}
          unPaginatedValue={unPaginatedValue || []}
          fields={exportFields || []}
          fileName={exp.filename || exp.title || 'export'}
          keyName={keyName}
        />
        {/* $FlowFixMe */}
        <ImportModal
          visible={importModalVisible}
          triggerModal={this.triggerImportModal}
          title={imp.title || ''}
          request={request}
          deploy={deploy}
          fields={importFields || []}
          fileName={imp.filename || imp.title || 'import'}
          query={query}
          items={items}
          keyName={keyName}
        />
      </React.Fragment>
    )
  }
}
