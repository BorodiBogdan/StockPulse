import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //we have the id of the portfolio, so we need to get it

    const { id } = req.query;

    if (!id) {
        res.status(400).json({ error: 'Portfolio id is required' });
        return;
    }

    try {
        var portofolio = await prisma.stockWatchList.findUnique({
            where: {
                id: id.toString(),
            },
            select: {
                id: true,
                user: true,
                createdAt: true,
                stock: true,
                comments: true,
            },
        });

        if (!portofolio) {
            res.status(404).json({ error: 'Portfolio not found' });
            return;
        }

        //we should share just the usename of the user
        var modifiedPortofolio = {
            user: portofolio.user.username,
            stock: portofolio.stock.map((stock) => {
                return {
                    name: stock.name,
                    symbol: stock.symbol,
                    createdAt: stock.createdAt,
                };
            }),
            createdAt: portofolio.createdAt,
            comments: portofolio.comments,
            id: portofolio.id,
        };

        //do not return the user's email or password, just the name

        res.status(200).json(modifiedPortofolio);
    }
    catch (error: any) {
        console.error('Error fetching shared portofolios:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch shared portofolios' });
    }
}