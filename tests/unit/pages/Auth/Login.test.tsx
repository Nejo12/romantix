import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/pages/Auth/Login';

describe('LoginPage', () => {
  const mockOnSwitch = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('displays subtitle', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Enter your credentials to continue')).toBeInTheDocument();
  });

  it('renders email input field', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders password input field', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('renders remember me checkbox', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Remember me')).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders link to create account', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Create one')).toBeInTheDocument();
  });

  it('allows user to type email', async () => {
    const user = userEvent.setup();
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('allows user to type password', async () => {
    const user = userEvent.setup();
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('allows user to toggle remember me', async () => {
    const user = userEvent.setup();
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('calls onSwitch when create account is clicked', async () => {
    const user = userEvent.setup();
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    await user.click(screen.getByText('Create one'));
    expect(mockOnSwitch).toHaveBeenCalledTimes(1);
  });

  it('submits form and calls onSuccess', async () => {
    const user = userEvent.setup();
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    }, { timeout: 2000 });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    // Button is disabled during loading (text is replaced with spinner)
    expect(submitButton).toBeDisabled();
  });

  it('email input has correct type', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('password input has correct type', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('email and password fields are required', () => {
    render(<LoginPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Password')).toBeRequired();
  });
});
