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

export async function shareStockWatchList(username: string, description: string) {
    if (!username || username === ' ' || username === null) {
        throw new Error('Username is missing');
    }

    if (!description || description === ' ' || description === null)
        description = 'No description provided';

    // Get the data from the external API
    let watchList = await fetch(process.env.FLASK_SERVER + "/api/home?username=" + username).then((res) => res.json());
    revalidatePath('/portofolios');

    //if the user has a shared a watchlist in the last 24 hours, we will not allow them to share another one
    const watchListShared = await prisma.stockWatchList.findFirst({
        where: {
            user: {
                username: username,
            },
            createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        },
    });

    if (watchListShared) {
        throw new Error('User has already shared a watchlist in the last 24 hours');
    }

    // Convert `createdAt` and `updatedAt` to Date objects
    watchList.createdAt = new Date(watchList.createdAt);
    watchList.updatedAt = new Date(watchList.updatedAt);

    // Use `Promise.all` to await all asynchronous `findUnique` calls and extract the stock symbols
    const stockSymbols = await Promise.all(
        watchList.stocks.map(async (stock: any) => {
            // Find the stock in the database
            let stockData = await prisma.stock.findUnique({
                where: {
                    symbol: stock.symbol,
                },
            });

            // If stock exists, return its ID or symbol to use for `connect`
            if (stockData) {
                revalidatePath('/portofolios');
                return stockData
            } else {
                // Handle the case where the stock is not found
                throw new Error(`Stock with symbol ${stock.symbol} not found`);
            }
        })
    );

    // Add the watchlist to the database with `connect`
    await prisma.stockWatchList.create({
        data: {
            //we need to connect the user to the watchlist
            user: {
                connect: {
                    username: username,
                },
            },
            createdAt: watchList.createdAt,
            updatedAt: watchList.updatedAt,
            stock: {
                connect: stockSymbols, // Connect existing stocks to the watchlist
            },
            description: description,
        },
    });

    return Promise.resolve();
}
export async function addComment(comment: string, username: string | null | undefined, idOfTheWatchList: string) {
    if (!username || username === ' ' || username === null) {
        throw new Error('Username is missing');
    }
    if (!comment || comment === ' ' || comment === null) {
        return;
    }
    if (!idOfTheWatchList || idOfTheWatchList === ' ' || idOfTheWatchList === null) {
        throw new Error('Stock ID is missing');
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
        },
    });

    if (!user) {
        throw new Error(`User with username ${username} not found`);
    }

    // Find the stockWatchList in the database
    const stock = await prisma.stockWatchList.findUnique({
        where: {
            id: idOfTheWatchList,
        },
    });

    if (!stock) {
        throw new Error(`Stock with id ${idOfTheWatchList} not found`);
    }

    // Create the comment object, ensuring the foreign key is correctly assigned

    // Add the comment to the stock watchlist

    await prisma.comment.create({
        data:
        {
            watchList: {
                connect: {
                    id: idOfTheWatchList,
                },
            },
            description: comment,
            username: username,
            createdAt: new Date(),
        }
    });
    revalidatePath('/portofolios/' + idOfTheWatchList);
}
