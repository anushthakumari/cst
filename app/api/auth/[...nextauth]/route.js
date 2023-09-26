import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/db";

export const authOptions = {
	providers: [
		CredentialsProvider({
			id: "admin_credentials",
			name: "admin_credentials",
			credentials: {},

			async authorize(credentials) {
				try {
					const { email, password } = credentials;

					const admin = await prisma.admins.findUnique({
						where: {
							email,
						},
					});

					if (!admin) {
						return null;
					}

					if (admin.pass !== password) {
						return null;
					}

					return admin;
				} catch (error) {
					console.log("Error: ", error);
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/admin/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
