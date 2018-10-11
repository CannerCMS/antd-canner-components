// @flow

import * as React from 'react';
import DefaultToolbarLayout from './toolbarlayout';
import Pagination from './pagination';
import Sort from './sort';
import Filter from './filter';
import Actions from './actions';
import toLower from 'lodash/toLower';
import {paginate, filterWith, sortWith, getPermanentFilter} from './utils';

type Props = {
  children: Function,
  dataSource: Array<Object>,
  recordValue: any,
  toolbar: {
    async: boolean,
    actions?: {
      component?: React.ComponentType<*>,
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
      }
    },
    sorter?: {
      component?: React.ComponentType<*>,
      [string]: *
    },
    pagination?: {
      component?: React.ComponentType<*>,
      [string]: *
    },
    filter?: {
      component?: React.ComponentType<*>,
      filters?: Array<Object>,
      [string]: *
    },
    toolbarLayout?: {
      component?: React.ComponentType<*>,
      [string]: *
    }
  }
}

type State = {
  sorter: any,
  where: any,
  current: number,
  pageSize: number,
  displayedFilterIndexs: Array<number>
}

export default class Toolbar extends React.PureComponent<Props, State> {
  async: boolean;

  constructor(props: Props) {
    super(props);
    const {toolbar = {}, recordValue} = props;
    this.async = toolbar.async || false;
    this.permanentFilter = {};
    this.alwaysDisplayFilterIndexs = [];
    let defaultWhere = {};
    if (toolbar.filter) {
      this.permanentFilter = getPermanentFilter(toolbar, recordValue);
      this.alwaysDisplayFilterIndexs = (toolbar.filter.filters || [])
        .map((filter, i) => ({...filter, __index: i}))
        .filter(filter => filter.alwaysDisplay)
        .map(filter => filter.__index);
      const defaultFilter = toolbar.filter.filters.find(item => {
        return item.type === 'select' &&
          'defaultOptionIndex' in item;
      });
      if (defaultFilter) {
        defaultWhere = defaultFilter.options[defaultFilter.defaultOptionIndex].condition;
      }
    }
    this.state = {
      sorter: {},
      where: {...this.permanentFilter, ...defaultWhere},
      current: 1,
      pageSize: 10,
      displayedFilterIndexs: []
    };
  }

  changeOrder = ({sortField, sortType}: {sortField: string, sortType: string}) => {
    if (sortField) {
      this.setState({
        sorter: {
          sortField,
          sortType
        },
        current: 1
      });
    } else {
      this.setState({
        sorter: {},
        current: 1
      });
    }
  }

  changeFilter = (where: Object) => {
    this.setState({
      where: {...where, ...this.permanentFilter},
      current: 1
    });
  }

  addFilter = (index: number) => {
    this.setState({
      displayedFilterIndexs: this.state.displayedFilterIndexs.concat(index)
    });
  }

  deleteFilter = (index: number) => {
    this.setState({
      displayedFilterIndexs: this.state.displayedFilterIndexs.filter(i => i !== index)
    });
  }

  changeSize = (size: number) => {
    this.setState({
      pageSize: size
    });
  }

  changePage = (page: number, size: number) => {
    this.setState({
      current: page,
      pageSize: size
    });
  }

  render() {
    const {dataSource, children, toolbar = {}, selectedValue, items, keyName, request, deploy} = this.props;
    let {displayedFilterIndexs} = this.state;
    const {sorter, pagination, filter, toolbarLayout, actions} = toolbar;
    const ToolbarLayout = toolbarLayout && toolbarLayout.component ? toolbarLayout.component : DefaultToolbarLayout;
    const SortComponent = sorter && sorter.component ? sorter.component : Sort;
    const FilterComponent = filter && filter.component ? filter.component : Filter;
    const ActionsComponent = actions && actions.component ? actions.component : Actions;
    const PaginationComponent = pagination && pagination.component ? pagination.component : Pagination;
    let value = dataSource.map((data, i) => ({...data, __index: i}));
    if (!toolbar || toolbar.async) {
      return children({value, showPagination: false});
    }
    if (filter) {
      value = filterWith(value, this.state.where);
    }
    if (sorter) {
      value = sortWith(value, this.state.sorter.sortField, toLower(this.state.sorter.sortType));
    }
    const unPaginatedValue = value;
    const total = value.length;
    if (pagination) {
      value = paginate(value, this.state.current, this.state.pageSize);
    }
    console.log(toolbar);
    return <ToolbarLayout
      Actions={actions ? <ActionsComponent
        {...actions}
        value={value}
        keyName={keyName}
        selectedValue={selectedValue}
        unPaginatedValue={unPaginatedValue}
        filters={filter && filter.filters || []}
        displayedFilters={[...displayedFilterIndexs, ...this.alwaysDisplayFilterIndexs]}
        addFilter={this.addFilter}
        items={items.items}
        request={request}
        deploy={deploy}
      /> : <div />}
      Sort={sorter ? <SortComponent
        {...sorter}
        defaultField={sorter.defaultField}
        options={sorter.options || []}
        changeOrder={this.changeOrder}
        sortField={this.state.sorter.sortField}
        sortType={this.state.sorter.sortType}
      /> : null}
      Pagination={pagination ? <PaginationComponent
        {...pagination}
        pageSize={this.state.pageSize}
        current={this.state.current}
        changePage={this.changePage}
        changeSize={this.changeSize}
        total={total}
      /> : null}
      Filter={filter ? <FilterComponent
        async={toolbar.async}
        {...filter}
        displayedFilters={[...displayedFilterIndexs, ...this.alwaysDisplayFilterIndexs]}
        where={this.state.where}
        changeFilter={this.changeFilter}
        deleteFilter={this.deleteFilter}
      /> : null}
    >
      {children({value, showPagination: false})}
    </ToolbarLayout>
  }
}
