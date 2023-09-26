import React from "react";

import Container from "@/components/HomePage/Container";
import RenderWhen from "@/components/RenderWhen";

const CardList = ({ id, title, data, readMorePath = "/fulltime" }) => {
	return (
		<div id={id}>
			<Container>
				<div className="mb-12 space-y-2 text-center">
					<h2 className="text-3xl font-bold text-gray-800 md:text-4xl text-white">
						{title}
					</h2>
					<p className="lg:mx-auto lg:w-6/12 text-gray-300">
						Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt,
						debitis dolorum officia aliquid explicabo? Excepturi, voluptate?
					</p>
				</div>

				<div className="flex items-center gap-5 overflow-x-scroll no-scrollbar">
					{data.map((v) => (
						<div
							key={v.id}
							className="md:h-[300px] lg:min-w-[400px] h-[400px] min-w-[300px] sm:w-full group p-6 sm:p-8 rounded-3xl border shadow-none border-gray-700 bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
							<div className="mt-6 h-full flex flex-col justify-between relative">
								<div className="flex flex-col gap-4">
									<h3 className="text-2xl font-semibold text-gray-800 text-white">
										{v.title}
									</h3>

									<RenderWhen isTrue={v.desc}>
										<p className="min-h-[50px] text-gray-300">
											{v.desc?.slice(0, 70)}
										</p>
									</RenderWhen>

									<RenderWhen isTrue={v.city}>
										<div className="flex min-w-[40%] items-center gap-2">
											<p className="text-gray-400">City: </p>
											<p className="text-gray-300 capitalize">{v.city}</p>
										</div>
									</RenderWhen>
									<RenderWhen isTrue={v.zipcode}>
										<div className="flex min-w-[40%] items-center gap-2">
											<p className="text-gray-400">Zipcode: </p>
											<p className="text-gray-300">{v.zipcode}</p>
										</div>
									</RenderWhen>
									<RenderWhen isTrue={v.salary}>
										<div className="flex min-w-[40%] items-center gap-2">
											<p className="text-gray-400">Salary: </p>
											<p className="text-gray-300">{v.salary}</p>
										</div>
									</RenderWhen>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-4 flex justify-end">
					<a href={readMorePath}>
						<span className="text-blue-300 underline">Read More &#10148;</span>
					</a>
				</div>
			</Container>
		</div>
	);
};

export default CardList;
