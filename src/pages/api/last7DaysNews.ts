// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import api from '@/services';

const { newsList } = api;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    console.log(JSON.stringify(newsList));
    const data = await newsList({
        'api-key': 'qgCLmzlOyEuRXnv8cnGQbdzwSkAmZAFi',
    });
    console.log(data);

    res.send(data)
}
