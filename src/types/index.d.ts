/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  型定義ファイル

＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

/* ヘッドレス CMS のデータに付与されるカウントデータ */
export type CountType = {
  totalCount: number
  offset: number
  limit: number
}

/* ヘッドレス CMS で管理している Web サイトの設定データ */
export type AllConfigType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
} & ConfigType

/* AllConfigType から必要なデータを取り出した設定データ */
export type ConfigType = {
  siteDomain: string
  siteTitle: string
  siteSubTitle: string
  siteDescription: string
  siteKeywords: string
}

/* ヘッドレス CMS で管理している記事一覧データ */
export type AllPostsType = {
  contents: PostType[]
} & CountType

/* 記事データ */
export type PostType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
  keywords: string
  categories: CategoryType[]
  tags: TagType[]
  body: string | Source
}

/* ヘッドレス CMS で管理しているカテゴリ一覧データ */
export type AllCategoriesType = {
  contents: CategoryType[]
} & CountType

/* カテゴリデータ */
export type CategoryType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
}

/* ヘッドレス CMS で管理しているタグ一覧データ */
export type AllTagsType = {
  contents: TagType[]
} & CountType

/* タグデータ */
export type TagType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
}

/* Pages 層のオプション定数を管理するデータ */
export type PageOptionType = {
  pageType: string
  fullPath: string
  isNoIndex: boolean
}
