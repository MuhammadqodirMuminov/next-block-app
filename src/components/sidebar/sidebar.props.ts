import { BlogType } from "src/interfaces/blogs.props";
import { Categorytype } from "src/interfaces/category.interface";

export interface SidebarProps {
	lastBlog: BlogType[];
  categories: Categorytype[];
}