import { request, gql } from "graphql-request";
import { BlogType } from "src/interfaces/blogs.props";
import { Categorytype } from "src/interfaces/category.interface";

const graphQlApi = process.env.NEXT_GRAPHQL_API as string;

export const BlogService = {
	async getAllBlogs() {
		const quary = gql`
			query getBlogs {
				blogs {
					title
					slug
					excerpt
					id
					updatedAt
					publishedAt
					createdAt
					category {
						... on Category {
							id
							label
							slug
						}
					}
					author {
						name
						avatar {
							url
						}
					}
					image {
						url
					}
					description {
						text
					}
				}
			}
		`;

		const result = await request<{ blogs: BlogType[] }>(graphQlApi, quary);
		return result.blogs;
	},

	async getLatestBlog() {
		const quary = gql`
			query LastBlogs {
				blogs(last: 2) {
					title
					slug
					id
					publishedAt
					author {
						name
						avatar {
							url
						}
					}
					image {
						url
					}
				}
			}
		`;

		const result = await request<{ blogs: BlogType[] }>(graphQlApi, quary);
		return result.blogs;
	},

	async Category() {
		const quary = gql`
			query Category {
				categories {
					slug
					label
					id
				}
			}
		`;

		const result = await request<{ categories: Categorytype[] }>(
			graphQlApi,
			quary
		);
		return result.categories;
	},

	async getDeatilBlog(slug: string) {
		const query = gql`
			query getDetail($slug: String!) {
				blog(where: { slug: $slug }) {
					id
					slug
					title
					description {
						text
						html
					}
					createdAt
					image {
						url
					}
					excerpt
					author {
						name
						avatar {
							url
						}
					}
				}
			}
		`;

		const result = await request<{ blog: BlogType }>(graphQlApi, query, {
			slug,
		});
		return result.blog;
	},

	async getCategoryDetail(slug: string) {
		const query = gql`
			query categoryDetail($slug: String = "mobile-programming") {
				categories(where: { slug: $slug }) {
					blogs {
            id
            title
						createdAt
						publishedAt
						author {
							name
							avatar {
								url
							}
						}
						description {
							text
							html
						}
						excerpt
						image {
							url
						}
					}
				}
			}
		`;

		const result = await request<{ categories: [{ blogs: BlogType[] }] }>(
			graphQlApi,
			query,
			{
				slug,
			}
		);

		const res = result.categories.map((category) => {
			const value = Object.values(category);
			return value;
		});

		return res;
	},
};
