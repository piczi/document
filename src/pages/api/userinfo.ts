// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    userId: number;
    username: string;
    gender: number;
    account: string;
    createTime: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).send({
        userId: 1,
        username: '奔波尔霸',
        gender: 1,
        account: '303318874@qq.com',
        createTime: '2022-03-07 00:11:22',
    })
}
