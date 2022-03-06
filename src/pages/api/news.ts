import api from '@/services';

const { juejinList } = api;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { body } = req;
    const data = await juejinList(body);
    res.send(data);
}
