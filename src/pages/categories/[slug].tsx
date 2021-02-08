import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ErrorPage from 'pages/404'
import React from 'react'
import { getAllCategoryPaths, getCategory, getCategoryPosts, getConfig } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { CategoryType, ConfigType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  category: CategoryType
}

const Category: NextPage<Props> = ({ config, option, posts, category }) => {
  const router = useRouter()

  if (!router.isFallback && !category.id) return <ErrorPage statusCode={404} />

  return (
    <>
      <Head>
        <title>
          {category.title} | {config.siteTitle}
        </title>
        <meta name="description" content={category.description} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`${category.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={category.description} />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body config={config} pageType={option.pageType} fullPath={option.fullPath}>
        <h1>{category.title}の記事一覧</h1>
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <a>
                <h2>{post.title}</h2>
              </a>
            </Link>
            <Date publishedAt={post.publishedAt} />
            {post.categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <a>{category.title}</a>
              </Link>
            ))}
          </article>
        ))}
      </Body>
    </>
  )
}

export default Category

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCategoryPaths()

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const category = await getCategory(slug)
  const categoryPosts = await getCategoryPosts(slug)
  const posts = sortByDesc(categoryPosts)
  const option = {
    pageType: 'category',
    fullPath: `${config.siteDomain}/categories/${category.slug}`,
    isNoIndex: true,
  }

  if (!category) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      config,
      option,
      posts,
      category,
    },
    revalidate: 60,
  }
}
