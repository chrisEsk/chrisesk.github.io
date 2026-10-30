import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
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

type Props = { tag: string; posts: MdxMeta[]; projectTitles: { title: string; url: string; description: string; image: string }[] };

const TagPage: NextPage<Props> = ({ tag, posts, projectTitles }) => (
  <><AppHead title={`Tag: ${tag} - Christian Esquivel`} /><div className="bg-bglight dark:bg-bgdark min-h-screen"><BlogHeader /><SkipToMain /><SocialLinks /><main id="main" className="blog-main"><section className="blog-section"><h1 className="text-3xl lg:text-4xl font-bold mb-8">Tag: {tag}</h1>{projectTitles.length > 0 && <><h2 className="text-2xl font-medium mb-3">Projects</h2><ul className="mb-10 space-y-3">{projectTitles.map((project) => <li key={project.title}><a href={project.url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-md border border-marrsgreen/20 bg-cardlight p-3 transition hover:-translate-y-0.5 hover:border-marrsgreen dark:border-carrigreen/20 dark:bg-carddark dark:hover:border-carrigreen"><div className="relative h-20 w-24 shrink-0 overflow-hidden rounded bg-white dark:bg-bgdark"><Image src={project.image} alt={`${project.title} preview`} fill sizes="96px" className="object-cover" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3 text-lg font-medium group-hover:text-marrsgreen dark:group-hover:text-carrigreen"><span>{project.title}</span><span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></div><p className="mt-1 text-base">{project.description}</p></div></a></li>)}</ul></>}{posts.length > 0 && <><h2 className="text-2xl font-medium mb-3">Blog entries</h2><ul className="space-y-4">{posts.map((post) => <BlogCard post={post} compact key={post.slug} />)}</ul></>}{posts.length === 0 && projectTitles.length === 0 && <p>No results found for this tag.</p>}</section></main><Footer /></div></>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.tag as string;
  const allPosts = getAllPosts(["tags"]);
  const tag = (allPosts.flatMap((post) => (post.tags as string[] | undefined) || []).find((value) => slugify(value) === slug) || getProjectTags().find((value) => slugify(value) === slug)) as string;
  return { props: { tag, posts: tag && allPosts.some((post) => (post.tags as string[] | undefined)?.includes(tag)) ? getAllTagPosts(["slug", "title", "excerpt", "datetime", "category"], tag) : [], projectTitles: projects.filter((project) => project.tags.includes(tag)).map(({ title, url, description, image }) => ({ title, url, description, image })) } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(["tags"]);
  const tags = Array.from(new Set([...posts.flatMap((post) => (post.tags as string[] | undefined) || []), ...getProjectTags()]));
  return { paths: tags.map((tag) => ({ params: { tag: slugify(tag) } })), fallback: false };
};

export default TagPage;
