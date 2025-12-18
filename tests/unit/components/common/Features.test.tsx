import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Features } from '@/components/common/Features';

describe('Features Component', () => {
  it('renders all four feature cards', () => {
    render(<Features />);
    expect(screen.getByText('100% Discreet')).toBeInTheDocument();
    expect(screen.getByText('Premium Quality')).toBeInTheDocument();
    expect(screen.getByText('Free Shipping')).toBeInTheDocument();
    expect(screen.getByText('Customizable')).toBeInTheDocument();
  });

  it('displays feature descriptions', () => {
    render(<Features />);
    expect(screen.getByText('Anonymous delivery')).toBeInTheDocument();
    expect(screen.getByText('Medical-grade materials')).toBeInTheDocument();
    expect(screen.getByText('Orders over €500')).toBeInTheDocument();
    expect(screen.getByText('Build your dream')).toBeInTheDocument();
  });

  it('displays feature icons', () => {
    render(<Features />);
    expect(screen.getByText('🔒')).toBeInTheDocument();
    expect(screen.getByText('✨')).toBeInTheDocument();
    expect(screen.getByText('🚚')).toBeInTheDocument();
    expect(screen.getByText('💫')).toBeInTheDocument();
  });

  it('renders as a grid', () => {
    const { container } = render(<Features />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('has responsive grid columns', () => {
    const { container } = render(<Features />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-2', 'md:grid-cols-4');
  });
});
