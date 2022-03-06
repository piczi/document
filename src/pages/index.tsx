import Image from 'next/image';
import type { ImageLoaderProps } from 'next/image';
import type { NextPage } from 'next';
import moment from 'moment';
import { Table } from 'antd';
import request from '@/services';
import { useMount, useSetState } from 'react-use';

import { useRequest } from '@/utils/hooks';
import styles from './index.module.css';

const { getJuejinList } = request;

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const Home: NextPage = () => {

  const [state, setState] = useSetState({
    current: 1,
    pageSize: 20,
  });

  const {
    data = {
      data: [],
      count: 0,
    },
    searchParams,
    loading,
    triggerRequest,
  } = useRequest(getJuejinList);

  useMount(() => {
    triggerRequest({
      aid: 2608,
      uuid: 7040058895097021983,
      category_id: '',
      cursor: 0,
      limit: state.pageSize
    });
  });

  const columns = [
    {
      title: '分类',
      dataIndex: 'job_title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '作者',
      dataIndex: 'user_name',
    },
    {
      title: '公司',
      dataIndex: 'company',
    },
    {
      title: '缩略图',
      dataIndex: 'avatar_large',
      render(src: string) {
        return <Image
          loader={myLoader}
          src={src} alt="缩略图" height={40} width={40} />
      }
    },
  ];

  const onPageSizeChange = (num: number, size: number) => {
    triggerRequest({
      ...searchParams,
      limit: num * size,
    });
    setState({
      current: num,
      pageSize: size,
    });
  };

  return (
    <div className={styles.container}>
      <Table
        loading={loading}
        size="small"
        rowKey="user_id"
        scroll={{
          y: 'calc(100vh - 160px)'
        }}
        pagination={{
          size: 'default',
          total: data.count,
          current: state.current,
          pageSize: state.pageSize,
          onChange: onPageSizeChange,
        }}
        dataSource={data.data}
        columns={columns} />
    </div>
  )
}

export default Home
