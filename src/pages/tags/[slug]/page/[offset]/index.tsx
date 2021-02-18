import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllTags, getConfig, getTag, getTagPosts } from 'scripts/getter'
import { ConfigType, PageOptionType, PostType, TagType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
  offset: number
  tag: TagType
}

const Tag: NextPage<Props> = ({ config, option, posts, allPostCount, offset, tag }) => {
  return (
    <>
      <Head>
        <title>{`${tag.title} | ${config.siteTitle}`}</title>
        <link
          rel="prev"
          href={
            offset === 2
              ? `${config.siteDomain}/tags/${tag.slug}`
              : `${config.siteDomain}/tags/${tag.slug}/page/${offset - 1}`
          }
        />
        {offset !== Math.ceil(allPostCount / PER_PAGE) ? (
          <link rel="next" href={`${config.siteDomain}/tags/${tag.slug}/page/${offset + 1}`} />
        ) : null}
        <meta name="description" content={tag.description} />
        <meta property="og:title" content={`${tag.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={tag.description} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        {/* 以下変更不要 */}
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:url" content={option.fullPath} />
        <link rel="canonical" href={option.fullPath} />
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          <h1 className="mb-4 md:mb-8 lg:mb-10 text-xl md:text-3xl text-center">
            <span className="text-2xl md:text-4xl text-blue-400 dark:text-yellow-400 tracking-wider transition-my-colors">
              {tag.title}
            </span>
            の記事
          </h1>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
        <Pagination allPostCount={allPostCount} pageType={option.pageType} offset={offset} slug={tag.slug} />
      </Body>
    </>
  )
}

export default Tag

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const offset = Number(params?.offset)
  const config = await getConfig()
  const tag = await getTag(slug)
  const tagPosts = await getTagPosts(slug, 'desc')
  const posts = tagPosts.slice(PER_PAGE * offset - PER_PAGE, PER_PAGE * offset)
  const allPostCount = tagPosts.length
  const option = {
    pageType: 'tag',
    fullPath: `${config.siteDomain}/tags/${tag.slug}/page/${offset}`,
    isNoIndex: true,
  }

  if (posts.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      config,
      option,
      posts,
      allPostCount,
      offset,
      tag,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = (await getAllTags()).map((tag) => {
    return tag.slug
  })
  const offsets = slugs.map(async (slug) => {
    const length = (await getTagPosts(slug, 'desc')).length
    return Math.floor(length / PER_PAGE)
  })
  let paths: {
    params: {
      slug: string
      offset: string
    }
  }[] = []

  for (let i = 0; i < slugs.length; i++) {
    paths = [
      ...paths,
      {
        params: {
          slug: slugs[i],
          offset: String(offsets[i]),
        },
      },
    ]
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
