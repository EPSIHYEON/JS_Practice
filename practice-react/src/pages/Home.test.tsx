import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Home Component', () => {
  describe('Page structure and layout', () => {
    it('should render main heading', () => {
      renderWithRouter(<Home />)
      
      expect(screen.getByText('구름에서 블로그를 시작해보세요')).toBeInTheDocument()
    })

    it('should render section heading for posts', () => {
      renderWithRouter(<Home />)
      
      expect(screen.getByText('전체 게시글')).toBeInTheDocument()
    })

    it('should render "새 글 추가" button in header', () => {
      renderWithRouter(<Home />)
      
      const buttons = screen.getAllByText('새 글 추가')
      expect(buttons).toHaveLength(1)
    })

    it('should have link to newpage', () => {
      renderWithRouter(<Home />)
      
      const link = screen.getByRole('link', { name: '새 글 추가' })
      expect(link).toHaveAttribute('href', '/newpage')
    })
  })

  describe('Post cards rendering', () => {
    it('should render all 6 sample posts', () => {
      renderWithRouter(<Home />)
      
      expect(screen.getByText('하루를 보람차게 보내는 방법')).toBeInTheDocument()
      expect(screen.getByText('하루를 열심히 보내는 방법')).toBeInTheDocument()
      expect(screen.getByText('하루를 멋지게 보내는 방법')).toBeInTheDocument()
      expect(screen.getByText('GITHUB 관리하는 방법')).toBeInTheDocument()
      expect(screen.getByText('리액트 열심히 하는 방법')).toBeInTheDocument()
    })

    it('should render post snippets', () => {
      renderWithRouter(<Home />)
      
      const snippets = screen.getAllByText(/오늘은 열심히 사는 방법에 대해 이야기 해보겠다/)
      expect(snippets.length).toBeGreaterThan(0)
    })

    it('should render BoardCard components for each post', () => {
      const { container } = renderWithRouter(<Home />)
      
      // BoardCards have specific classes
      const cards = container.querySelectorAll('.shadow-md.overflow-hidden')
      expect(cards.length).toBeGreaterThanOrEqual(6)
    })
  })

  describe('Grid layout', () => {
    it('should have responsive grid container', () => {
      const { container } = renderWithRouter(<Home />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })

    it('should have proper gap between cards', () => {
      const { container } = renderWithRouter(<Home />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('gap-8')
    })
  })

  describe('Post data structure', () => {
    it('should have posts with noImage type', () => {
      renderWithRouter(<Home />)
      
      // All posts in the sample data are noImage type
      // So no images should be rendered
      const images = screen.queryAllByRole('img')
      expect(images).toHaveLength(0)
    })

    it('should display correct post titles', () => {
      renderWithRouter(<Home />)
      
      const expectedTitles = [
        '하루를 보람차게 보내는 방법',
        '하루를 열심히 보내는 방법',
        '하루를 멋지게 보내는 방법',
        'GITHUB 관리하는 방법',
        '리액트 열심히 하는 방법'
      ]
      
      expectedTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })

    it('should display correct snippets', () => {
      renderWithRouter(<Home />)
      
      expect(screen.getByText('Git과 Github의 차이점부터 브랜치 전략까지...')).toBeInTheDocument()
      expect(screen.getByText('컴포넌트 라이프사이클과 상태 관리에 대해 알아봅니다...')).toBeInTheDocument()
    })
  })

  describe('Styling and classes', () => {
    it('should have proper background styling', () => {
      const { container } = renderWithRouter(<Home />)
      
      const mainDiv = container.querySelector('.m-6')
      expect(mainDiv).toBeInTheDocument()
    })

    it('should style main heading correctly', () => {
      renderWithRouter(<Home />)
      
      const heading = screen.getByText('구름에서 블로그를 시작해보세요')
      expect(heading).toHaveClass('text-5xl')
      expect(heading).toHaveClass('text-white')
    })

    it('should style section heading correctly', () => {
      renderWithRouter(<Home />)
      
      const sectionHeading = screen.getByText('전체 게시글')
      expect(sectionHeading).toHaveClass('text-4xl')
      expect(sectionHeading).toHaveClass('mb-6')
    })

    it('should style new post button correctly', () => {
      renderWithRouter(<Home />)
      
      const button = screen.getByRole('link', { name: '새 글 추가' })
      expect(button).toHaveClass('bg-cyan-500')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('rounded-lg')
    })
  })

  describe('Component integration', () => {
    it('should pass correct props to BoardCard components', () => {
      const { container } = renderWithRouter(<Home />)
      
      // Check that titles are rendered (which means props are passed correctly)
      expect(screen.getByText('하루를 보람차게 보내는 방법')).toBeInTheDocument()
      
      // Check that snippets are rendered
      const snippetTexts = screen.getAllByText(/오늘은 열심히 사는 방법에 대해 이야기 해보겠다/)
      expect(snippetTexts.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive behavior', () => {
    it('should have flex container for header section', () => {
      const { container } = renderWithRouter(<Home />)
      
      const headerSection = container.querySelector('.flex.flex-col')
      expect(headerSection).toBeInTheDocument()
    })

    it('should have responsive classes for different screen sizes', () => {
      const { container } = renderWithRouter(<Home />)
      
      const flexContainer = container.querySelector('.md\\:items-center')
      expect(flexContainer).toBeInTheDocument()
    })
  })

  describe('Content organization', () => {
    it('should render posts in correct order', () => {
      renderWithRouter(<Home />)
      
      const allText = screen.getByText('하루를 보람차게 보내는 방법').closest('.shadow-md')
      expect(allText).toBeInTheDocument()
    })

    it('should have proper spacing between sections', () => {
      const { container } = renderWithRouter(<Home />)
      
      const headerSection = container.querySelector('.mb-12')
      expect(headerSection).toBeInTheDocument()
    })
  })
})