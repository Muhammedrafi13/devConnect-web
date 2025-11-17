import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store?.connections)


    const fetchConnections = async () => {
        try {
            const connectionData = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            })
            dispatch(addConnections(connectionData.data.connections))
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        fetchConnections();
    }, [])


    if (!connections) return;

    if (connections.length === 0) return <h1 className="flex justify-center my-10"> No Connection Found</h1>;


    return (
        <div className="text-center my-10 px-4">
            <h1 className="text-bold text-3xl mb-8">Connections</h1>

            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    connection;

                return (
                    <div
                        key={_id}
                        className="flex m-4 p-4 rounded-xl bg-base-200 hover:bg-base-300 transition-colors shadow-lg w-full max-w-xl mx-auto justify-between items-center"
                    >
                        <div className="flex-shrink-0">
                            <div className="avatar">
                                <div className="w-16 h-16 rounded-full">
                                    <img
                                        alt={firstName + " " + lastName + " profile photo"}
                                        className="object-cover"
                                        src={photoUrl}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-left mx-4 flex-grow overflow-hidden min-w-0">
                            <h2 className="font-semibold text-2xl truncate">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p className="text-sm opacity-70 mb-1">
                                {age + ", " + gender}
                            </p>}
                            <p className="text-sm opacity-80 line-clamp-1">
                                {about || "No profile description available."}
                            </p>
                        </div>

                        <Link to={"/chat/" + _id} className="flex-shrink-0 ml-4">
                            <button className="btn btn-sm btn-primary min-w-20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 10.99 17.997 5.884A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118v5.696A2 2 0 0116 16H4a2 2 0 01-2-2.182V8.118l8 4 8-4z" /></svg>
                                Chat
                            </button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
export default Connection;