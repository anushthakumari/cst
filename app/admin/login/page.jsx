"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
	const [isLoading, setisLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setisLoading(true);
		const email = e.currentTarget.email.value.trim();
		const pass = e.currentTarget.pass.value.trim();
		try {
			const data = {
				email,
				password: pass,
				callbackUrl: "/admin/fulltime",
			};

			await signIn("admin_credentials", data);
		} catch (error) {
			alert("Something went wrong!");
			console.log(error);
		} finally {
			setisLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
			<h1 className="font-bold text-2xl">Welcome Back </h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white rounded shadow-lg p-12 mt-12">
				<label className="font-semibold text-xs" htmlFor="usernameField">
					Email
				</label>
				<input
					className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
					type="email"
					name="email"
					required
				/>
				<label className="font-semibold text-xs mt-3" htmlFor="passwordField">
					Password
				</label>
				<input
					className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
					type="password"
					name="pass"
					required
				/>
				<button
					type="submit"
					disabled={isLoading}
					className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
					{isLoading ? "Loading.." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default Login;
