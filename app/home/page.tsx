import StockInfo from '../../components/StockInfo';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function Page() {
    const session = await getServerSession(options);
    const username = session?.user?.name || null;

    return (

        <div className='max-w-screen overflow-x-hidden min-h-[80vh] lg:h-screen max-h-fit'>
            <div className='h-full'>
                <StockInfo session={session} username={username} />
            </div>

        </div>

    );
};

