// components/Loading.tsx (Client Component)
export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50 h-screen w-screen mt-20">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 mb-4"></div>

                {/* Loading text */}
                <p className="text-xl text-gray-700">Loading, please wait...</p>
            </div>
        </div>
    );
}
