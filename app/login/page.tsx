
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession();

    if (session) {
        redirect('/');
    }
    return (
        <div className='bg-white h-screen flex items-center justify-center'>
            <form className=''>
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>username</label>
                    <input type='username' name='username' id='username'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Username' />
                </div>
                <div className='mb-6'>
                    <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                    <input type='password' name='password' id='password'
                        className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='******************' />
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='button'>
                        Sign In
                    </button>
                    <Link href="/register" className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>
                        Create an Account
                    </Link>
                </div>
            </form>
        </div>
    )
}