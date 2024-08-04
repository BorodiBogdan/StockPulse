"use client"; // Add this directive at the top of the file

import React, { useState, useEffect } from 'react';
import { Post } from '@prisma/client';

interface PostWithAuthor extends Post {
  author: {
    name: string | null;
  } | null;
}

async function fetchPosts(): Promise<PostWithAuthor[]> {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  return data;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center gap-8 p-24">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-4xl font-bold">Feed</h1>

      <div className="h-full">
        {posts.map((post) => (
          <div key={post.id} className="mb-8">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-lg">{post.content}</p>
            <p className="text-sm text-gray-600">
              By {post.author ? post.author.name : "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
