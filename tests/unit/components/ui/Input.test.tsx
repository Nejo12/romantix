import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';

describe('Input Component', () => {
  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders without label when not provided', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('handles text input', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input label="Username" onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'testuser');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders with type password', () => {
    render(<Input type="password" label="Password" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('displays error message when provided', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('displays error message with red styling', () => {
    render(<Input label="Email" error="Invalid email" />);
    const errorMessage = screen.getByText('Invalid email');
    expect(errorMessage).toHaveClass('text-red-400');
  });

  it('renders with icon when provided', () => {
    const Icon = () => <span data-testid="custom-icon">Icon</span>;
    render(<Input label="Email" icon={<Icon />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('is required when required prop is true', () => {
    render(<Input label="Email" required />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('applies custom className', () => {
    render(<Input label="Test" className="custom-class" />);
    const inputWrapper = screen.getByRole('textbox').parentElement;
    expect(inputWrapper).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input label="Test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
