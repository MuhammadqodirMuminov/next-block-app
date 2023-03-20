import { GetServerSideProps } from "next";
import React from "react";
import { BlogType } from "src/interfaces/blogs.props";
import { Categorytype } from "src/interfaces/category.interface";
import Layout from "src/layout/layout";
import { BlogService } from "src/services/blog.service";
import { Box } from "@mui/material";
import { Content, Sidebar } from "src/components";
import Head from "next/head";

const CategoryDetail = ({
	blogs,
	categories,
	lastBlog,
}: CategoryDetailtype) => {
	return (
		<Layout>
			<Head>
				<title>Block | Category</title>
				<meta name="description" content="Block aplication" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
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
		</Layout>
	);
};

export default CategoryDetail;
export const getServerSideProps: GetServerSideProps<
	CategoryDetailtype
> = async ({ query }) => {
	const blog = await BlogService.getCategoryDetail(query.slug as string);
	// const blogs = await BlogService.getAllBlogs();
	const categories = await BlogService.Category();
	const lastBlog = await BlogService.getLatestBlog();

	const blogs = blog[0][0];

	return {
		props: {
			blogs,
			categories,
			lastBlog,
		},
	};
};

interface CategoryDetailtype {
	blogs: BlogType[];
	lastBlog: BlogType[];
	categories: Categorytype[];
}
