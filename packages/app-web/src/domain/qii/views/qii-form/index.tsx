import { useContext, useState, useEffect } from 'react';
import { useRouteProps, useParams, history } from 'umi';
import { Spin, message } from 'antd';

import LayoutContext from '@/shared/contexts/layout';

import { getOne } from '../../repository';

import EditorViewWidget from './EditorViewWidget';
import style from './style.scss';

export default function QiiForm() {
  const { setPage, setHeaderActions } = useContext(LayoutContext);

  const [loading, setLoading] = useState(false);
  const [entity, setEntity] = useState(null);

  const { meta, path } = useRouteProps();
  const { id } = useParams();

  useEffect(() => {
    setHeaderActions([{
      text: '保存',
      execute: () => history.push(`${path.replace(':id/edit', id)}`),
      primary: true
    }]);

    if (id) {
      setLoading(true);
      getOne({ collection: meta.collection, id })
        .then(res => {
          if (res.success) {
            setPage(res.data);
            setEntity(res.data);
          } else {
            message.error(res.message);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setPage({ title: '新建' });
      setEntity({} as any);
    }
  }, [meta.collection, id]);

  return (
    <div className={style.QiiForm}>
      <Spin size="large" spinning={loading}>
        { entity ? <EditorViewWidget dataSource={entity} /> : null }
      </Spin>
    </div>
  );
}
