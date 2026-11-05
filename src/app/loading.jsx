const Loading = () => {
    return (
        <main className="min-h-screen animate-pulse bg-[#f0f5f1] px-4 py-8">
            <div className="mx-auto max-w-6xl space-y-5">
                <div className="h-28 rounded-2xl bg-gray-200" />

                <div className="h-20 rounded-2xl bg-gray-200" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="h-48 rounded-2xl bg-gray-200" />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Loading;