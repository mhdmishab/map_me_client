import React from "react";
import { Link, useLocation} from "react-router-dom";

const NavBar = () => {
    
    const location = useLocation();

    return (
        <div>
            <nav className="bg-white bg-opacity-75 rounded-full  ml-10 mr-10 mt-6 border-gray-200 shadow-md mb-5">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link className="flex items-center">
                        <img src="https://png.pngtree.com/png-vector/20230623/ourmid/pngtree-map-icon-free-vector-location-symbol-png-image_7313335.png" className="h-8 mr-3" alt="logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                            Map Me
                        </span>
                    </Link>
                    <div className="flex md:order-2">
                        <button
                            type="button"
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition w-full md:w-auto"
                        >
                            {(location.pathname=="/login")?<Link to={"/"}>Home</Link>:<Link to={"/login"}>Login</Link>}
                        </button>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavBar