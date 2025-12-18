import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '@/pages/Auth/Register';

describe('RegisterPage', () => {
  const mockOnSwitch = vi.fn();
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders registration form', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('displays subtitle', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Join romanti.X today')).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Password')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('renders terms checkbox', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText(/I agree to the Terms of Service/i)).toBeInTheDocument();
  });

  it('renders age verification checkbox', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText(/I confirm I am 18 years or older/i)).toBeInTheDocument();
  });

  it('renders create account button', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('renders link to sign in', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('allows user to fill out form', async () => {
    const user = userEvent.setup();
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getAllByLabelText('Password')[0], 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');

    expect(screen.getByLabelText('First Name')).toHaveValue('John');
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
  });

  it('shows password strength indicator', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByText('Too weak')).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    const user = userEvent.setup();
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    await user.type(screen.getAllByLabelText('Password')[0], 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'DifferentPassword');

    expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
  });

  it('button is disabled when checkboxes not checked', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    const button = screen.getByRole('button', { name: /create account/i });
    expect(button).toBeDisabled();
  });

  it('button is enabled when both checkboxes are checked', async () => {
    const user = userEvent.setup();
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]); // Terms
    await user.click(checkboxes[1]); // Age verification

    const button = screen.getByRole('button', { name: /create account/i });
    expect(button).not.toBeDisabled();
  });

  it('calls onSwitch when sign in is clicked', async () => {
    const user = userEvent.setup();
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    await user.click(screen.getByText('Sign in'));
    expect(mockOnSwitch).toHaveBeenCalledTimes(1);
  });

  it('submits form when all validations pass', async () => {
    const user = userEvent.setup();
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getAllByLabelText('Password')[0], 'Password123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password123!');

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);

    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    }, { timeout: 2000 });
  });

  it('all required fields have required attribute', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByPlaceholderText('John')).toBeRequired();
    expect(screen.getByPlaceholderText('Doe')).toBeRequired();
    expect(screen.getByPlaceholderText('your@email.com')).toBeRequired();
  });

  it('email field has correct type', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('password fields have correct type', () => {
    render(<RegisterPage onSwitch={mockOnSwitch} onSuccess={mockOnSuccess} />);
    expect(screen.getAllByLabelText('Password')[0]).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('Confirm Password')).toHaveAttribute('type', 'password');
  });
});
