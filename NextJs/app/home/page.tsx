import StockInfo from '../../components/StockInfo';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Page() {
    const session = await getServerSession(options);
    const username = session?.user?.name || null;
    const stocks: any = [];

    // Use fetch instead of axios
    const response = await fetch(`http://localhost:3000/api/allstocks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        stocks.push(data);
    } else {
        console.error('Failed to fetch stocks');
    }

    console.log(stocks);


    return (
        <div className='max-w-screen overflow-x-hidden min-h-[80vh] lg:h-screen max-h-fit'>
            <div className='h-full'>
                <StockInfo session={session} username={username} stocks={stocks} />
            </div>
        </div>
    );
}
