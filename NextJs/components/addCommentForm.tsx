'use client'
import { addComment } from '../actions/actions'
import React from 'react'

export default function AddCommentForm({ session, params }: { session: any, params: { slug: string } }) {
    return (
        <form className="flex flex-col space-y-4"
            onSubmit={async (e) => {
                e.preventDefault();
                const comment = e.currentTarget.comment.value;
                e.currentTarget.comment.value = '';
                await addComment(comment, session.user?.name, params.slug);

            }}
        >
            <textarea
                placeholder="Add a comment..."
                name="comment"
                className="p-4 bg-gray-700 rounded-md text-white outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
            ></textarea>
            <button
                type="submit"
                className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-600"
            >
                Submit Comment
            </button>
        </form>
    )
}
