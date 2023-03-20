import { Avatar, Box, Divider, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { Sidebar } from "src/components";
import { BlogType } from "src/interfaces/blogs.props";
import { Categorytype } from "src/interfaces/category.interface";
import Layout from "src/layout/layout";
import { BlogService } from "src/services/blog.service";
import { format } from "date-fns";
import { esTimateTimesRead } from "../../helpers/colculateReadtime";
import Head from "next/head";

const Detailpage = ({ blog, lastBlog, categories }: Detailtype) => {
	return (
		<>
			<Layout>
				<Head>
					<title>Block | Content</title>
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
					<Box width={{ xs: "100%", md: "70%" }}>
						<Box
							sx={{
								backgroundColor: "black",
								padding: "20px",
								borderRadius: "8px",
								boxShadow: "0px 8px 16px rgba(255, 255, 255, .1)",
							}}
							position={"relative"}
							width={"100%"}
							height={{ xs: "30vh", md: "50vh" }}
							marginBottom={"20px"}>
							<Image
								src={blog.image.url}
								alt={blog.title}
								fill
								style={{ objectFit: "cover", borderRadius: "10px" }}
							/>
						</Box>
						<Box
							display={"flex"}
							flexDirection={"column"}
							rowGap={"10px"}>
							<Box
								sx={{
									display: "flex",
									gap: "10px",
									marginTop: "20px",
								}}>
								<Avatar
									alt={blog.author.name}
									src={blog.author.avatar.url}
								/>
								<Box>
									<Typography>{blog.author.name}</Typography>
									<Box color={"gray"}>
										{format(
											new Date(`${blog.createdAt}`),
											"dd MMM, yyyy"
										)}{" "}
										&#x2022;{" "}
										{esTimateTimesRead(blog.description.text)}
										min read
									</Box>
								</Box>
							</Box>
							<Typography variant="h3">{blog.title}</Typography>
							<Typography color={"gray"}>{blog.excerpt}</Typography>
							<Divider />
							<div
								style={{ opacity: ".8" }}
								dangerouslySetInnerHTML={{
									__html: blog.description.html,
								}}
							/>
						</Box>
					</Box>
					<Sidebar lastBlog={lastBlog} categories={categories} />
				</Box>
			</Layout>
		</>
	);
};

export default Detailpage;

export const getServerSideProps: GetServerSideProps<Detailtype> = async ({
	query,
}) => {
	const blog = await BlogService.getDeatilBlog(query.slug as string);
	const blogs = await BlogService.getAllBlogs();
	const categories = await BlogService.Category();
	const lastBlog = await BlogService.getLatestBlog();

	return {
		props: {
			blog,
			blogs,
			categories,
			lastBlog,
		},
	};
};

interface Detailtype {
	blog: BlogType;
	blogs: BlogType[];
	lastBlog: BlogType[];
	categories: Categorytype[];
}
