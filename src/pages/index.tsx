import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Content, Hero, Sidebar } from "src/components";
import { BlogType } from "src/interfaces/blogs.props";
import Layout from "src/layout/layout";
import { BlogService } from "src/services/blog.service";

export default function Home({ blogs }: HomeProps) {
	console.log(blogs);

	return (
		<Layout>
			<Head>
				<title>Block | App</title>
				<meta name="description" content="Block aplication" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Hero />
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						padding: "20px",
						gap: "20px",
					}}>
					<Sidebar />
					<Content />
				</Box>
			</main>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const blogs = await BlogService.getAllBlogs();

	return {
		props: {
			blogs,
		},
	};
};

interface HomeProps {
	blogs: BlogType;
}
