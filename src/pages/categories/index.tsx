import Svg from 'components/Svg'
import Body from 'layout/Body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllCategories, getConfig } from 'scripts/getter'
import { CategoryType, ConfigType, PageOptionType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  categories: CategoryType[]
}

const Categories: NextPage<Props> = ({ config, option, categories }) => {
  return (
    <>
      <Head>
        <title>カテゴリ一覧 | {config.siteTitle}</title>
        <meta name="description" content={`【 カテゴリ一覧ページ 】${config.siteDescription}`} />
        <meta property="og:title" content={`カテゴリ一覧 | ${config.siteTitle}`} />
        <meta property="og:description" content={`【 カテゴリ一覧ページ 】${config.siteDescription}`} />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section className="mb-10 md:mb-20 lg:mb-32">
          <h1 className="text-xl md:text-3xl text-center">
            <span className="text-2xl md:text-4xl text-blue-400 dark:text-yellow-400 transition-my-colors">カ</span>
            テゴリ一覧
          </h1>
          <ul className="flex flex-wrap justify-around items-center">
            {categories.map((category) => (
              <li key={category.id} className="mt-6 mx-6">
                <Link href={`/categories/${category.slug}`}>
                  <a className="md:text-lg hover:text-blue-500 dark:hover:text-yellow-400 flex items-center transition-my-colors">
                    <Svg type="clip" strokeWidth={1.5} class="w-5 h-5 mr-1.5" />
                    {category.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Body>
    </>
  )
}

export default Categories

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const categories = await getAllCategories()
  const option = {
    pageType: 'categories',
    fullPath: `${config.siteDomain}/categories`,
    isNoIndex: true,
  }

  return {
    props: {
      config,
      option,
      categories,
    },
    revalidate: 60,
  }
}
