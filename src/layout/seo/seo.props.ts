import { ReactNode } from "react";

export interface SeoInterface {
	children: ReactNode;
	metaTitle?: string;
	metaDescription?: string;
	author?: string;
	metaKeywords?: string;
}
