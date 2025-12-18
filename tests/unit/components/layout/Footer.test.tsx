import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renders the romanti.X brand name', () => {
    const { container } = render(<Footer />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Check for text content in SVG
    const textElement = container.querySelector('text');
    expect(textElement?.textContent).toContain('romanti');
    expect(textElement?.textContent).toContain('X');
  });

  it('displays company tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/Premium Quality/)).toBeInTheDocument();
    expect(screen.getByText(/100% Discreet/)).toBeInTheDocument();
    expect(screen.getByText(/Secure Payment/)).toBeInTheDocument();
    expect(screen.getByText(/romanti\.X/i)).toBeInTheDocument();
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
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Check for gradient definitions in SVG
    const gradient = container.querySelector('#textGradient');
    expect(gradient).toBeInTheDocument();
    // Check that text uses the gradient
    const textElement = container.querySelector('text');
    expect(textElement?.getAttribute('fill')).toBe('url(#textGradient)');
  });

  it('tagline uses small text', () => {
    render(<Footer />);
    const tagline = screen.getByText(/Premium Quality/);
    expect(tagline).toHaveClass('text-xs');
  });

  it('tagline has gray color', () => {
    render(<Footer />);
    const tagline = screen.getByText(/Premium Quality/);
    expect(tagline).toHaveClass('text-gray-500');
  });
});
