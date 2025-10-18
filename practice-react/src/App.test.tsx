import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  describe('Navigation bar', () => {
    it('should render navigation bar', () => {
      render(<App />)
      
      expect(screen.getByText('GURUM')).toBeInTheDocument()
    })

    it('should render logo as link to home', () => {
      render(<App />)
      
      const logo = screen.getByText('GURUM')
      expect(logo).toHaveAttribute('href', '/')
      expect(logo.tagName).toBe('A')
    })

    it('should render "새글 추가" link', () => {
      render(<App />)
      
      const newPostLink = screen.getByText('새글 추가')
      expect(newPostLink).toBeInTheDocument()
      expect(newPostLink).toHaveAttribute('href', '/newpage')
    })

    it('should render "마이페이지" link', () => {
      render(<App />)
      
      const myPageLink = screen.getByText('마이페이지')
      expect(myPageLink).toBeInTheDocument()
      expect(myPageLink).toHaveAttribute('href', '/mypage')
    })

    it('should render profile icon', () => {
      const { container } = render(<App />)
      
      const profileIcon = container.querySelector('svg')
      expect(profileIcon).toBeInTheDocument()
      expect(profileIcon).toHaveClass('w-8')
      expect(profileIcon).toHaveClass('h-8')
    })
  })

  describe('Layout and styling', () => {
    it('should have min-h-screen background', () => {
      const { container } = render(<App />)
      
      const mainDiv = container.querySelector('.min-h-screen')
      expect(mainDiv).toBeInTheDocument()
      expect(mainDiv).toHaveClass('bg-sky-200')
    })

    it('should style navigation with proper classes', () => {
      const { container } = render(<App />)
      
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveClass('flex')
      expect(nav).toHaveClass('items-center')
      expect(nav).toHaveClass('p-5')
    })

    it('should have logo with bold styling', () => {
      render(<App />)
      
      const logo = screen.getByText('GURUM')
      expect(logo).toHaveClass('text-3xl')
      expect(logo).toHaveClass('font-bold')
    })

    it('should align menu items to the right', () => {
      const { container } = render(<App />)
      
      const menuContainer = container.querySelector('.ml-auto')
      expect(menuContainer).toBeInTheDocument()
      expect(menuContainer).toHaveClass('flex')
      expect(menuContainer).toHaveClass('items-center')
    })

    it('should have proper gap between menu items', () => {
      const { container } = render(<App />)
      
      const menuContainer = container.querySelector('.gap-4')
      expect(menuContainer).toBeInTheDocument()
    })

    it('should style profile icon container', () => {
      const { container } = render(<App />)
      
      const profileContainer = container.querySelector('.w-10.h-10.rounded-full')
      expect(profileContainer).toBeInTheDocument()
      expect(profileContainer).toHaveClass('bg-gray-300')
      expect(profileContainer).toHaveClass('flex')
      expect(profileContainer).toHaveClass('items-center')
      expect(profileContainer).toHaveClass('justify-center')
    })
  })

  describe('Routing setup', () => {
    it('should render Home page by default', () => {
      render(<App />)
      
      // Home page contains this heading
      expect(screen.getByText('구름에서 블로그를 시작해보세요')).toBeInTheDocument()
    })

    it('should have BrowserRouter wrapping the app', () => {
      const { container } = render(<App />)
      
      // Navigation links should work, indicating router is present
      const links = container.querySelectorAll('a')
      expect(links.length).toBeGreaterThan(0)
    })
  })

  describe('Navigation links', () => {
    it('should have correct href for all navigation links', () => {
      render(<App />)
      
      const logoLink = screen.getByText('GURUM')
      const newPageLink = screen.getByText('새글 추가')
      const myPageLink = screen.getByText('마이페이지')
      
      expect(logoLink).toHaveAttribute('href', '/')
      expect(newPageLink).toHaveAttribute('href', '/newpage')
      expect(myPageLink).toHaveAttribute('href', '/mypage')
    })

    it('should style menu links consistently', () => {
      const { container } = render(<App />)
      
      const menuContainer = container.querySelector('.text-\\[20px\\]')
      expect(menuContainer).toBeInTheDocument()
    })

    it('should style my page link with gray color', () => {
      render(<App />)
      
      const myPageLink = screen.getByText('마이페이지')
      expect(myPageLink).toHaveClass('text-gray-700')
    })
  })

  describe('Profile icon SVG', () => {
    it('should render user icon SVG', () => {
      const { container } = render(<App />)
      
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('viewBox', '0 0 20 20')
    })

    it('should have fillRule and clipRule attributes on path', () => {
      const { container } = render(<App />)
      
      const path = container.querySelector('path')
      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('fillRule', 'evenodd')
      expect(path).toHaveAttribute('clipRule', 'evenodd')
    })

    it('should style SVG with white color', () => {
      const { container } = render(<App />)
      
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('text-white')
    })
  })

  describe('Component structure', () => {
    it('should have nav element within main container', () => {
      const { container } = render(<App />)
      
      const mainDiv = container.querySelector('.min-h-screen')
      const nav = container.querySelector('nav')
      
      expect(mainDiv).toContainElement(nav)
    })

    it('should render Routes component for routing', () => {
      render(<App />)
      
      // Home route should be rendered by default
      expect(screen.getByText('전체 게시글')).toBeInTheDocument()
    })
  })

  describe('Menu layout', () => {
    it('should have three menu items in right section', () => {
      render(<App />)
      
      expect(screen.getByText('새글 추가')).toBeInTheDocument()
      expect(screen.getByText('마이페이지')).toBeInTheDocument()
      
      const { container } = render(<App />)
      const profileIcon = container.querySelector('.w-10.h-10.rounded-full')
      expect(profileIcon).toBeInTheDocument()
    })

    it('should maintain proper visual hierarchy', () => {
      const { container } = render(<App />)
      
      const nav = container.querySelector('nav')
      const logo = screen.getByText('GURUM')
      const menuContainer = container.querySelector('.ml-auto')
      
      expect(nav).toContainElement(logo)
      expect(nav).toContainElement(menuContainer!)
    })
  })

  describe('Responsive behavior', () => {
    it('should have flex layout for navigation', () => {
      const { container } = render(<App />)
      
      const nav = container.querySelector('nav')
      expect(nav).toHaveClass('flex')
      expect(nav).toHaveClass('items-center')
    })

    it('should use ml-auto to push menu to right', () => {
      const { container } = render(<App />)
      
      const menuDiv = container.querySelector('.ml-auto')
      expect(menuDiv).toBeInTheDocument()
    })
  })

  describe('Profile icon container', () => {
    it('should be circular', () => {
      const { container } = render(<App />)
      
      const profileContainer = container.querySelector('.rounded-full')
      expect(profileContainer).toHaveClass('w-10')
      expect(profileContainer).toHaveClass('h-10')
    })

    it('should center content', () => {
      const { container } = render(<App />)
      
      const profileContainer = container.querySelector('.w-10.h-10')
      expect(profileContainer).toHaveClass('flex')
      expect(profileContainer).toHaveClass('items-center')
      expect(profileContainer).toHaveClass('justify-center')
    })

    it('should hide overflow', () => {
      const { container } = render(<App />)
      
      const profileContainer = container.querySelector('.overflow-hidden')
      expect(profileContainer).toBeInTheDocument()
    })
  })
})