import { PrismaClient } from '@prisma/client';

// Add `global` declaration to avoid TypeScript errors when using global variables
declare global {
    // This declares a global type for PrismaClient in the global object
    var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// In production mode, instantiate a new PrismaClient
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // In development mode, reuse the PrismaClient instance across hot-reloads
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
