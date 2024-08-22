import React from 'react';
import { getServerSession } from 'next-auth/next';
import { options } from '../app/api/auth/[...nextauth]/options'; // Adjust the import path if necessary
import NavbarClient from './NavbarClient';

export default async function NavbarServer() {
    const session = await getServerSession(options);

    return <NavbarClient session={session} />;
}
