import { request, gql } from "graphql-request";
import { BlogType } from "src/interfaces/blogs.props";

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
				}
			}
		`;

		const result = await request<{ blogs: BlogType }>(graphQlApi, quary);
		return result.blogs;
	},
};
