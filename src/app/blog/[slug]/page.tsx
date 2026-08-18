import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/content/blog';
import { ArticlePage } from '@/views/ArticlePage';
import { JsonLd } from '@/components/JsonLd';
import { graph, articleSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((article) => ({ slug: article.id }));
}

/** Anything not in generateStaticParams is a genuine 404, not an on-demand render. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.id}`,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          articleSchema(article),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: article.title, path: `/blog/${article.id}` },
          ]),
          ...(article.faq?.length ? [faqSchema(article.faq)] : [])
        )}
      />
      <ArticlePage article={article} />
    </>
  );
}
