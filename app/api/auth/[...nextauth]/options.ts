import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "***********" }
            },
            async authorize(credentials) {
                // Hardcoded user credentials for demonstration
                const user = { id: '1', username: 'Smith', password: 'password' };

                console.log('Received credentials:', credentials);

                if (credentials?.username === user.username && credentials?.password === user.password) {
                    console.log('Authentication successful');
                    return { id: user.id, name: user.username, email: `${user.username}@example.com` };
                } else {
                    console.log('Authentication failed');
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login',  // specify your custom login page path
    },
};
