import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuccessPage from '@/pages/Auth/Success';

describe('SuccessPage', () => {
  const mockOnContinue = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders success message', () => {
    render(<SuccessPage onContinue={mockOnContinue} />);
    expect(screen.getByText('Welcome to romanti.X!')).toBeInTheDocument();
  });

  it('displays success description', () => {
    render(<SuccessPage onContinue={mockOnContinue} />);
    expect(screen.getByText('Your account has been created successfully.')).toBeInTheDocument();
  });

  it('renders continue button', () => {
    render(<SuccessPage onContinue={mockOnContinue} />);
    expect(screen.getByText('Continue to Dashboard')).toBeInTheDocument();
  });

  it('calls onContinue when button is clicked', async () => {
    const user = userEvent.setup();
    render(<SuccessPage onContinue={mockOnContinue} />);

    await user.click(screen.getByText('Continue to Dashboard'));
    expect(mockOnContinue).toHaveBeenCalledTimes(1);
  });

  it('renders checkmark icon', () => {
    const { container } = render(<SuccessPage onContinue={mockOnContinue} />);
    const checkmarkPath = container.querySelector('path[d*="M5 13l4 4L19 7"]');
    expect(checkmarkPath).toBeInTheDocument();
  });

  it('checkmark is in a green gradient circle', () => {
    const { container } = render(<SuccessPage onContinue={mockOnContinue} />);
    const circle = container.querySelector('[style*="linear-gradient(135deg, rgb(16, 185, 129), rgb(20, 184, 166))"]');
    expect(circle).toBeInTheDocument();
  });

  it('has centered text alignment', () => {
    const { container } = render(<SuccessPage onContinue={mockOnContinue} />);
    const successDiv = container.querySelector('.text-center');
    expect(successDiv).toBeInTheDocument();
  });

  it('heading uses display font', () => {
    render(<SuccessPage onContinue={mockOnContinue} />);
    const heading = screen.getByText('Welcome to romanti.X!');
    expect(heading.style.fontFamily).toContain('Cormorant Garamond');
  });

  it('description has gray color', () => {
    render(<SuccessPage onContinue={mockOnContinue} />);
    const description = screen.getByText('Your account has been created successfully.');
    expect(description).toHaveClass('text-gray-400');
  });
});
