import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [age, setAge] = useState(user?.age);
    const [about, setAbout] = useState(user?.about);
    const [gender, setGender] = useState(user?.gender);
    const [errorMessage, setErrorMessage] = useState("");
    const [updated, setUpdated] = useState(false);
    const dispatch = useDispatch();

    const handleEdit = async () => {
        try {
            setErrorMessage("");
            setUpdated(false);
            const update = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                gender,
                age,
                about
            }, {
                withCredentials: true
            })
            dispatch(addUser(update.data.data))
            setUpdated(true);
            const timerId = setTimeout(() => {
                setUpdated(false);
            }, 3000)

            return () => clearTimeout(timerId);
        } catch (error) {

            setErrorMessage(error?.response?.data);
        }


    }
    return (
        <>
            <div className='flex flex-col md:flex-row justify-center items-start py-8 px-4 lg:gap-12'>
                <div className='w-full max-w-sm md:max-w-md mb-8 md:mb-0'>
                    <div className="card bg-base-300 shadow-xl w-full">
                        <div className="card-body">
                            <h2 className="card-title justify-center text-2xl md:text-xl font-bold mb-4">Edit Profile</h2>
                            <div className='space-y-4'>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">First Name</span>
                                    </label>
                                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-neutral w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Last Name</span>
                                    </label>
                                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-neutral w-full" />
                                </div>
                                <div className='flex gap-4'>
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="label-text font-semibold">Age</span>
                                        </label>
                                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="input input-neutral w-full" />
                                    </div>
                                    <div className='w-1/2'>
                                        <label className="label">
                                            <span className="label-text font-semibold">Gender</span>
                                        </label>
                                        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input input-neutral w-full" />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Photo URL</span>
                                    </label>
                                    <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="input input-neutral w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">About</span>
                                    </label>
                                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="textarea textarea-neutral h-24 w-full" placeholder="A brief description about yourself..."></textarea>
                                </div>

                                <span className='text-error text-sm block mt-2'>{errorMessage}</span>
                            </div>

                            <div className="card-actions justify-center mt-6">
                                <button className="btn btn-primary btn-wide" onClick={handleEdit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.828 4.243l1.414 1.414-7.586 7.586-1.414-1.414 7.586-7.586z" /></svg>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full max-w-sm md:max-w-xs'>
                    <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
                </div>
            </div>
            {
                updated && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>Profile updated successfully.</span>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default EditProfile