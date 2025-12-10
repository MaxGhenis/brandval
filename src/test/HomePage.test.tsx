import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

const renderHomePage = () => {
  return render(
    <BrowserRouter basename="">
      <HomePage />
    </BrowserRouter>
  )
}

describe('HomePage', () => {
  it('displays the oracle badge', () => {
    renderHomePage()
    expect(screen.getByText('Brand Name Oracle')).toBeInTheDocument()
  })

  it('displays the main headline', () => {
    renderHomePage()
    expect(screen.getByText(/Future Success/i)).toBeInTheDocument()
  })

  it('has mode toggle buttons', () => {
    renderHomePage()
    const modeToggle = document.querySelector('.mode-toggle')
    expect(modeToggle).toBeInTheDocument()
    expect(screen.getAllByText('Find Names').length).toBeGreaterThan(0)
    expect(screen.getByText('Evaluate a Name')).toBeInTheDocument()
  })

  it('shows workflow form by default (find mode)', () => {
    renderHomePage()
    expect(screen.getByPlaceholderText(/Describe your project/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Your name ideas/i)).toBeInTheDocument()
  })

  it('allows typing in the project description', () => {
    renderHomePage()
    const textarea = screen.getByPlaceholderText(/Describe your project/i) as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'A SaaS tool for tracking carbon emissions' } })
    expect(textarea.value).toBe('A SaaS tool for tracking carbon emissions')
  })

  it('switches to evaluate mode and shows brand name input', () => {
    renderHomePage()
    const evaluateBtn = screen.getByText('Evaluate a Name')
    fireEvent.click(evaluateBtn)
    const input = screen.getByPlaceholderText(/Enter a brand name/i) as HTMLInputElement
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'TestBrand' } })
    expect(input.value).toBe('TestBrand')
  })

  it('displays feature cards', () => {
    renderHomePage()
    expect(screen.getByText(/Domain.*Social Availability/i)).toBeInTheDocument()
    expect(screen.getByText('Similar Company Check')).toBeInTheDocument()
    expect(screen.getByText('AI Perception Forecasting')).toBeInTheDocument()
  })

  it('displays how it works section', () => {
    renderHomePage()
    expect(screen.getByText('How It Works')).toBeInTheDocument()
    expect(screen.getByText('Cast Your Names')).toBeInTheDocument()
    expect(screen.getByText('Receive the Forecast')).toBeInTheDocument()
    expect(screen.getByText('Choose Your Destiny')).toBeInTheDocument()
  })

  it('displays the CTA section', () => {
    renderHomePage()
    expect(screen.getByText(/See Your Name.*Future/i)).toBeInTheDocument()
    expect(screen.getByText('Consult the Oracle')).toBeInTheDocument()
  })
})
