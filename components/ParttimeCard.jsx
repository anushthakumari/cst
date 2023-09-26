import React from "react";
import RenderWhen from "./RenderWhen";

const ParttimeCard = ({
	id,
	title,
	desc,
	address,
	zipcode,
	city,
	shift,
	salary,
	pay_per_hour,
	from_time,
	end_time,
	from_day,
	end_day,
	createdAt,
}) => {
	return (
		<div
			key={id}
			className="md:w-[50%] lg:w-[50%] sm:w-full group p-6 sm:p-8 rounded-3xl border shadow-none border-gray-700 bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
			<div className="flex gap-2 flex-col justify-between mt-6 relative text-white">
				<h3 className="text-2xl font-semibold text-gray-800 text-white capitalize">
					{title}
				</h3>
				<RenderWhen isTrue={desc}>
					<p className="text-gray-300">{desc}</p>
				</RenderWhen>
				<RenderWhen isTrue={address}>
					<p className="mt-4 text-gray-300">{address}</p>
				</RenderWhen>

				<div className="flex flex-wrap gap-2">
					<RenderWhen isTrue={city}>
						<div className="min-w-[40%] flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-6 h-6 text-white">
								<path
									fill-rule="evenodd"
									d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
									clip-rule="evenodd"
								/>
							</svg>
							<p>{city}</p>
						</div>
					</RenderWhen>
					<RenderWhen isTrue={zipcode}>
						<div className="min-w-[40%] flex items-center gap-2">
							<p className="text-gray-400">Zipcode: </p>
							<p>{zipcode}</p>
						</div>
					</RenderWhen>
				</div>
				<div className="mt-4 flex flex-wrap gap-2">
					<RenderWhen isTrue={Boolean(shift)}>
						<div className="flex min-w-[40%] items-center gap-2">
							<p className="text-gray-400">Shift: </p>
							<p className="capitalize">{shift}</p>
						</div>
					</RenderWhen>
					<RenderWhen isTrue={salary}>
						<div className="flex min-w-[40%] items-center gap-2">
							<p className="text-gray-400">Salary: </p>
							<p>{salary}</p>
						</div>
					</RenderWhen>
					<RenderWhen isTrue={pay_per_hour}>
						<div className="flex min-w-[40%] items-center gap-2">
							<p className="text-gray-400">Salary: </p>
							<p>{pay_per_hour}</p>
						</div>
					</RenderWhen>
					<RenderWhen isTrue={from_day}>
						<div className="flex min-w-[40%] items-center gap-2">
							<p className="text-gray-400">From: </p>
							<p className="capitalize">{from_day}</p>
						</div>
					</RenderWhen>
					<RenderWhen isTrue={end_day}>
						<div className="flex min-w-[40%] items-center gap-2">
							<p className="text-gray-400">To: </p>
							<p className="capitalize">{end_day}</p>
						</div>
					</RenderWhen>
					<RenderWhen isTrue={from_time}>
						<div className="flex min-w-[40%] items-center gap-2">
							<p className="text-gray-400">From Time: </p>
							<p className="capitalize">{from_time}</p>
						</div>
					</RenderWhen>
					<RenderWhen isTrue={end_time}>
						<div className="flex min-w-[40%] items-center gap-2">
							<p className="text-gray-400">To Time: </p>
							<p className="capitalize">{end_time}</p>
						</div>
					</RenderWhen>
				</div>
				<div className="mt-5 flex justify-between">
					<div className="flex items-center gap-2">
						<p className="text-sm text-gray-400">Posted At: </p>
						<p className="text-sm text-gray-500">
							{new Date(createdAt).toLocaleDateString("en-US")}
						</p>
					</div>
					<a className="inline-block" href="#">
						<span className="text-info text-blue-300">Connect</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ParttimeCard;
