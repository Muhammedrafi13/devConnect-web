import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await axios.post(BASE_URL + "/logout", {}, {
            withCredentials: true
        })
        dispatch(removeUser())
        navigate("/login")

    }

    const handleClickItem = () => {
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement) {
            activeElement.blur();
        }
    };
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">DevConnect</Link>
            </div>
            {user &&
                <div className="flex gap-2">
                    <p className="p-2">Welcome, {user.firstName}</p>
                    <div className="dropdown dropdown-end mx-10">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="ProfilePic"
                                    src={user?.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-30 mt-3 w-52 p-2 shadow">
                            <li onClick={handleClickItem}><Link to={"/profile"} >Profile</Link></li>
                            <li onClick={handleClickItem}><Link to={"/connections"}>Accepted Connections</Link></li>
                            <li onClick={handleClickItem}><Link to={"/request"}>Request Received</Link></li>
                            <li onClick={handleClickItem}><Link to={"/request/sent"}>Pending Request</Link></li>
                            <li><a
                                onClick={() => {
                                    handleLogout();
                                    handleClickItem();
                                }}
                            >Logout</a></li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}

export default NavBar