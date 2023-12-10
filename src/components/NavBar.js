import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();
    const handleLogOut =()=>{
        localStorage.removeItem('Token');
        navigate('/login');
        window.location.reload();
    }
    return (
        <div>
            <nav className='flex justify-around p-4 bg-slate-900 text-white'>
                <Link className="hover:text-blue-500" to="/">
                    Home
                </Link>
                <Link className="hover:text-blue-500" to='/categorie'>
                    Category
                </Link>
                <Link className="hover:text-blue-500" to='/type'>
                    Types
                </Link>
                <Link className="hover:text-blue-500" to='/listingspage'>
                    Listings
                </Link>
                <button className="hover:text-blue-500" onClick={handleLogOut}>
                    Logout
                </button>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar