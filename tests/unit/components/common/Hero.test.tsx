import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from '@/components/common/Hero';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Hero Component', () => {
  it('renders the hero section', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText('Fulfill Your Desires')).toBeInTheDocument();
  });

  it('displays the subtitle', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText('Premium Fantasy Collection')).toBeInTheDocument();
  });

  it('displays the description text', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText(/Handcrafted with premium materials/i)).toBeInTheDocument();
  });

  it('highlights discretion in description', () => {
    renderWithRouter(<Hero />);
    const discretionText = screen.getByText('complete discretion');
    expect(discretionText).toHaveClass('text-pink-400');
  });

  it('renders two CTA buttons', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText('Explore Collection')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders Explore Collection as primary button', () => {
    renderWithRouter(<Hero />);
    const exploreButton = screen.getByText('Explore Collection').closest('button');
    expect(exploreButton?.style.background).toContain('linear-gradient');
  });

  it('renders Get Started as secondary button', () => {
    renderWithRouter(<Hero />);
    const getStartedButton = screen.getByText('Get Started').closest('button');
    expect(getStartedButton?.style.background).toBe('transparent');
  });

  it('has proper text hierarchy', () => {
    renderWithRouter(<Hero />);
    const heading = screen.getByText('Fulfill Your Desires');
    expect(heading.tagName).toBe('H2');
  });
});
