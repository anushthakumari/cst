import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Academic Turf",
	description: "Find Jobs and accomodations near you.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className + " bg-gray-900"}>
				<Header />
				{children}
				<Footer />
				<Script
					src="https://kit.fontawesome.com/9756fa84c2.js"
					crossorigin="anonymous"></Script>
			</body>
		</html>
	);
}
