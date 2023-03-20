import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Content, Hero, Sidebar } from "src/components";
import { BlogType } from "src/interfaces/blogs.props";
import { Categorytype } from "src/interfaces/category.interface";
import Layout from "src/layout/layout";
import { BlogService } from "src/services/blog.service";

export default function Home({ blogs, lastBlog, categories }: HomeProps) {
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
				<Hero blogs={blogs.slice(0,3)} />
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						padding: "20px",
						gap: "20px",
					}}>
					<Sidebar lastBlog={lastBlog} categories={categories} />
					<Content blogs={blogs} />
				</Box>
			</main>
		</Layout>
	);
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const blogs = await BlogService.getAllBlogs();
	const categories = await BlogService.Category();
	const lastBlog = await BlogService.getLatestBlog();

	return {
		props: {
			blogs,
			lastBlog,
			categories,
		},
	};
};

interface HomeProps {
	blogs: BlogType[];
	lastBlog: BlogType[];w
	categories: Categorytype[];
}
