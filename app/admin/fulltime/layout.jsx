import AdminSidebar from "@/components/AdminSidebar";

export default function Layout({ children }) {
	return (
		<main>
			<AdminSidebar active="fulltime" />
			{children}
		</main>
	);
}
