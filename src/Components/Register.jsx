
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../firebase.init';
import { NavLink } from 'react-router';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            toast.success(`Signup successful! Welcome ${user.email}`);
        } catch (error) {
            toast.error(`Signup failed: ${error.message}`);
        }
    };

    return (
        <div>
            <section className="bg-white">
                <div className="lg:grid mt-20 lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt=""
                            src="https://htmldemo.net/boighor/boighor/images/bg/4.jpg"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">
                            <NavLink to="/" className="block text-white" >
                                <span className="sr-only">Home</span>
                                <img className='w-[5rem]' src="https://play-lh.googleusercontent.com/CTGcUtjhvbNAcxnncwCdpZ6oR6u5Mn4xyXzO8S0GD8hS6-EibIQRJK3YXE6X3bXrwviw" alt="" />
                            </NavLink>

                            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome to Registration System
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Boighor Registration System is a user-friendly platform designed to register book enthusiasts, enabling seamless access to library resources.
                            </p>
                        </div>
                    </section>

                    <main
                        className="flex dark:bg-gray-800 items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl p-10 rounded-xl shadow-xl lg:max-w-3xl">
                            <p className='text-center font-semibold text-3xl md:text-4xl text-blue-500 mb-10'>Register</p>
                            <form onSubmit={handleRegister} className="mt-8 grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="FirstName"
                                        name="first_name"
                                        className="border-[#e5eaf2] w-full border-b outline-none px-4 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="LastName" className="block text-sm font-medium dark:text-gray-400 mb-2 text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="LastName"
                                        name="last_name"
                                        className="border-[#e5eaf2] border-b outline-none px-4 w-full py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="Email" className="block dark:text-gray-400 mb-2 text-sm font-medium text-gray-700"> Email </label>
                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        className="border-[#e5eaf2] border-b outline-none px-4 w-full py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="Password" className="block dark:text-gray-400 mb-2 text-sm font-medium text-gray-700"> Password </label>
                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="PasswordConfirmation" className="block text-sm font-medium dark:text-gray-400 mb-2 text-gray-700">
                                        Password Confirmation
                                    </label>
                                    <input
                                        type="password"
                                        id="PasswordConfirmation"
                                        name="password_confirmation"
                                        className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    />
                                </div>



                                <div className="col-span-6">
                                    <p className="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <a  className="text-gray-700 dark:text-gray-400 underline"> terms and conditions </a>
                                        and
                                        <a  className="text-gray-700 dark:text-gray-400 underline"> privacy policy</a>.
                                    </p>
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Create an account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <NavLink to="/login" className="text-gray-700 dark:text-gray-400 underline">Log in</NavLink>.
                                    </p>
                                </div>

                            </form>
                        </div>
                    </main>
                </div>
            </section >
        </div >
    );
}
export default Register;