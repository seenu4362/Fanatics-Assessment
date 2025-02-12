import { memo } from "react"
interface ISkeleton{
    numberOfGrids: number
}
const Skeleton = ({numberOfGrids}: ISkeleton) => {
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array(numberOfGrids).fill(0).map((_, index) => (
                        <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg bg-white m-4 animate-pulse">
                            <div className="w-full h-48 bg-gray-300"></div>
                            <div className="px-6 py-4">
                                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
        </>
    )

}
export default memo(Skeleton);