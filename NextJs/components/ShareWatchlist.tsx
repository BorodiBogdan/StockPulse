'use client'
import { shareStockWatchList } from '../actions/actions'
import React, { useRef } from 'react'

interface Props {
    username: string
}

const ShareWatchlist: React.FC<Props> = ({ username }: Props) => {
    const [error, setError] = React.useState('')
    const textarea = useRef<HTMLTextAreaElement>(null)
    return (

        <div className='flex items-center justify-center flex-col mt-12'>
            <p className="text-2xl font-bold text-blue-400 mb-4 text-center">Share Your Portfolio</p>
            <p className="text-lg text-gray-400 mb-2 text-center max-w-md">
                Enter a description to share your portfolio with others.
            </p>
            <textarea
                className="bg-gray-900 p-4 rounded-lg shadow-lg w-full h-40 max-w-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter your description here..."
                ref={textarea}
                maxLength={200}
            />
            {error && <p className="text-red-500 mt-2 text-center px-2">{error}</p>}
            <div>
                <button
                    onClick={async () => {
                        if (textarea.current?.value) {
                            try {
                                textarea.current.value = ''
                                await shareStockWatchList(username, textarea.current?.value)

                            } catch (e: any) {
                                console.error(e.message)
                                setError(e.message)
                            }
                        }
                    }
                    }
                    className="bg-blue-500 text-white p-2 rounded-mdab hover:bg-blue-600 mt-4">Share Portfolio</button>
            </div>
        </div>

    )
}

export default ShareWatchlist
