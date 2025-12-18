import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/common/Hero';

describe('Hero Component', () => {
  it('renders the hero section', () => {
    render(<Hero />);
    expect(screen.getByText('Fulfill Your Desires')).toBeInTheDocument();
  });

  it('displays the subtitle', () => {
    render(<Hero />);
    expect(screen.getByText('Premium Fantasy Collection')).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<Hero />);
    expect(screen.getByText(/Handcrafted with premium materials/i)).toBeInTheDocument();
  });

  it('highlights discretion in description', () => {
    render(<Hero />);
    const discretionText = screen.getByText('complete discretion');
    expect(discretionText).toHaveClass('text-pink-400');
  });

  it('renders two CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Explore Collection')).toBeInTheDocument();
    expect(screen.getByText('Configure Dream')).toBeInTheDocument();
  });

  it('renders Explore Collection as primary button', () => {
    const { container } = render(<Hero />);
    const exploreButton = screen.getByText('Explore Collection').closest('button');
    expect(exploreButton?.style.background).toContain('linear-gradient');
  });

  it('renders Configure Dream as secondary button', () => {
    const { container } = render(<Hero />);
    const configureButton = screen.getByText('Configure Dream').closest('button');
    expect(configureButton?.style.background).toBe('transparent');
  });

  it('has proper text hierarchy', () => {
    const { container } = render(<Hero />);
    const heading = screen.getByText('Fulfill Your Desires');
    expect(heading.tagName).toBe('H2');
  });
});
