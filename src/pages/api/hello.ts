// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  total: number;
  pageSize: 10,
  current: number;
  list: {
    jobName: string;
    createTime: number;
    id: number;
  }[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req;
  const timer = setTimeout(() => {
    const list = new Array(body.pageSize).fill(true).map((item, index) => {
      const id = index + 1 + (body.current - 1) * body.pageSize;
      return {
        jobName: `测试名称${id}`,
        createTime: Date.now(),
        id,
      };
    });
    res.status(200).send({
      total: 1000,
      pageSize: body.pageSize,
      current: body.current,
      list,
    })

    clearTimeout(timer);
  }, 1000);

}
