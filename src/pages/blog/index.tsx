import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import { Content } from "src/components";
import { BlogType } from "src/interfaces/blogs.props";
import Layout from "src/layout/layout";
import SEO from "src/layout/seo/seo";
import { BlogService } from "src/services/blog.service";

const Blog = ({ blogs }: BlogPageType) => {
	return (
		<SEO metaTitle="Block | all-blocks">
			<Layout>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						padding: "20px",
						gap: "20px",
						justifyContent: "center",
					}}>
					<Content blogs={blogs} />
				</Box>
			</Layout>
		</SEO>
	);
};

export default Blog;

export const getServerSideProps: GetServerSideProps<
	BlogPageType
> = async () => {
	const blogs = await BlogService.getAllBlogs();

	return {
		props: {
			blogs,
		},
	};
};

interface BlogPageType {
	blogs: BlogType[];
}
