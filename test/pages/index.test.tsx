import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../../src/pages/index'
import { ALL_POSTS } from '../../src/scripts/store'

describe(`TOP PAGE 1/7 (pages/index.tsx)`, () => {
  afterEach(() => {
    cleanup
  })

  test('snapshot', async () => {
    const posts = (await ALL_POSTS).contents.slice(-6)
    const allPostLength = 42
    const option = {
      pageType: 'home',
      fullPath: `https://blog.shinki.net/`,
    }
    const { asFragment } = render(<Home posts={posts} allPostLength={allPostLength} option={option} />)
    const tree = asFragment()
    expect(tree).toMatchSnapshot()
  })

  test('integration', async () => {
    const posts = (await ALL_POSTS).contents.slice(-6)
    const allPostLength = 42
    const option = {
      pageType: 'home',
      fullPath: `https://blog.shinki.net/`,
    }
    render(<Home posts={posts} allPostLength={allPostLength} option={option} />)

    // ヘッダーが存在する
    expect(screen.getByRole('banner')).toBeInTheDocument()
    // メインコンテンツが存在する
    expect(screen.getByRole('main')).toBeInTheDocument()
    // サイドコンテンツ (SHARE, CONTENTS, MORE) が存在する
    expect(screen.getAllByRole('complementary')).toHaveLength(3)
    // フッターが存在する
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    // h1属性が1個だけ存在する
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    // 記事が1個以上存在する
    expect(screen.getAllByRole('article')).not.toHaveLength(0)
    // ページネーションが存在する
    expect(screen.getByRole('navigation', { name: 'pagination' })).toBeInTheDocument()
  })
})
