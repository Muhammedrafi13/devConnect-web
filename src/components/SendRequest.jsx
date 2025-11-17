import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const SentRequests = () => {
    const [sentRequest, setSentRequest] = useState([]);

    const fetchSentRequests = async () => {
        try {
            const requestData = await axios.get(BASE_URL + "/request/sent/interested", {
                withCredentials: true
            });
            setSentRequest(requestData.data.data);
        } catch (error) {
            console.error("Error fetching sent requests:", error);
        }
    };

    useEffect(() => {
        fetchSentRequests();
    }, []);

    if (!sentRequest) return

    if (sentRequest.length === 0) return <h1 className="flex justify-center my-10"> No Pending Requests Found</h1>;


    return (
        <div className="text-center my-10 px-4">
            <h1 className="text-bold text-3xl mb-8">
                Pending Requests
            </h1>

            {sentRequest.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    request.toUserId;

                return (
                    <div
                        key={request._id}
                        className="flex m-4 p-4 rounded-xl bg-base-200 hover:bg-base-300 transition-colors shadow-lg w-full max-w-xl mx-auto items-center"
                    >
                        <div className="flex-shrink-0">
                            <div className="avatar">
                                <div className="w-16 h-16 rounded-full">
                                    <img
                                        alt={firstName + " " + lastName + " profile photo"}
                                        className="object-cover"
                                        src={photoUrl || `https://i.pravatar.cc/150?u=${_id}`}
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
                        <div className="flex-shrink-0 ml-4">
                            <span className="badge badge-info badge-lg">Pending</span>
                        </div>

                    </div>
                );
            })}
        </div>
    );
};
export default SentRequests;