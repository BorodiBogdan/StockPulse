import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //return all the stocks from the database in json format

        const stocks = await prisma.stock.findMany({
            select: {
                symbol: true,
                name: true,
            },
        });

        res.status(200).json(stocks);
    } catch (error: any) {
        console.error('Error fetching user stocks:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch user stocks' });
    }
}