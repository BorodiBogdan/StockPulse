'use client'
import React from 'react'
import { deleteStock } from '../actions/actions'
import { revalidatePath } from 'next/cache'

interface Props {
    symbol: string
    username: string
}

const DeleteStockButton: React.FC<Props> = ({ symbol, username }) => {
    return (
        <button
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => {
                deleteStock(symbol, username,)
            }}
        >
            Delete Stock
        </button>
    )
}

export default DeleteStockButton
