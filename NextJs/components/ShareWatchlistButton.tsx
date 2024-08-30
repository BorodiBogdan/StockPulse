'use client'
import { shareStockWatchList } from '../actions/actions'
import React from 'react'

interface Props {
    username: string
}

const ShareWatchlistButton: React.FC<Props> = ({ username }: Props) => {
    return (
        <div className='absolute bottom-0 flex items-center justify-center w-screen'>
            <button
                onClick={() => shareStockWatchList(username)}
                className="bg-blue-500 text-white p-2 rounded-mdab hover:bg-blue-600 mt-4">Share Watchlist</button>
        </div>
    )
}

export default ShareWatchlistButton
