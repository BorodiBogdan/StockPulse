import prisma from '../lib/prisma';

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-4xl font-bold">Feed</h1>

      <div className='h-full'>
        {posts.map((post) => (
          <div key={post.id} className="mb-8">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-lg">{post.content}</p>
            <p className="text-sm text-gray-600">By {post.author.name}</p>
          </div>
        ))}
      </div>

    </main>
  );
}
