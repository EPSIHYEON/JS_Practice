import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BoardCard, { type BoardCardProps, type PostImageType } from './BoardCards'

describe('BoardCard Component', () => {
  describe('Rendering with different prop combinations', () => {
    it('should render card with title and snippet when type is noImage', () => {
      const props: BoardCardProps = {
        title: 'Test Blog Post',
        snippet: 'This is a test snippet',
        type: 'noImage'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
      expect(screen.getByText('This is a test snippet')).toBeInTheDocument()
    })

    it('should render card with image when type is image and imageUrl is provided', () => {
      const props: BoardCardProps = {
        title: 'Blog with Image',
        snippet: 'This post has an image',
        type: 'image',
        imageUrl: 'https://example.com/image.jpg'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.getByText('Blog with Image')).toBeInTheDocument()
      expect(screen.getByText('This post has an image')).toBeInTheDocument()
      
      const image = screen.getByRole('img')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
      expect(image).toHaveAttribute('alt', 'https://example.com/image.jpg')
    })

    it('should not render image when type is noImage even if imageUrl is provided', () => {
      const props: BoardCardProps = {
        title: 'No Image Post',
        snippet: 'Should not show image',
        type: 'noImage',
        imageUrl: 'https://example.com/image.jpg'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
      expect(screen.getByText('No Image Post')).toBeInTheDocument()
    })

    it('should not render image when type is image but imageUrl is missing', () => {
      const props: BoardCardProps = {
        title: 'Missing Image URL',
        snippet: 'Image type but no URL',
        type: 'image'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
      expect(screen.getByText('Missing Image URL')).toBeInTheDocument()
    })
  })

  describe('Content truncation and styling', () => {
    it('should render with long title', () => {
      const longTitle = 'This is a very long title that should be truncated because it exceeds the maximum width allowed by the card component'
      const props: BoardCardProps = {
        title: longTitle,
        snippet: 'Short snippet',
        type: 'noImage'
      }
      
      render(<BoardCard {...props} />)
      
      const titleElement = screen.getByText(longTitle)
      expect(titleElement).toBeInTheDocument()
      expect(titleElement).toHaveClass('truncate')
    })

    it('should render with long snippet', () => {
      const longSnippet = 'This is a very long snippet that should be displayed with ellipsis when it exceeds the available height. It contains multiple sentences and should overflow properly to demonstrate the text-ellipsis class working correctly in the component.'
      const props: BoardCardProps = {
        title: 'Short Title',
        snippet: longSnippet,
        type: 'noImage'
      }
      
      render(<BoardCard {...props} />)
      
      const snippetElement = screen.getByText(longSnippet)
      expect(snippetElement).toBeInTheDocument()
      expect(snippetElement).toHaveClass('text-ellipsis')
      expect(snippetElement).toHaveClass('overflow-hidden')
    })

    it('should have proper styling classes for card container', () => {
      const props: BoardCardProps = {
        title: 'Test',
        snippet: 'Test snippet',
        type: 'noImage'
      }
      
      const { container } = render(<BoardCard {...props} />)
      
      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('bg-white')
      expect(card).toHaveClass('rounded-lg')
      expect(card).toHaveClass('shadow-md')
      expect(card).toHaveClass('overflow-hidden')
    })
  })

  describe('Empty and special character handling', () => {
    it('should render with empty title', () => {
      const props: BoardCardProps = {
        title: '',
        snippet: 'Normal snippet',
        type: 'noImage'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.getByText('Normal snippet')).toBeInTheDocument()
    })

    it('should render with empty snippet', () => {
      const props: BoardCardProps = {
        title: 'Normal Title',
        snippet: '',
        type: 'noImage'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.getByText('Normal Title')).toBeInTheDocument()
    })

    it('should render with special characters in title', () => {
      const props: BoardCardProps = {
        title: '!@#$%^&*()_+-={}[]|:;<>?,.',
        snippet: 'Special chars test',
        type: 'noImage'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.getByText('!@#$%^&*()_+-={}[]|:;<>?,.')).toBeInTheDocument()
    })

    it('should render with Unicode characters', () => {
      const props: BoardCardProps = {
        title: '한글 제목 テスト العربية',
        snippet: 'Unicode snippet 🎉 ✨ 🚀',
        type: 'noImage'
      }
      
      render(<BoardCard {...props} />)
      
      expect(screen.getByText('한글 제목 テスト العربية')).toBeInTheDocument()
      expect(screen.getByText('Unicode snippet 🎉 ✨ 🚀')).toBeInTheDocument()
    })
  })

  describe('Image rendering edge cases', () => {
    it('should render image with relative URL', () => {
      const props: BoardCardProps = {
        title: 'Local Image',
        snippet: 'Using relative path',
        type: 'image',
        imageUrl: '/images/local-image.png'
      }
      
      render(<BoardCard {...props} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', '/images/local-image.png')
    })

    it('should render image with data URL', () => {
      const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      const props: BoardCardProps = {
        title: 'Data URL Image',
        snippet: 'Using data URL',
        type: 'image',
        imageUrl: dataUrl
      }
      
      render(<BoardCard {...props} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', dataUrl)
    })

    it('should handle imageUrl with query parameters', () => {
      const props: BoardCardProps = {
        title: 'Image with params',
        snippet: 'URL with query string',
        type: 'image',
        imageUrl: 'https://example.com/image.jpg?w=500&h=300&quality=high'
      }
      
      render(<BoardCard {...props} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg?w=500&h=300&quality=high')
    })
  })

  describe('Type safety', () => {
    it('should work with PostImageType type', () => {
      const imageType: PostImageType = 'image'
      const noImageType: PostImageType = 'noImage'
      
      const propsWithImage: BoardCardProps = {
        title: 'Test',
        snippet: 'Test',
        type: imageType,
        imageUrl: 'test.jpg'
      }
      
      const propsWithoutImage: BoardCardProps = {
        title: 'Test',
        snippet: 'Test',
        type: noImageType
      }
      
      const { rerender } = render(<BoardCard {...propsWithImage} />)
      expect(screen.getByRole('img')).toBeInTheDocument()
      
      rerender(<BoardCard {...propsWithoutImage} />)
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })

  describe('Component structure', () => {
    it('should maintain proper HTML structure', () => {
      const props: BoardCardProps = {
        title: 'Structure Test',
        snippet: 'Testing HTML structure',
        type: 'image',
        imageUrl: 'test.jpg'
      }
      
      const { container } = render(<BoardCard {...props} />)
      
      // Check for main container
      const card = container.firstChild as HTMLElement
      expect(card.tagName).toBe('DIV')
      
      // Check for image container
      const imgContainer = card.querySelector('.aspect-video')
      expect(imgContainer).toBeInTheDocument()
      
      // Check for text content container
      const textContainer = card.querySelector('.p-4')
      expect(textContainer).toBeInTheDocument()
    })
  })
})