import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Categorytype } from "src/interfaces/category.interface";
import Layout from "src/layout/layout";
import SEO from "src/layout/seo/seo";
import { BlogService } from "src/services/blog.service";

const Categories = ({ categories }: CategoryPageType) => {
	const router = useRouter();

	return (
		<SEO metaTitle="Block | Category">
			<Layout>
				<Box
					width={{ xs: "100%", md: "80%" }}
					marginX={"auto"}
					marginTop={"10vh"}
					borderRadius={"8px"}
					height={{ xs: "30vh", md: "50vh" }}
					sx={{
						backgroundColor: "black",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						rowGap: "10px",
					}}>
					<Typography variant="h3" fontFamily={"cursive"}>
						All Categories
					</Typography>
					<ButtonGroup
						variant="contained"
						aria-label="outlined primary button group">
						{categories.map((item) => (
							<Button
								onClick={() => router.push(`/categories/${item.slug}`)}
								key={item.slug}>
								# {item.label}
							</Button>
						))}
					</ButtonGroup>
				</Box>
			</Layout>
		</SEO>
	);
};

export default Categories;

export const getServerSideProps: GetServerSideProps<
	CategoryPageType
> = async () => {
	const categories = await BlogService.Category();

	return {
		props: {
			categories,
		},
	};
};

interface CategoryPageType {
	categories: Categorytype[];
}
