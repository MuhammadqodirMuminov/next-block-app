import { Box } from "@mui/material";
import Head from "next/head";
import { Content, Hero, Sidebar } from "src/components";
import Layout from "src/layout/layout";

export default function Home() {
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
