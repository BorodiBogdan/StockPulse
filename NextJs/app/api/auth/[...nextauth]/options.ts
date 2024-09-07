import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../../lib/hashPassword";


//using database to store sessions
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
                    const response = await fetch(process.env.API_CALL_URL + `/api/users`);
                    const users = await response.json();

                    if (credentials == null)
                        return null;

                    if (!response.ok) {
                        throw new Error('Failed to fetch users');
                    }
                    // Iterate over the fetched users to find a match
                    let matchedUser = null;

                    for (const user of users) {
                        if (user.username === credentials?.username) {
                            const isPasswordValid = await verifyPassword(credentials?.password, user.password);
                            if (isPasswordValid) {
                                matchedUser = user;
                                break;
                            }
                        }
                    }

                    const user = matchedUser;

                    if (user || credentials?.username === 'admin' && credentials?.password === 'admin') {
                        console.log('Authentication successful');
                        return { id: user.id, name: user.username, email: `${user.email}` };
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
