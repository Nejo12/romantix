import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renders the ROMANTIX brand name', () => {
    render(<Footer />);
    expect(screen.getByText('ROMANTIX')).toBeInTheDocument();
  });

  it('displays company tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/Premium Quality/)).toBeInTheDocument();
    expect(screen.getByText(/100% Discreet/)).toBeInTheDocument();
    expect(screen.getByText(/Secure Payment/)).toBeInTheDocument();
    expect(screen.getByText(/romanti.x/)).toBeInTheDocument();
  });

  it('has centered text alignment', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('text-center');
  });

  it('has top border', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer?.style.borderTop).toContain('1px solid');
  });

  it('brand name has gradient styling', () => {
    const { container } = render(<Footer />);
    const brandName = screen.getByText('ROMANTIX');
    expect(brandName.style.background).toContain('linear-gradient');
  });

  it('tagline uses small text', () => {
    const { container } = render(<Footer />);
    const tagline = screen.getByText(/Premium Quality/);
    expect(tagline).toHaveClass('text-xs');
  });

  it('tagline has gray color', () => {
    const { container } = render(<Footer />);
    const tagline = screen.getByText(/Premium Quality/);
    expect(tagline).toHaveClass('text-gray-500');
  });
});
