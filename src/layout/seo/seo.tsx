import Head from "next/head";
import React from "react";
import { siteConfig } from "src/config/siteConfig";
import { SeoInterface } from "./seo.props";

const SEO = ({
	metaTitle = siteConfig.metaTitle,
	children,
	metaKeywords = siteConfig.metaKeywords,
	author = siteConfig.author,
	metaDescription = siteConfig.metaDescription,
}: SeoInterface) => {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5"
				/>
				<title>{metaTitle}</title>
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta name="keyword" content={metaKeywords} />
				<meta name="author" content={author} />
				<meta name="description" content={metaDescription} />
				<link
					rel="shortcut icon"
					href={"/favicon.ico"}
					type="image/x-icon"
				/>
			</Head>
			{children}
		</>
	);
};

export default SEO;
