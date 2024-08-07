'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

interface ClientNavbarProps {
    session: Session | null
}

export default function ClientNavbar({ session }: ClientNavbarProps) {
    return (
        <>
            {session ? (
                <a href='/' className='px-2 py-1 rounded-2xl bg-blue-600 text-white'
                    onClick={async (e) => {
                        e.preventDefault()
                        await signOut({ redirect: true, callbackUrl: '/' })
                    }}
                >log-out</a>
            ) : (
                <Link href='/auth/login' className='px-2 py-1 rounded-2xl bg-blue-600 text-white'>log-in</Link>
            )}
        </>
    )
}
