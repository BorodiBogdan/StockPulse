import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //get all the shared portofolios
    try {
        const p = await prisma.stockWatchList.findMany();
        ;
        var portofolios = await prisma.stockWatchList.findMany({
            select: {
                description: true,
                id: true,
                user: true,
                createdAt: true,
                stock: true,
                comments: true,
            },
        });

        //we should share just the usename of the user
        var modifiedPortofolios = portofolios.map((portofolio) => {
            return {
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
                description: portofolio.description,
            };
        });

        //do not return the user's email or password, just the name

        res.status(200).json(modifiedPortofolios);
    }
    catch (error: any) {
        console.error('Error fetching shared portofolios:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch shared portofolios' });
    }
}