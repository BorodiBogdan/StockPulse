
import { getServerSession } from 'next-auth/next';
import { options } from '../app/api/auth/[...nextauth]/options'; // Adjust the import path if necessary

interface StockData {
    symbol: string;
    name: string;
}


export default async function SessionButton({ stockData }: any) {
    const session = await getServerSession(options);

    return (
        session ? (

            <div className='flex justify-center mt-6'>
                <button className='px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg'>
                    Save Stock
                </button>
            </div>

        ) : (
            null)

    )
}
