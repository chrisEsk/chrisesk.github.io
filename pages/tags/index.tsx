import type { GetStaticProps, NextPage } from "next";
import Tag from "@/components/blog/Tag";
import AppHead from "@/components/AppHead";
import BlogHeader from "@/components/blog/BlogHeader";
import Footer from "@/components/Footer";
import SkipToMain from "@/components/SkipToMain";
import SocialLinks from "@/components/SocialLinks";
import { getAllPosts } from "utils/api";
import { getProjectTags } from "utils/projects";

type Props = { blogTags: string[]; projectTags: string[]; blogCounts: Record<string, number>; projectCounts: Record<string, number> };

const Tags: NextPage<Props> = ({ blogTags, projectTags, blogCounts, projectCounts }) => (
  <>
    <AppHead title="Tags - Christian Esquivel" />
    <div className="bg-bglight dark:bg-bgdark min-h-screen">
      <SkipToMain />
      <BlogHeader />
      <SocialLinks />
      <main id="main" className="blog-main">
        <section className="blog-section">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8">Tags</h1>
          <h2 className="text-2xl font-medium mb-3">Project tags</h2>
          <ul className="mb-10">
            {projectTags.map((tag) => <li className="inline-block" key={tag}><Tag tag={tag} size="lg" count={projectCounts[tag]} /></li>)}
          </ul>
          <h2 className="text-2xl font-medium mb-3">Blog tags</h2>
          <ul>
            {blogTags.map((tag) => <li className="inline-block" key={tag}><Tag tag={tag} size="lg" count={blogCounts[tag]} /></li>)}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["tags"]);
  const blogTags = Array.from(new Set(posts.flatMap((post) => (post.tags as string[] | undefined) || []))).sort();
  const projectTags = getProjectTags().sort();
  const blogCounts = Object.fromEntries(blogTags.map((tag) => [tag, posts.filter((post) => (post.tags as string[] | undefined)?.includes(tag)).length]));
  const projectCounts = Object.fromEntries(projectTags.map((tag) => [tag, 1]));
  return { props: { blogTags, projectTags, blogCounts, projectCounts } };
};

export default Tags;
