import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrength } from '@/components/ui/PasswordStrength';

describe('PasswordStrength Component', () => {
  it('does not render when password is empty', () => {
    const { container } = render(<PasswordStrength password="" />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('shows "Too weak" for very short password', () => {
    render(<PasswordStrength password="123" />);
    expect(screen.getByText('Too weak')).toBeInTheDocument();
  });

  it('shows "Weak" for password with 8+ chars', () => {
    render(<PasswordStrength password="password" />);
    expect(screen.getByText('Weak')).toBeInTheDocument();
  });

  it('shows "Fair" for password with length and uppercase', () => {
    render(<PasswordStrength password="Password" />);
    expect(screen.getByText('Fair')).toBeInTheDocument();
  });

  it('shows "Good" for password with length, uppercase, and number', () => {
    render(<PasswordStrength password="Password123" />);
    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('shows "Strong" for password with all character types', () => {
    render(<PasswordStrength password="Password123!" />);
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  it('renders strength meter bars', () => {
    const { container } = render(<PasswordStrength password="test123" />);
    const bars = container.querySelectorAll('[class*="h-1"]');
    expect(bars.length).toBe(4);
  });

  it('displays different colors for different strengths', () => {
    const { container, rerender } = render(<PasswordStrength password="password" />);
    const weakText = screen.getByText('Weak');
    expect(weakText.style.color).toBe('rgb(239, 68, 68)');

    rerender(<PasswordStrength password="Password123!" />);
    const strongText = screen.getByText('Strong');
    expect(strongText.style.color).toBe('rgb(16, 185, 129)');
  });
});
