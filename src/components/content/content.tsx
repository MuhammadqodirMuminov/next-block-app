import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { Avatar, Divider } from "@mui/material";
import { ContentBlog } from "./contentProps";
import { esTimateTimesRead } from "src/helpers/colculateReadtime";
import { useRouter } from "next/router";

const Content = ({ blogs }: ContentBlog) => {
	const router = useRouter();

	return (
		<Box width={{ xs: "100%", md: "70%" }}>
			{blogs.map((data) => (
				<Box
					key={data.id}
					sx={{
						backgroundColor: "rgba(0,0,0,0.5)",
						padding: "20px",
						margin: "20px",
						borderRadius: "8px",
						boxShadow: "0px 8px 16px rgba(255,255,255,0.1)",
						cursor: "pointer",
					}}
					onClick={() => router.push(`/blog/${data.slug}`)}>
					<Box
						position={"relative"}
						width={"100%"}
						height={{ xs: "30vh", md: " 50vh" }}>
						<Image
							src={data.image.url}
							alt={data.title}
							fill
							style={{ objectFit: "cover", borderRadius: "8px" }}
						/>
					</Box>
					<Typography variant="h4" marginTop={"30px"}>
						{data.title}
					</Typography>
					<Typography variant="body1" color={"gray"}>
						{data.excerpt}
					</Typography>
					<Divider sx={{ marginTop: "30px" }} />
					<Box
						sx={{
							display: "flex",
							gap: "10px",
							marginTop: "20px",
						}}>
						<Avatar
							alt={data.author.name}
							src={data?.author.avatar?.url}
						/>
						<Box>
							<Typography>{data.author.name}</Typography>
							<Box color={"gray"}>
								{format(new Date(data.createdAt), "dd MMM, yyyy")}{" "}
								&#x2022; {esTimateTimesRead(data.description.text)}min
								read
							</Box>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default Content;

const data = [
	{
		image: "https://media.graphassets.com/MxJZhmooRRuudoErkQ38",
		title: "Technical SEO with Hygraph",
		exerpt:
			"Get started with your SEO implementation when using a Headless CMS",
		author: {
			name: "Samar Badriddinov",
			image: "https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx",
		},
	},
	{
		image: "https://media.graphassets.com/bh3K2NNtTHCN260Xfq9h",
		title: "Union Types and Sortable Relations with Hygraph",
		exerpt:
			"Learn more about Polymorphic Relations and Sortable Relations with Hygraph",
		author: {
			name: "Samar Badriddinov",
			image: "https://media.graphassets.com/DkfNqQNGRz2F4UFntKQx",
		},
	},
];
