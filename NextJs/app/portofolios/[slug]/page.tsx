// pages/portfolio/[slug].tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';
import { addComment } from '../../../actions/actions';
import AddCommentForm from '../../../components/addCommentForm';

// Interface for the portfolio data
interface Portfolio {
    id: string;
    user: string;
    stock: {
        id: string;
        symbol: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }[];
    createdAt: string;
    comments: string[];
}

// Main Component Without Any Hooks
export default async function PortfolioPage({ params }: { params: { slug: string } }) {
    const session = await getServerSession(options);
    // Get the portfolio data from the API
    const data = await fetch(`https://activity-finder-roan.vercel.app/api/portfolio?id=${params.slug}`).then((res) => res.json());

    if (!data.stock)
        return notFound();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 pt-28">
            <div className="container mx-auto">
                <div className="mb-8">
                    <Link href="/portofolios">
                        <button className="text-blue-400 hover:text-blue-600">
                            ← Back to Latest Portfolios
                        </button>
                    </Link>
                </div>

                {/* Portfolio Details */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h1 className="text-3xl font-bold text-blue-400 mb-4">{data.user}'s Portfolio</h1>
                    <p className="text-gray-400 text-sm mb-4">
                        Shared on: {new Date(data.createdAt).toLocaleDateString()}
                    </p>

                    <div className="space-y-2">
                        <h3 className="text-lg text-white mb-2">Stocks:</h3>
                        {data.stock.length > 0 ? (
                            data.stock.map((stock: any, idx: number) => (
                                <p key={idx} className="text-gray-300">
                                    {stock.name} ({stock.symbol})
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-300">No stocks shared.</p>
                        )}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4">Comments</h2>

                    {/* Existing Comments */}
                    <div className="space-y-4 mb-6">
                        {data.comments.length > 0 ? (
                            data.comments.map((comment: string, index: number) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-md">
                                    <p className="text-gray-300">{comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300">No comments yet. Be the first to comment!</p>
                        )}
                    </div>

                    {/* Add Comment Form */}
                    {session &&
                        <div>
                            <AddCommentForm session={session} params={params} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );

}
