import { GetServerSideProps } from "next";
import React from "react";
import { BlogType } from "src/interfaces/blogs.props";
import { Categorytype } from "src/interfaces/category.interface";
import Layout from "src/layout/layout";
import { BlogService } from "src/services/blog.service";
import { Box } from "@mui/material";
import { Content, Sidebar } from "src/components";
import SEO from "src/layout/seo/seo";
import { useRouter } from "next/router";

const CategoryDetail = ({
	blogs,
	categories,
	lastBlog,
}: CategoryDetailtype) => {

  const router = useRouter()

	return (
		<SEO metaTitle={`Block | ${router.query.slug}`}>
			<Layout>
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
		</SEO>
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
