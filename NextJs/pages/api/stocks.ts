import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //get all the stocks that the user has saved
    const { username } = req.query;

    if (!username) {
        res.status(400).json({ error: 'User username is required' });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username.toString(),
            },
            select: {
                stocks: true,
            },
        });

        if (!user) {
            res.status(404).json({ error: `User with username ${username} not found` });
            return;
        }

        res.status(200).json(user.stocks);
    } catch (error: any) {
        console.error('Error fetching user stocks:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch user stocks' });
    }

}