import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

export default async function Page() {
    const session = await getServerSession(options);
    const user = session?.user?.name || "";

    const content = await fetch(process.env.FLASK_SERVER + '/api/posts?' + user).then((res) => res.json());

    return (
        <main className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen px-4 py-16 pt-32">
            <section className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-center">Market News</h1>
                    <p className="text-lg md:text-xl text-center text-gray-400 mt-4">
                        Your go-to source for the latest updates and insights on market trends, stock symbols, and financial news.
                    </p>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {content.map((post: any) => (
                        <article key={post.title} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                                <div className="text-sm text-gray-500 mb-4">
                                    {new Date(post.date).toLocaleDateString()} - Symbols: {post.symbols.join(", ")}
                                </div>
                                <p className="text-gray-300 mb-6">
                                    {post.content.length > 200 ? post.content.substring(0, 200) + "..." : post.content}
                                </p>
                                <Link href={post.link} target="_blank" className="text-blue-400 hover:text-blue-500 font-semibold">
                                    Read full story &rarr;
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </section>
        </main>
    );
}
