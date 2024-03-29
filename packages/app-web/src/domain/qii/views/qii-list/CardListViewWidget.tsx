import { useRouteProps, history } from 'umi';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Row, Col, Card, Pagination, Modal } from 'antd';

import type { ListViewWidgetProps } from './typing';
import style from './style.scss';

const defaultBanner = require('@/shared/images/default-banner.jpg');

function createActionHandler<R = Record<string, any>>(record: R, callback: (record: R) => void) {
  return (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    callback && callback(record);
  };
}

function CardListViewWidget({ dataSource = [], pagination, onDelete }: ListViewWidgetProps) {
  const routeProps = useRouteProps();

  const gotoDetail = (item: any) => history.push(`${routeProps.path}/${item.id}`);
  const gotoEdit = (item: any) => history.push(`${routeProps.path}/${item.id}/edit`);
  const removeEntity = (item: any) => Modal.confirm({
    title: `确定要删除${routeProps.meta && routeProps.meta.text || ''}《${item.title || item.key}》？`,
    onOk: () => {
      onDelete && onDelete(item);
    }
  });

  return (
    <div className={style.CardListViewWidget}>
      <div className={style['CardListViewWidget-list']}>
        <Row gutter={16}>
          {dataSource.map((item: any) => (<Col span={6} xxl={4} key={item.key}>
            <Card
              cover={(
                <div className={style['CardListViewWidget-cover']}>
                  <img src={item.cover || defaultBanner} object-fit="cover" />
                  <div style={{ backgroundImage: `url("${item.cover || defaultBanner}")` }}></div>
                </div>
              )}
              hoverable
              actions={[
                <EditOutlined key="edit" onClick={createActionHandler(item, gotoEdit)} />,
                <DeleteOutlined key="delete" onClick={createActionHandler(item, removeEntity)} />
              ]}
              onClick={createActionHandler(item, gotoDetail)}
            >
              <Card.Meta title={item.title} description={item.description || '暂无'} />
            </Card>
          </Col>))}
        </Row>
      </div>
      {pagination && pagination.total && pagination.total > pagination.pageSize! ? (
        <div className={style['CardListViewWidget-pagination']}><Pagination {...pagination} /></div>
      ) : null}
    </div>
  );
}

export default CardListViewWidget;
