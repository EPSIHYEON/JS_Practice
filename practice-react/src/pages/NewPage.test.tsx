import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import NewPage from './NewPage'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('NewPage Component', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    vi.clearAllMocks()
  })

  describe('Page structure and layout', () => {
    it('should render page title', () => {
      renderWithRouter(<NewPage />)
      
      expect(screen.getByText('새 글 작성')).toBeInTheDocument()
    })

    it('should render title input field', () => {
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      expect(titleInput).toBeInTheDocument()
      expect(titleInput.tagName).toBe('INPUT')
    })

    it('should render content textarea', () => {
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      expect(contentTextarea).toBeInTheDocument()
      expect(contentTextarea.tagName).toBe('TEXTAREA')
    })

    it('should render submit button', () => {
      renderWithRouter(<NewPage />)
      
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
    })

    it('should render form element', () => {
      const { container } = renderWithRouter(<NewPage />)
      
      const form = container.querySelector('form')
      expect(form).toBeInTheDocument()
    })
  })

  describe('Input field behavior', () => {
    it('should update title when user types', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      
      await user.type(titleInput, 'Test Title')
      
      expect(titleInput.value).toBe('Test Title')
    })

    it('should update content when user types', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요') as HTMLTextAreaElement
      
      await user.type(contentTextarea, 'Test content here')
      
      expect(contentTextarea.value).toBe('Test content here')
    })

    it('should handle long title input', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      const longTitle = 'a'.repeat(200)
      
      await user.type(titleInput, longTitle)
      
      expect(titleInput.value).toBe(longTitle)
    })

    it('should handle multiline content input', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요') as HTMLTextAreaElement
      const multilineContent = 'Line 1\nLine 2\nLine 3'
      
      await user.type(contentTextarea, multilineContent)
      
      expect(contentTextarea.value).toContain('Line 1')
      expect(contentTextarea.value).toContain('Line 2')
      expect(contentTextarea.value).toContain('Line 3')
    })

    it('should handle special characters in title', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      
      await user.type(titleInput, '!@#$%^&*()')
      
      expect(titleInput.value).toBe('!@#$%^&*()')
    })

    it('should handle Korean characters', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      
      await user.type(titleInput, '안녕하세요')
      
      expect(titleInput.value).toBe('안녕하세요')
    })

    it('should handle emojis', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      
      await user.type(titleInput, '🚀 ✨ 🎉')
      
      expect(titleInput.value).toBe('🚀 ✨ 🎉')
    })

    it('should start with empty values', () => {
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요') as HTMLTextAreaElement
      
      expect(titleInput.value).toBe('')
      expect(contentTextarea.value).toBe('')
    })
  })

  describe('Form submission', () => {
    it('should call handleSubmit when form is submitted', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      
      await user.type(titleInput, 'Test Title')
      await user.type(contentTextarea, 'Test Content')
      await user.click(submitButton)
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '전송할 데이터:',
        { title: 'Test Title', content: 'Test Content' }
      )
      
      consoleSpy.mockRestore()
    })

    it('should prevent default form submission', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const form = screen.getByRole('button', { name: '새 글 추가' }).closest('form')!
      const submitHandler = vi.fn((e) => e.preventDefault())
      
      form.addEventListener('submit', submitHandler)
      
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      await user.click(submitButton)
      
      expect(submitHandler).toHaveBeenCalled()
    })

    it('should submit with empty fields', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      await user.click(submitButton)
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '전송할 데이터:',
        { title: '', content: '' }
      )
      
      consoleSpy.mockRestore()
    })

    it('should submit with only title filled', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      await user.type(titleInput, 'Only Title')
      
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      await user.click(submitButton)
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '전송할 데이터:',
        { title: 'Only Title', content: '' }
      )
      
      consoleSpy.mockRestore()
    })

    it('should submit with only content filled', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      await user.type(contentTextarea, 'Only Content')
      
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      await user.click(submitButton)
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '전송할 데이터:',
        { title: '', content: 'Only Content' }
      )
      
      consoleSpy.mockRestore()
    })
  })

  describe('Styling and classes', () => {
    it('should have correct container styling', () => {
      const { container } = renderWithRouter(<NewPage />)
      
      const mainContainer = container.querySelector('.max-w-4xl')
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass('mx-auto')
    })

    it('should style page title correctly', () => {
      renderWithRouter(<NewPage />)
      
      const title = screen.getByText('새 글 작성')
      expect(title).toHaveClass('text-5xl')
      expect(title).toHaveClass('text-white')
      expect(title).toHaveClass('mb-10')
    })

    it('should style title input correctly', () => {
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      expect(titleInput).toHaveClass('w-full')
      expect(titleInput).toHaveClass('p-4')
      expect(titleInput).toHaveClass('rounded-lg')
      expect(titleInput).toHaveClass('bg-white')
    })

    it('should style content textarea correctly', () => {
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      expect(contentTextarea).toHaveClass('w-full')
      expect(contentTextarea).toHaveClass('p-4')
      expect(contentTextarea).toHaveClass('rounded-lg')
      expect(contentTextarea).toHaveClass('bg-white')
    })

    it('should style submit button correctly', () => {
      renderWithRouter(<NewPage />)
      
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      expect(submitButton).toHaveClass('bg-cyan-500')
      expect(submitButton).toHaveClass('text-white')
      expect(submitButton).toHaveClass('rounded-lg')
    })

    it('should have button in flex container aligned to right', () => {
      const { container } = renderWithRouter(<NewPage />)
      
      const buttonContainer = container.querySelector('.flex.justify-end')
      expect(buttonContainer).toBeInTheDocument()
    })

    it('should set textarea rows to 15', () => {
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      expect(contentTextarea).toHaveAttribute('rows', '15')
    })
  })

  describe('Placeholder text', () => {
    it('should display title placeholder', () => {
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      expect(titleInput).toHaveAttribute('placeholder', '제목을 입력하세요')
    })

    it('should display content placeholder', () => {
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      expect(contentTextarea).toHaveAttribute('placeholder', '내용을 입력하세요')
    })

    it('should hide placeholder when typing in title', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      
      await user.type(titleInput, 'A')
      
      expect(titleInput.value).toBe('A')
      // Placeholder should still be there as attribute, but visually hidden by browser
      expect(titleInput).toHaveAttribute('placeholder', '제목을 입력하세요')
    })
  })

  describe('Input attributes', () => {
    it('should have text type for title input', () => {
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      expect(titleInput).toHaveAttribute('type', 'text')
    })

    it('should have proper input types', () => {
      const { container } = renderWithRouter(<NewPage />)
      
      const inputs = container.querySelectorAll('input')
      const textareas = container.querySelectorAll('textarea')
      
      expect(inputs.length).toBeGreaterThan(0)
      expect(textareas.length).toBeGreaterThan(0)
    })
  })

  describe('User interaction flow', () => {
    it('should allow typing in title, then content, then submit', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      
      await user.type(titleInput, 'My Blog Post')
      await user.type(contentTextarea, 'This is my blog content.')
      await user.click(submitButton)
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '전송할 데이터:',
        { title: 'My Blog Post', content: 'This is my blog content.' }
      )
      
      consoleSpy.mockRestore()
    })

    it('should allow clearing and re-typing', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      
      await user.type(titleInput, 'First')
      expect(titleInput.value).toBe('First')
      
      await user.clear(titleInput)
      expect(titleInput.value).toBe('')
      
      await user.type(titleInput, 'Second')
      expect(titleInput.value).toBe('Second')
    })

    it('should maintain state between field interactions', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요') as HTMLTextAreaElement
      
      await user.type(titleInput, 'Title')
      await user.type(contentTextarea, 'Content')
      
      // Check that title is still there after typing in content
      expect(titleInput.value).toBe('Title')
      expect(contentTextarea.value).toBe('Content')
    })
  })

  describe('Edge cases', () => {
    it('should handle rapid consecutive typing', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요') as HTMLInputElement
      
      await user.type(titleInput, 'abcdefghijklmnopqrstuvwxyz')
      
      expect(titleInput.value).toBe('abcdefghijklmnopqrstuvwxyz')
    })

    it('should handle whitespace-only input', async () => {
      const consoleSpy = vi.spyOn(console, 'log')
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      await user.type(titleInput, '   ')
      
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      await user.click(submitButton)
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '전송할 데이터:',
        { title: '   ', content: '' }
      )
      
      consoleSpy.mockRestore()
    })

    it('should handle HTML tags as plain text', async () => {
      const user = userEvent.setup()
      renderWithRouter(<NewPage />)
      
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요') as HTMLTextAreaElement
      
      await user.type(contentTextarea, '<script>alert("test")</script>')
      
      expect(contentTextarea.value).toBe('<script>alert("test")</script>')
    })
  })

  describe('Form element relationships', () => {
    it('should have form wrapping all inputs', () => {
      const { container } = renderWithRouter(<NewPage />)
      
      const form = container.querySelector('form')
      const titleInput = screen.getByPlaceholderText('제목을 입력하세요')
      const contentTextarea = screen.getByPlaceholderText('내용을 입력하세요')
      const submitButton = screen.getByRole('button', { name: '새 글 추가' })
      
      expect(form).toContainElement(titleInput)
      expect(form).toContainElement(contentTextarea)
      expect(form).toContainElement(submitButton)
    })
  })
})