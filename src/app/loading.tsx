export default function Loading() {
    return (
        <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl space-y-8 animate-pulse">
                {/* Header Skeleton */}
                <div className="space-y-4">
                    <div className="h-12 bg-base-content/10 rounded-xl w-1/3"></div>
                    <div className="h-6 bg-base-content/5 rounded-lg w-1/2"></div>
                </div>

                {/* Content Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-base-content/5 border border-base-content/10 rounded-2xl p-6 space-y-4">
                            <div className="h-40 bg-base-content/10 rounded-xl w-full"></div>
                            <div className="space-y-2">
                                <div className="h-6 bg-base-content/10 rounded-lg w-3/4"></div>
                                <div className="h-4 bg-base-content/5 rounded-lg w-full"></div>
                                <div className="h-4 bg-base-content/5 rounded-lg w-5/6"></div>
                            </div>
                            <div className="pt-4 flex gap-2">
                                <div className="h-8 bg-base-content/10 rounded-full w-16"></div>
                                <div className="h-8 bg-base-content/10 rounded-full w-20"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
