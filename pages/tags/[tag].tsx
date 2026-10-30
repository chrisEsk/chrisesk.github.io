import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import BlogCard from "@/components/BlogCard";
import BlogHeader from "@/components/blog/BlogHeader";
import Footer from "@/components/Footer";
import SkipToMain from "@/components/SkipToMain";
import SocialLinks from "@/components/SocialLinks";
import AppHead from "@/components/AppHead";
import { getAllPosts, getAllTagPosts } from "utils/api";
import { getProjectTags, projects } from "utils/projects";
import slugify from "utils/slugify";
import type { MdxMeta } from "../blog/posts/[slug]";

type Props = { tag: string; posts: MdxMeta[]; projectTitles: string[] };

const TagPage: NextPage<Props> = ({ tag, posts, projectTitles }) => (
  <><AppHead title={`Tag: ${tag} - Christian Esquivel`} /><div className="bg-bglight dark:bg-bgdark min-h-screen"><BlogHeader /><SkipToMain /><SocialLinks /><main id="main" className="blog-main"><section className="blog-section"><h1 className="text-3xl lg:text-4xl font-bold mb-8">Tag: {tag}</h1>{projectTitles.length > 0 && <><h2 className="text-2xl font-medium mb-3">Projects</h2><ul className="mb-10">{projectTitles.map((title) => <li key={title} className="mb-2 text-lg">{title}</li>)}</ul></>}{posts.length > 0 && <><h2 className="text-2xl font-medium mb-3">Blog entries</h2><ul>{posts.map((post) => <BlogCard post={post} key={post.slug} />)}</ul></>}</section></main><Footer /></div></>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.tag as string;
  const allPosts = getAllPosts(["tags"]);
  const tag = (allPosts.flatMap((post) => (post.tags as string[] | undefined) || []).find((value) => slugify(value) === slug) || getProjectTags().find((value) => slugify(value) === slug)) as string;
  return { props: { tag, posts: tag && allPosts.some((post) => (post.tags as string[] | undefined)?.includes(tag)) ? getAllTagPosts(["slug", "title", "excerpt", "datetime", "category"], tag) : [], projectTitles: projects.filter((project) => project.tags.includes(tag)).map((project) => project.title) } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(["tags"]);
  const tags = Array.from(new Set([...posts.flatMap((post) => (post.tags as string[] | undefined) || []), ...getProjectTags()]));
  return { paths: tags.map((tag) => ({ params: { tag: slugify(tag) } })), fallback: false };
};

export default TagPage;
