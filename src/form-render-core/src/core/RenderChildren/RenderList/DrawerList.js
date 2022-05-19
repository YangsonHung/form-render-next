import { ArrowDownOutlined, ArrowUpOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Drawer, Popconfirm, Table } from 'antd';
import React, { useRef } from 'react';
import { useSet, useTools } from '../../../hooks';
import { getDataPath, getDisplayValue, getKeyFromPath, formatThousands } from '../../../utils';
import Core from '../../index';
import ErrorMessage from '../../RenderField/ErrorMessage';

const FIELD_LENGTH = 170;

const handleDataSource = ({ columns, dataSource, flatten }) => {
    // 获取第一列的字段key：dataIndex
    const { dataIndex = '' } = columns[0] || {};

    // 构建一个合计对象，第一列的dataIndex作为key，值为“合计”
    const total = { [dataIndex]: '合计', $idx: Math.random() };

    // 计算函数
    const calculate = dataIndex => {
        if (!dataSource.length) {
            return undefined;
        }

        const _dataSource = dataSource
            .map(e => e[dataIndex])
            .filter(e => !Object.is(e, null) && !Object.is(e, undefined) && !Object.is(e, ''));

        if (!_dataSource.length) {
            return undefined;
        }

        return _dataSource.reduce((prev, curr) => {
            return prev + curr;
        }, 0);
    };

    /**
     * 遍历列数据，如果某一列的dataIndex在flatten中匹配中，取出匹配中的flatten[k]对象
     * 判断useCompute的值，是否为需要计算的字段
     * 然后调用calculate计算函数，计算dataSource中每项的dataIndex的合计值
     */
    columns.forEach(({ dataIndex }) => {
        Object.keys(flatten).forEach(key => {
            if (key.indexOf(dataIndex) !== -1) {
                const {
                    schema: { props: { useCompute = false } = {} },
                } = flatten[key];

                if (useCompute) {
                    // sum 是 dataSource 中 每一项的 dataIndex 的合计值
                    const sum = calculate(dataIndex);

                    // 合并至total
                    Object.assign(total, { [dataIndex]: sum });
                }
            }
        });
    });

    // 添加一个合计行
    dataSource.push(total);
};

