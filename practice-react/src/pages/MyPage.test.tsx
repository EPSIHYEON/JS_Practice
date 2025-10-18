import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MyPage from './MyPage'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('MyPage Component', () => {
  describe('Page structure', () => {
    it('should render page title', () => {
      renderWithRouter(<MyPage />)
      
      expect(screen.getByText('나의 글')).toBeInTheDocument()
    })

    it('should render profile section with stats', () => {
      renderWithRouter(<MyPage />)
      
      expect(screen.getByText('29')).toBeInTheDocument()
      expect(screen.getByText('나의 글')).toBeInTheDocument()
      expect(screen.getByText('72')).toBeInTheDocument()
      expect(screen.getByText('총 조회수')).toBeInTheDocument()
      expect(screen.getByText('48')).toBeInTheDocument()
      expect(screen.getByText('총 좋아요 수')).toBeInTheDocument()
    })

    it('should render profile icon', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const profileIcon = container.querySelector('svg')
      expect(profileIcon).toBeInTheDocument()
      expect(profileIcon).toHaveClass('w-20')
      expect(profileIcon).toHaveClass('h-20')
    })
  })

  describe('Statistics cards', () => {
    it('should display correct post count', () => {
      renderWithRouter(<MyPage />)
      
      const postCount = screen.getByText('29')
      expect(postCount).toBeInTheDocument()
      expect(postCount).toHaveClass('text-5xl')
    })

    it('should display correct total views', () => {
      renderWithRouter(<MyPage />)
      
      const viewCount = screen.getByText('72')
      expect(viewCount).toBeInTheDocument()
    })

    it('should display correct total likes', () => {
      renderWithRouter(<MyPage />)
      
      const likeCount = screen.getByText('48')
      expect(likeCount).toBeInTheDocument()
    })

    it('should have proper styling on stat cards', () => {
      renderWithRouter(<MyPage />)
      
      const postCountElement = screen.getByText('29')
      expect(postCountElement).toHaveClass('border-b-4')
      expect(postCountElement).toHaveClass('border-gray-300')
    })
  })

  describe('Table structure', () => {
    it('should render table with headers', () => {
      renderWithRouter(<MyPage />)
      
      expect(screen.getByText('번호')).toBeInTheDocument()
      expect(screen.getByText('제목')).toBeInTheDocument()
      expect(screen.getByText('조회수')).toBeInTheDocument()
    })

    it('should have thead element', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const thead = container.querySelector('thead')
      expect(thead).toBeInTheDocument()
      expect(thead).toHaveClass('bg-gray-50')
    })

    it('should have tbody element', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const tbody = container.querySelector('tbody')
      expect(tbody).toBeInTheDocument()
    })

    it('should render table within white card container', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const table = container.querySelector('table')
      expect(table).toBeInTheDocument()
      expect(table?.parentElement).toHaveClass('bg-white')
      expect(table?.parentElement).toHaveClass('rounded-xl')
    })
  })

  describe('Post list rendering', () => {
    it('should render all dummy posts', () => {
      renderWithRouter(<MyPage />)
      
      expect(screen.getByText('열심히 사는 법')).toBeInTheDocument()
      expect(screen.getByText('GITHUB 레포 설정하는 방법')).toBeInTheDocument()
      expect(screen.getByText('리액트 왕초보 탈출')).toBeInTheDocument()
    })

    it('should display post indices', () => {
      renderWithRouter(<MyPage />)
      
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('should display post view counts', () => {
      renderWithRouter(<MyPage />)
      
      expect(screen.getByText('30')).toBeInTheDocument()
      expect(screen.getByText('27')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
    })

    it('should render posts as MyCard components', () => {
      renderWithRouter(<MyPage />)
      
      // Each post should have a link
      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThanOrEqual(3)
    })

    it('should have correct links to post details', () => {
      renderWithRouter(<MyPage />)
      
      const firstPostLink = screen.getByText('열심히 사는 법').closest('a')
      expect(firstPostLink).toHaveAttribute('href', '/post/101')
      
      const secondPostLink = screen.getByText('GITHUB 레포 설정하는 방법').closest('a')
      expect(secondPostLink).toHaveAttribute('href', '/post/102')
      
      const thirdPostLink = screen.getByText('리액트 왕초보 탈출').closest('a')
      expect(thirdPostLink).toHaveAttribute('href', '/post/103')
    })
  })

  describe('Layout and styling', () => {
    it('should have proper margin on main container', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const mainContainer = container.querySelector('.m-6')
      expect(mainContainer).toBeInTheDocument()
    })

    it('should style profile section card correctly', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const profileCard = container.querySelector('.bg-white.rounded-xl.shadow-lg.p-11')
      expect(profileCard).toBeInTheDocument()
    })

    it('should have proper spacing between sections', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const profileSection = container.querySelector('.mb-10')
      expect(profileSection).toBeInTheDocument()
    })

    it('should style page heading correctly', () => {
      renderWithRouter(<MyPage />)
      
      const heading = screen.getAllByText('나의 글')[1] // Second occurrence is the h2
      expect(heading).toHaveClass('text-4xl')
      expect(heading).toHaveClass('text-white')
    })

    it('should have responsive flex layout', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const flexContainer = container.querySelector('.md\\:flex-row')
      expect(flexContainer).toBeInTheDocument()
    })
  })

  describe('StatCard component integration', () => {
    it('should render StatCard for posts', () => {
      renderWithRouter(<MyPage />)
      
      const postStat = screen.getByText('29').parentElement
      expect(postStat).toHaveClass('flex')
      expect(postStat).toHaveClass('flex-col')
      expect(postStat).toHaveClass('items-center')
    })

    it('should render StatCard for views', () => {
      renderWithRouter(<MyPage />)
      
      const viewsStat = screen.getByText('72').parentElement
      expect(viewsStat).toHaveClass('flex')
      expect(viewsStat).toHaveClass('flex-col')
    })

    it('should render StatCard for likes', () => {
      renderWithRouter(<MyPage />)
      
      const likesStat = screen.getByText('48').parentElement
      expect(likesStat).toHaveClass('flex')
      expect(likesStat).toHaveClass('flex-col')
    })
  })

  describe('Profile section', () => {
    it('should render profile icon with correct styling', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const profileIconContainer = container.querySelector('.w-24.h-24.rounded-full')
      expect(profileIconContainer).toBeInTheDocument()
      expect(profileIconContainer).toHaveClass('bg-gray-200')
    })

    it('should center items in profile section', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const profileFlex = container.querySelector('.items-center.justify-around')
      expect(profileFlex).toBeInTheDocument()
    })
  })

  describe('Table headers styling', () => {
    it('should style table headers correctly', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const headers = container.querySelectorAll('th')
      expect(headers).toHaveLength(3)
      
      headers.forEach(header => {
        expect(header).toHaveClass('p-4')
        expect(header).toHaveClass('text-gray-500')
      })
    })

    it('should have centered alignment for number and views columns', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const headers = container.querySelectorAll('th')
      expect(headers[0]).toHaveClass('text-center') // 번호
      expect(headers[2]).toHaveClass('text-center') // 조회수
    })

    it('should have left alignment for title column', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const headers = container.querySelectorAll('th')
      expect(headers[1]).toHaveClass('text-left') // 제목
    })
  })

  describe('Data consistency', () => {
    it('should match dummy data structure with MyCardProps', () => {
      renderWithRouter(<MyPage />)
      
      // Verify that all required props are rendered
      // id (used in links), index, title, views
      expect(screen.getByText('열심히 사는 법')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('30')).toBeInTheDocument()
    })

    it('should render posts in array order', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const rows = container.querySelectorAll('tbody tr')
      expect(rows).toHaveLength(3)
    })
  })

  describe('Container structure', () => {
    it('should wrap table in overflow container', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const tableWrapper = container.querySelector('.overflow-hidden')
      expect(tableWrapper).toBeInTheDocument()
    })

    it('should have proper container styling', () => {
      const { container } = renderWithRouter(<MyPage />)
      
      const tableContainer = container.querySelector('.bg-white.rounded-xl.shadow-lg')
      const tables = tableContainer?.querySelectorAll('table')
      expect(tables?.length).toBe(1)
    })
  })
})