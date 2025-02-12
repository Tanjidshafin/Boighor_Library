import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, provider } from "../../firebase.init";
import { AppContext } from "../Context/AppContext";
import { NavLink, useLocation, useNavigate } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(AppContext);
    const from = location.state?.from || "/";

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User  Info:", user);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            toast.success(`Welcome back, ${user.email}!`);
            navigate(from);
        } catch (error) {
            console.error("Email Sign-In Error:", error);
            toast.error("Failed to sign in with email. Please check your credentials.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User  Info:", user);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            toast.success(`Welcome, ${user.displayName || "User  "}!`);
            navigate(from);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            toast.error("Failed to sign in with Google: " + error.message);
        }
    };

    return (
        <div className="flex justify-center mt-20 md:my-32">
            <div className="max-w-3xl bg-white dark:bg-gray-800 p-6 shadow-md sm:px-8 sm:py-10 lg:px-12 lg:py-16 dark :bg-zinc-900">
                <div className="flex flex-col justify-between space-x-0 sm:flex-row sm:space-x-12">
                    <div className="mb-8 w-full sm:mb-0 sm:w-1/2">
                        <h2 className="mb-6 text-3xl dark:text-gray-300 font-semibold tracking-tight">Sign In</h2>
                        <form onSubmit={handleEmailLogin}>
                            <div className="mb-4 flex flex-col space-y-4">
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 focus:ring-1"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none dark:border-zinc-700 focus:ring-1"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium uppercase text-white hover:bg-zinc-700"
                            >
                                Submit
                            </button>
                        </form>
                        <p className="mt-6 flex gap-1 text-sm">
                            Did you{" "}
                            <a className="text-sky-500 underline" href="#">
                                forget your password?
                            </a>
                        </p>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <p className="mb-6 text-sm">
                            If you don&apos;t already have an account, click the button below to create your account.
                        </p>
                        <NavLink to="/register" className="mb-2 inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium uppercase text-white dark:bg-gray-300 dark:text-gray-900 hover:bg-zinc-700">
                            Create Account
                        </NavLink>
                        <p className="my-4 text-center">OR</p>
                        <button
                            className="flex h-10 w-full items-center justify-center gap-1 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white"
                            onClick={handleGoogleSignIn}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="size-6 fill-current">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            SIGN IN WITH GOOGLE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}