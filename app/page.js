import CallToAction from "@/components/HomePage/CallToAction";
import CardList from "@/components/HomePage/CardList";
import Features from "@/components/HomePage/Features";

import prisma from "@/app/db";

async function getAllData() {
	const fulltimejobs = await prisma.FullTimeJobs.findMany({
		take: 3,
		where: {
			is_published: true,
		},
	});
	const parttimejobs = await prisma.parttimejobs.findMany({
		take: 3,
		where: {
			is_published: true,
		},
	});
	const accoms = await prisma.acommodations.findMany({
		take: 3,
		where: {
			is_published: true,
		},
	});

	return { fulltimejobs, parttimejobs, accoms };
}

export default async function Home() {
	const { fulltimejobs, parttimejobs, accoms } = await getAllData();

	return (
		<main className="space-y-40 mb-40">
			<div className="relative" id="home">
				<div
					aria-hidden="true"
					className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20">
					<div className="blur-[106px] h-56 bg-gradient-to-br from-blue-700 to-purple-400"></div>
					<div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
				</div>
				<Container>
					<div className="relative pt-36 ml-auto">
						<div className="lg:w-2/3 text-center mx-auto">
							<h1 className="text-white font-bold text-5xl md:text-6xl xl:text-7xl">
								Find And Connect.
								{/* <span className="text-primary dark:text-white">
									reimagination.
								</span> */}
							</h1>
							<p className="mt-8 text-gray-300">
								Find Jobs and accomodations near you.
							</p>
							<div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
								<a
									href="#"
									className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
									<span className="relative text-base font-semibold text-white">
										Get started
									</span>
								</a>
								<a
									href="#"
									className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-gray-700 before:bg-gray-800 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
									<span className="relative text-base font-semibold text-white">
										Learn more
									</span>
								</a>
							</div>
							{/* <div className="hidden py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
								<div className="text-left">
									<h6 className="text-lg font-semibold text-gray-700 dark:text-white">
										The lowest price
									</h6>
									<p className="mt-2 text-gray-500">Some text here</p>
								</div>
								<div className="text-left">
									<h6 className="text-lg font-semibold text-gray-700 dark:text-white">
										The fastest on the market
									</h6>
									<p className="mt-2 text-gray-500">Some text here</p>
								</div>
								<div className="text-left">
									<h6 className="text-lg font-semibold text-gray-700 dark:text-white">
										The most loved
									</h6>
									<p className="mt-2 text-gray-500">Some text here</p>
								</div>
							</div> */}
						</div>
						{/* <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img
									src="./images/clients/microsoft.svg"
									className="h-12 w-auto mx-auto"
									loading="lazy"
									alt="client logo"
									width=""
									height=""
								/>
							</div>
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img
									src="./images/clients/airbnb.svg"
									className="h-12 w-auto mx-auto"
									loading="lazy"
									alt="client logo"
									width=""
									height=""
								/>
							</div>
							<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
								<img
									src="./images/clients/google.svg"
									className="h-9 w-auto m-auto"
									loading="lazy"
									alt="client logo"
									width=""
									height=""
								/>
							</div>
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img
									src="./images/clients/ge.svg"
									className="h-12 w-auto mx-auto"
									loading="lazy"
									alt="client logo"
									width=""
									height=""
								/>
							</div>
							<div className="p-4 flex grayscale transition duration-200 hover:grayscale-0">
								<img
									src="./images/clients/netflix.svg"
									className="h-8 w-auto m-auto"
									loading="lazy"
									alt="client logo"
									width=""
									height=""
								/>
							</div>
							<div className="p-4 grayscale transition duration-200 hover:grayscale-0">
								<img
									src="./images/clients/google-cloud.svg"
									className="h-12 w-auto mx-auto"
									loading="lazy"
									alt="client logo"
									width=""
									height=""
								/>
							</div>
						</div> */}
					</div>
				</Container>
			</div>

			<Features />

			{/* <div id="solution">
					<Container>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 text-sky-500">
							<path
								fill-rule="evenodd"
								d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
								clip-rule="evenodd"
							/>
							<path
								fill-rule="evenodd"
								d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
								clip-rule="evenodd"
							/>
						</svg>

						<div className="space-y-6 justify-between text-gray-600 md:flex flex-row-reverse md:gap-6 md:space-y-0 lg:gap-12 lg:items-center">
							<div className="md:5/12 lg:w-1/2">
								<img
									src="./images/pie.svg"
									alt="image"
									loading="lazy"
									width=""
									height=""
									className="w-full"
								/>
							</div>
							<div className="md:7/12 lg:w-1/2">
								<h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
									Nuxt development is carried out by passionate developers
								</h2>
								<p className="my-8 text-gray-600 dark:text-gray-300">
									Nobis minus voluptatibus pariatur dignissimos libero quaerat
									iure expedita at? Asperiores nemo possimus nesciunt dicta
									veniam aspernatur quam mollitia. <br /> <br /> Vitae error,
									quaerat officia delectus voluptatibus explicabo quo pariatur
									impedit, at reprehenderit aliquam a ipsum quas voluptatem. Quo
									pariatur asperiores eum amet.
								</p>
								<div className="divide-y space-y-4 divide-gray-100 dark:divide-gray-800">
									<div className="mt-8 flex gap-4 md:items-center">
										<div className="w-12 h-12 flex gap-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-6 h-6 m-auto text-indigo-500 dark:text-indigo-400">
												<path
													fill-rule="evenodd"
													d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
										<div className="w-5/6">
											<h4 className="font-semibold text-lg text-gray-700 dark:text-indigo-300">
												Chat Anytime
											</h4>
											<p className="text-gray-500 dark:text-gray-400">
												Asperiores nemo possimus nesciunt quam mollitia.
											</p>
										</div>
									</div>
									<div className="pt-4 flex gap-4 md:items-center">
										<div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100 dark:bg-teal-900/20">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="w-6 h-6 m-auto text-teal-600 dark:text-teal-400">
												<path
													fill-rule="evenodd"
													d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
										<div className="w-5/6">
											<h4 className="font-semibold text-lg text-gray-700 dark:text-teal-300">
												Real Time Location
											</h4>
											<p className="text-gray-500 dark:text-gray-400">
												Asperiores nemo possimus nesciunt quam mollitia.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</div> */}

			<CardList
				id="fulltimejobs"
				readMorePath="/fulltimejobs"
				title="Full Time Jobs"
				data={fulltimejobs}
			/>
			<CardList
				id="parttimejobs"
				title="Part Time Jobs"
				data={parttimejobs}
				readMorePath="/parttimejobs"
			/>
			<CardList
				id="accomodations"
				title="Accomodations"
				data={accoms}
				readMorePath="/accomodations"
			/>
			<CallToAction />
		</main>
	);
}

const Container = ({ children }) => (
	<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">{children}</div>
);
