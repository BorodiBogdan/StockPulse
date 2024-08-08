import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../lib/hashPassword';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    } else if (req.method === 'POST') {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                return res.status(400).json({ error: 'Email, username, and password are required' });
            }

            const hashedPassword = await hashPassword(password);

            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            if (error instanceof Error) {
                if ((error as any).code === 'P2002') {
                    // Handle unique constraint error (e.g., email or username already exists)
                    res.status(409).json({ error: 'Email or username already exists' });
                } else {
                    res.status(500).json({ error: error.message });
                }
            } else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
