"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Container from "./Container";

const AdminSidebar = ({ active }) => {
	return (
		<div className="bg-gray-800">
			<Container>
				<nav className="flex justify-between py-5 items-center">
					<h1 className="text-xl text-white font-bold">
						<a href="/">Academic Turf.</a>
					</h1>
					<div className="flex items-center">
						<ul className="flex items-center space-x-6">
							<li
								className={`font-semibold text-white ${
									active === "fulltime" ? "underline" : ""
								}`}>
								<a href="/admin/fulltime">Full Time Jobs</a>
							</li>
							<li
								className={`font-semibold text-white ${
									active === "parttime" ? "underline" : ""
								}`}>
								<a href="/admin/parttime">Part Time Jobs</a>
							</li>
							<li
								className={`font-semibold text-white ${
									active === "accom" ? "underline" : ""
								}`}>
								<a href="/admin/accom">Accomodation</a>
							</li>
							<li
								className={`font-semibold text-white ${
									active === "accom" ? "underline" : ""
								}`}>
								<button onClick={signOut}>Logout</button>
							</li>
						</ul>
					</div>
				</nav>
			</Container>
		</div>
	);
};

export default AdminSidebar;
