import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../../lib/hashPassword";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "***********" }
            },
            async authorize(credentials) {
                try {
                    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
                    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`);
                    const users = await response.json();

                    if (!response.ok) {
                        throw new Error('Failed to fetch users');
                    }

                    // Iterate over the fetched users to find a match
                    const user = users.find((user: { username: string, password: string }) =>
                        user.username === credentials?.username && verifyPassword(credentials?.password, user.password)
                    );

                    if (user) {
                        console.log('Authentication successful');
                        return { id: user.id, name: user.username, email: `${user.username}@example.com` };
                    } else {
                        console.log('Authentication failed');
                        return null;
                    }
                } catch (error) {
                    console.error('Error in authorize function:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',  // specify your custom login page path
    },
};