const DrawerList = ({
    displayList = [],
    dataPath,
    children,
    deleteItem,
    addItem,
    moveItemDown,
    moveItemUp,
    flatten,
    errorFields,
    getFieldsProps,
    schema,
    changeList,
    listData,
}) => {
    const [visible, setVisible] = React.useState(true);
    const { widgets } = useTools();
    const { props = {}, itemProps = {} } = schema;
    const { buttons, ...columnProps } = itemProps;
    const { pagination = {}, foldable, ...rest } = props;

    const paginationConfig = pagination && {
        size: 'small',
        hideOnSinglePage: true,
        ...pagination,
    };

    const currentIndex = useRef(-1);
    const [state, setState] = useSet({
        showDrawer: false,
    });

    const { showDrawer } = state;

    const dataSource = displayList.map((item, index) => ({
        ...item,
        $idx: index,
    }));

    const columns = children
        .map(child => {
            const item = flatten[child];
            const schema = (item && item.schema) || {};
            const { props = {} } = schema;
            const { showInDrawerList = true } = props;
            const _dataIndex = getKeyFromPath(child);
            return showInDrawerList
                ? {
                      dataIndex: _dataIndex,
                      title: schema.required ? (
                          <>
                              <span className="fr-label-required"> *</span>
                              <span>{schema.title}</span>
                          </>
                      ) : (
                          schema.title
                      ),
                      width: FIELD_LENGTH,
                      render: (value, record) => {
                          const childPath = getDataPath(child, [record.$idx]);
                          const errorObj = errorFields.find(item => item.name == childPath) || {};
                          //TODO: 万一error在更深的层，这个办法是find不到的，会展示那一行没有提示。可以整一行加一个红线的方式处理
                          const Widget = widgets[schema.readOnlyWidget];
                          if (Object.is(value, null) || Object.is(value, undefined) || Object.is(value, '')) {
                              return '-';
                          }
                          let _value = getDisplayValue(value, schema);
                          if (_value && typeof _value === 'number' && !isNaN(_value)) {
                              _value = formatThousands(_value);
                          }

                          return (
                              <div>
                                  <div>{Widget ? <Widget value={value} schema={schema} /> : _value}</div>
                                  {errorObj.error && <ErrorMessage message={errorObj.error} schema={schema} />}
                              </div>
                          );
                      },
                      ...columnProps,
                  }
                : null;
        })
        .filter(e => e);

    handleDataSource({ columns, dataSource, flatten });

    columns.push({
        title: '操作',
        key: '$action',
        fixed: 'right',
        width: 120,
        render: (value, record, idx) => {
            // 操作列的的值判断第一列的dataIndex值是否为合计值
            const { dataIndex = '' } = columns[0] || {};
            if (value[dataIndex] === '合计') {
                return '-';
            }
            const index = (value && value.$idx) || 0;
            return (
                <div>
                    <a onClick={() => openDrawer(index)}>编辑</a>
                    {!props.hideDelete && (
                        <Popconfirm
                            title="确定删除?"
                            onConfirm={() => deleteItem(index)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ marginLeft: 8 }}>删除</a>
                        </Popconfirm>
                    )}
                    {!props.hideMove && (
                        <>
                            <ArrowUpOutlined
                                style={{ color: '#1890ff', fontSize: 16, marginLeft: 8 }}
                                onClick={() => moveItemUp(index)}
                            />
                            <ArrowDownOutlined
                                style={{ color: '#1890ff', fontSize: 16, marginLeft: 8 }}
                                onClick={() => moveItemDown(index)}
                            />
                        </>
                    )}
                </div>
            );
        },
    });

    const fieldsProps = getFieldsProps(currentIndex.current);

    const openDrawer = index => {
        currentIndex.current = index;
        setState({
            showDrawer: true,
        });
    };

    const closeDrawer = () => {
        currentIndex.current = -1;
        setState({
            showDrawer: false,
        });
    };

    const handleAdd = () => {
        const newIndex = addItem();
        openDrawer(newIndex);
    };

    return (
        <>
            <div className="w-100 mb2 tr">
                {foldable && (
                    <div className="fr-drawer-icon">
                        {visible ? (
                            <DownOutlined style={{ fontSize: 16 }} onClick={() => setVisible(e => !e)} />
                        ) : (
                            <UpOutlined style={{ fontSize: 16 }} onClick={() => setVisible(e => !e)} />
                        )}
                    </div>
                )}
                {!props.hideAdd && visible && (
                    <Button type="primary" size="small" onClick={handleAdd}>
                        新增
                    </Button>
                )}
                {Array.isArray(props.buttons)
                    ? props.buttons.map((item, idx) => {
                          const { callback, text, html } = item;
                          let onClick = () => {
                              console.log({
                                  value: listData,
                                  onChange: changeList,
                                  schema,
                              });
                          };
                          if (typeof window[callback] === 'function') {
                              onClick = () => {
                                  window[callback]({
                                      value: listData,
                                      onChange: changeList,
                                      schema,
                                  });
                              };
                          }
                          return (
                              <Button key={idx.toString()} style={{ marginLeft: 8 }} size="small" onClick={onClick}>
                                  <span dangerouslySetInnerHTML={{ __html: html || text }} />
                              </Button>
                          );
                      })
                    : null}
            </div>
            <Drawer
                width="600"
                title="编辑"
                placement="right"
                onClose={closeDrawer}
                visible={showDrawer}
                destroyOnClose // 必须要加，currentIndex不是一个state，Core不会重新渲染就跪了
            >
                <div className="fr-container">
                    <Core {...fieldsProps} />
                </div>
            </Drawer>
            {visible && (
                <Table
                    size="small"
                    scroll={{ x: 'max-content' }}
                    columns={columns}
                    dataSource={dataSource}
                    rowClassName={(record, idx) => {
                        const index = record && record.$idx;
                        const hasError = errorFields.find(item => item.name.indexOf(`${dataPath}[${index}]`) > -1);
                        return hasError ? 'fr-row-error' : '';
                    }}
                    rowKey="$idx"
                    pagination={paginationConfig}
                    {...rest}
                />
            )}
        </>
    );
};

export default DrawerList;
