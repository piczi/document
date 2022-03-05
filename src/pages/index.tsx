import type { NextPage } from 'next';
import moment from 'moment';
import { Table } from 'antd';
import request from '@/services';
import { useMount } from 'react-use';

import { useRequest } from '@/utils/hooks';
import styles from './index.module.css';

const { sayHello, getUserinfo } = request;

const Home: NextPage = () => {

  const {
    data = {
      list: [],
      total: 0,
      current: 1,
      pageSize: 10,
    },
    searchParams,
    loading,
    triggerRequest,
  } = useRequest(sayHello);

  useMount(() => {
    triggerRequest({
      current: 1,
      pageSize: 50,
    });
    getUserinfo().then((res: Record<string, any>) => {
      console.log('用户信息：', res);
    });
  });

  const columns = [
    {
      title: '作业名称',
      dataIndex: 'jobName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (value: number) => moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
  ];

  const onPageSizeChange = (num: number, size: number) => {
    triggerRequest({
      ...searchParams,
      current: num,
      pageSize: size,
    });
  };

  return (
    <div className={styles.container}>
      <Table
        loading={loading}
        size="small"
        rowKey="id"
        scroll={{
          y: 'calc(100vh - 160px)'
        }}
        pagination={{
          size: 'default',
          total: data.total,
          current: data.current,
          pageSize: data.pageSize,
          onChange: onPageSizeChange,
        }}
        dataSource={data.list}
        columns={columns} />
    </div>
  )
}

export default Home
