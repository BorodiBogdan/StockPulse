'use server'
import prisma from "../lib/prisma";

export async function saveStock(symbol: string, username: string | null) {
    if (!username || username === ' ' || username === null) {
        throw new Error('Username is missing');
    }
    if (!symbol || symbol === ' ' || symbol === null) {
        throw new Error('Stock symbol is missing');
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            stocks: true,
        },
    });

    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }

    // Find the stock in the database
    const stock = await prisma.stock.findUnique({
        where: {
            symbol: symbol,
        },
    });

    if (!stock) {
        throw new Error(`Stock with symbol ${symbol} not found`);
    }
    //first check if the user already has the stock

    const userStocks = user.stocks;

    for (let i = 0; i < userStocks.length; i++) {
        if (userStocks[i].symbol === symbol) {
            throw new Error(`User already has stock with symbol ${symbol}`);
        }
    }

    // Add the stock to the user's list of stocks
    await prisma.user.update({
        where: {
            id: user.id, // Assuming 'id' is the primary key for the User
        },
        data: {
            stocks: {
                connect: {
                    id: stock.id, // Assuming 'id' is the primary key for the Stock
                },
            },
        },
    });

    // Optionally, you can close the Prisma client if needed
    // await prisma.$disconnect();
}
