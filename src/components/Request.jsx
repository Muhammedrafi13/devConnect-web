import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) { }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) { }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
<div className="text-center my-10 px-4">
        <h1 className="text-bold text-3xl mb-8">Connection Requests</h1>

        {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
                request.fromUserId; 

            return (
                <div
                    key={request._id} 
                    className="flex m-4 p-4 rounded-xl bg-base-200 hover:bg-base-300 transition-colors shadow-md w-full max-w-xl mx-auto justify-between items-center"
                >
                    <div className="flex-shrink-0">
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-full">
                                <img
                                    alt={firstName + " " + lastName + " profile photo"}
                                    className="object-cover"
                                    src={photoUrl || "https://i.pravatar.cc/150?u=" + _id} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-left mx-4 flex-grow overflow-hidden min-w-0">
                        <h2 className="font-semibold text-xl md:text-2xl truncate">
                            {firstName + " " + lastName}
                        </h2>
                        {age && gender && <p className="text-sm opacity-70 mb-1">
                            {age + ", " + gender}
                        </p>}
                        <p className="text-sm opacity-80 line-clamp-1"> 
                            {about || "No profile description available."}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 ml-4 flex-shrink-0">
                        <button
                            className="btn btn-sm btn-outline btn-error min-w-20"
                            onClick={() => reviewRequest("rejected", request._id)}
                        >
                            Reject
                        </button>
                        <button
                            className="btn btn-sm btn-success min-w-20"
                            onClick={() => reviewRequest("accepted", request._id)}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            );
        })}
    </div>
  );
};
export default Request;