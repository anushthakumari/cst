import AdminSidebar from "@/components/AdminSidebar";

export default function Layout({ children }) {
	return (
		<main>
			<AdminSidebar active="accom" />
			{children}
		</main>
	);
}
