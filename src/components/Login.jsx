import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            const result = await axios.post(BASE_URL + "/login", {
                emailId: emailId,
                password: password
            }, {
                withCredentials: true
            })
            dispatch(addUser(result.data));
            navigate("/");
        } catch (err) {
            setErrorMessage(err.response.data)
        }

    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            navigate("/profile");
        } catch (err) {
            setErrorMessage(err?.response?.data || "Something went wrong");
        }
    };
    


    return (
        <div className='flex justify-center my-20'>
            <div className="card bg-base-300 w-96 shadow-sm ">
                <div className="card-body">
                    <h2 className="card-title justify-center">     {isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div>
                        {
                            !isLoginForm && (
                                <>
                                    <fieldset className="fieldset my-2">
                                        <legend className="fieldset-legend">First Name *</legend>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input input-neutral" />
                                    </fieldset>
                                    <fieldset className="fieldset my-2">
                                        <legend className="fieldset-legend">Last Name *</legend>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input input-neutral" />
                                    </fieldset>

                                </>
                            )
                        }
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Email ID *</legend>
                            <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="input input-neutral" />
                        </fieldset>
                        <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Password *</legend>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-neutral" />
                        </fieldset>
                        <span className='text-red-500'>{errorMessage}</span>
                    </div>

                    <div className="card-actions justify-center m-2">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>
                    <p
                        className="m-auto cursor-pointer py-2"
                        onClick={() => setIsLoginForm((value) => !value)}
                    >
                        {isLoginForm
                            ? "New User? Signup Here"
                            : "Existing User? Login Here"}
                    </p>
                </div>
            </div>



        </div>
    )
}

export default Login