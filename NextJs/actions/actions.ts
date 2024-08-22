'use server'
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { verifyPassword, hashPassword } from "../lib/hashPassword";

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
}

export async function deleteStock(symbol: string, username: string | null) {
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

    // Remove the stock from the user's list of stocks
    await prisma.user.update({
        where: {
            id: user.id, // Assuming 'id' is the primary key for the User
        },
        data: {
            stocks: {
                disconnect: {
                    id: stock.id, // Assuming 'id' is the primary key for the Stock
                },
            },
        },
    });

    revalidatePath('/stocks');
}

export async function changePassword(username: string, old_password: string, new_password: string): Promise<void> {
    // Check if old and new passwords are provided and valid
    if (!old_password || old_password.trim() === '') {
        throw new Error('Old password is missing');
    }
    if (!new_password || new_password.trim() === '') {
        throw new Error('New password is missing');
    }

    // Fetch user from the database based on the username
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
            password: true, // Fetching the hashed password for verification
        },
    });

    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }

    // Verify if the old password matches the one in the database
    const isOldPasswordValid = await verifyPassword(old_password, user.password);

    if (!isOldPasswordValid) {
        throw new Error('Old password is incorrect');
    }

    // Hash the new password
    const hashedPassword = await hashPassword(new_password);

    // Update the user's password in the database
    await prisma.user.update({
        where: {
            id: user.id, // Use the unique ID of the user for the update operation
        },
        data: {
            password: hashedPassword,
        },
    });

    return Promise.resolve();
}