import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

describe('Header Component', () => {
  it('renders the ROMANTIX logo', () => {
    render(<Header cartCount={0} />);
    expect(screen.getByText('ROMANTIX')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header cartCount={0} />);
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Fantasy')).toBeInTheDocument();
    expect(screen.getByText('Configure')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders cart icon', () => {
    const { container } = render(<Header cartCount={0} />);
    const cartIcon = container.querySelector('svg');
    expect(cartIcon).toBeInTheDocument();
  });

  it('does not show cart count when count is 0', () => {
    render(<Header cartCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows cart count badge when count is greater than 0', () => {
    render(<Header cartCount={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('updates cart count when prop changes', () => {
    const { rerender } = render(<Header cartCount={0} />);
    expect(screen.queryByText('5')).not.toBeInTheDocument();

    rerender(<Header cartCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('has sticky positioning', () => {
    const { container } = render(<Header cartCount={0} />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky', 'top-0');
  });

  it('has high z-index for layering', () => {
    const { container } = render(<Header cartCount={0} />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('z-50');
  });

  it('cart count badge has gradient background', () => {
    const { container } = render(<Header cartCount={1} />);
    const badge = screen.getByText('1');
    expect(badge.style.background).toContain('linear-gradient');
  });

  it('displays cart count up to 99', () => {
    render(<Header cartCount={99} />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('navigation is hidden on mobile', () => {
    const { container } = render(<Header cartCount={0} />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('hidden', 'md:flex');
  });
});
