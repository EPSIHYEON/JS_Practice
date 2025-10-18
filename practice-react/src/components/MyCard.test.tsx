import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import MyCard, { type MyCardProps } from './MyCard'

// Helper function to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('MyCard Component', () => {
  describe('Basic rendering', () => {
    it('should render all props correctly', () => {
      const props: MyCardProps = {
        id: 101,
        index: 1,
        title: 'Test Post Title',
        views: 42
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('Test Post Title')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('should render with zero views', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'No Views Post',
        views: 0
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('should render with large view count', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'Popular Post',
        views: 999999
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText('999999')).toBeInTheDocument()
    })
  })

  describe('Link functionality', () => {
    it('should create correct link to post detail page', () => {
      const props: MyCardProps = {
        id: 123,
        index: 5,
        title: 'Linked Post',
        views: 10
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/post/123')
    })

    it('should have hover effect on link', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'Hoverable Post',
        views: 5
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveClass('hover:underline')
    })

    it('should render link with different post IDs', () => {
      const props1: MyCardProps = { id: 1, index: 1, title: 'Post 1', views: 10 }
      const props2: MyCardProps = { id: 999, index: 2, title: 'Post 2', views: 20 }
      
      const { rerender } = renderWithRouter(<MyCard {...props1} />)
      expect(screen.getByRole('link')).toHaveAttribute('href', '/post/1')
      
      rerender(<BrowserRouter><MyCard {...props2} /></BrowserRouter>)
      expect(screen.getByRole('link')).toHaveAttribute('href', '/post/999')
    })
  })

  describe('Title display', () => {
    it('should render long title without truncation', () => {
      const longTitle = 'This is a very long title that contains many characters and should be displayed in full without any truncation in the table cell'
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: longTitle,
        views: 15
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('should render title with special characters', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'Special !@#$%^&*() Characters',
        views: 5
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText('Special !@#$%^&*() Characters')).toBeInTheDocument()
    })

    it('should render title with emojis', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'React 학습하기 🚀 ✨',
        views: 25
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText('React 학습하기 🚀 ✨')).toBeInTheDocument()
    })

    it('should render empty title', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: '',
        views: 0
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link.textContent).toBe('')
    })
  })

  describe('Index numbering', () => {
    it('should display correct index numbers', () => {
      const testCases = [
        { id: 1, index: 1, title: 'First', views: 10 },
        { id: 2, index: 2, title: 'Second', views: 20 },
        { id: 3, index: 10, title: 'Tenth', views: 30 },
        { id: 4, index: 100, title: 'Hundredth', views: 40 },
      ]
      
      testCases.forEach(props => {
        const { unmount } = renderWithRouter(<MyCard {...props} />)
        expect(screen.getByText(props.index.toString())).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Table row structure', () => {
    it('should render as table row element', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'Test',
        views: 10
      }
      
      const { container } = render(
        <BrowserRouter>
          <table>
            <tbody>
              <MyCard {...props} />
            </tbody>
          </table>
        </BrowserRouter>
      )
      
      const row = container.querySelector('tr')
      expect(row).toBeInTheDocument()
      expect(row).toHaveClass('border-b')
      expect(row).toHaveClass('hover:bg-gray-50')
    })

    it('should have three table cells', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'Test',
        views: 10
      }
      
      const { container } = render(
        <BrowserRouter>
          <table>
            <tbody>
              <MyCard {...props} />
            </tbody>
          </table>
        </BrowserRouter>
      )
      
      const cells = container.querySelectorAll('td')
      expect(cells).toHaveLength(3)
    })

    it('should apply correct styling to cells', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'Test',
        views: 10
      }
      
      const { container } = render(
        <BrowserRouter>
          <table>
            <tbody>
              <MyCard {...props} />
            </tbody>
          </table>
        </BrowserRouter>
      )
      
      const cells = container.querySelectorAll('td')
      
      // Index cell
      expect(cells[0]).toHaveClass('text-center')
      expect(cells[0]).toHaveClass('font-bold')
      
      // Title cell
      expect(cells[1]).toHaveClass('p-4')
      
      // Views cell
      expect(cells[2]).toHaveClass('text-center')
      expect(cells[2]).toHaveClass('font-bold')
    })
  })

  describe('Edge cases', () => {
    it('should handle negative index', () => {
      const props: MyCardProps = {
        id: 1,
        index: -1,
        title: 'Negative Index',
        views: 10
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText('-1')).toBeInTheDocument()
    })

    it('should handle negative views', () => {
      const props: MyCardProps = {
        id: 1,
        index: 1,
        title: 'Negative Views',
        views: -5
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      expect(screen.getByText('-5')).toBeInTheDocument()
    })

    it('should handle very large ID numbers', () => {
      const props: MyCardProps = {
        id: 9999999999,
        index: 1,
        title: 'Large ID',
        views: 100
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/post/9999999999')
    })

    it('should handle zero ID', () => {
      const props: MyCardProps = {
        id: 0,
        index: 1,
        title: 'Zero ID',
        views: 10
      }
      
      renderWithRouter(<MyCard {...props} />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/post/0')
    })
  })

  describe('Multiple cards rendering', () => {
    it('should render multiple cards in a table', () => {
      const cards: MyCardProps[] = [
        { id: 1, index: 1, title: 'First Post', views: 10 },
        { id: 2, index: 2, title: 'Second Post', views: 20 },
        { id: 3, index: 3, title: 'Third Post', views: 30 },
      ]
      
      render(
        <BrowserRouter>
          <table>
            <tbody>
              {cards.map(card => <MyCard key={card.id} {...card} />)}
            </tbody>
          </table>
        </BrowserRouter>
      )
      
      expect(screen.getByText('First Post')).toBeInTheDocument()
      expect(screen.getByText('Second Post')).toBeInTheDocument()
      expect(screen.getByText('Third Post')).toBeInTheDocument()
    })
  })
})