import { Link } from "react-router-dom"


const Banner = () => {
    return (
        <div>
            <div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 md:w-1/2">
                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/online-map-5739626-4817109.png?f=webp" alt="tinywiki" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-center items-center md:items-start md:w-1/2">
                        <div className="mb-8 text-center md:text-left">
                            <h1 className="text-4xl font-semibold font-serif mb-4">
                                <span className="text-red-600">Map Me</span>: Effortlessly Discover Places Around You
                            </h1>
                            <p className="text-gray-600">
                                Finding the right location can often be a hassle, whether you're looking for a restaurant,
                                a park, or any place of interest. If you're someone who values efficiency and dislikes
                                manually searching for locations, then LocationFinder is the perfect app for you!
                                LocationFinder allows you to search for places around you, providing detailed information
                                and directions to your desired destination quickly and effortlessly.


                            </p>
                        </div>
                        <div className="mb-4 md:mb-0 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner