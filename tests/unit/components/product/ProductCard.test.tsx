import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  brand: 'Test Brand',
  price: 1999,
  compareAtPrice: 2499,
  image: 'https://example.com/image.jpg',
  badges: ['new', 'sale'],
  specs: '165cm • 32kg • D-Cup',
};

describe('ProductCard Component', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders product brand', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    expect(screen.getByText('€1999')).toBeInTheDocument();
  });

  it('renders compare at price when provided', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    expect(screen.getByText('€2499')).toBeInTheDocument();
  });

  it('calculates and displays discount percentage', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    const discount = Math.round((1 - 1999 / 2499) * 100);
    expect(screen.getByText(`-${discount}%`)).toBeInTheDocument();
  });

  it('renders product specs when provided', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    expect(screen.getByText('165cm • 32kg • D-Cup')).toBeInTheDocument();
  });

  it('renders product image', () => {
    const { container } = render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    const imageDiv = container.querySelector('.bg-cover');
    expect(imageDiv).toBeInTheDocument();
  });

  it('renders all product badges', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    expect(screen.getByText('new')).toBeInTheDocument();
    expect(screen.getByText('sale')).toBeInTheDocument();
  });

  it('calls onAdd when add to cart button is clicked', async () => {
    const handleAdd = vi.fn();
    const user = userEvent.setup();

    const { container } = render(<ProductCard product={mockProduct} onAdd={handleAdd} />);
    const addButton = container.querySelector('button[class*="w-10 h-10"]');

    if (addButton) {
      await user.click(addButton);
      expect(handleAdd).toHaveBeenCalledTimes(1);
    }
  });

  it('renders Quick View button', () => {
    render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    expect(screen.getByText('Quick View')).toBeInTheDocument();
  });

  it('renders wishlist button', () => {
    const { container } = render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    const wishlistButton = container.querySelector('button[class*="top-3 right-3"]');
    expect(wishlistButton).toBeInTheDocument();
  });

  it('renders without badges when none provided', () => {
    const productWithoutBadges = { ...mockProduct, badges: undefined };
    render(<ProductCard product={productWithoutBadges} onAdd={vi.fn()} />);
    expect(screen.queryByText('new')).not.toBeInTheDocument();
  });

  it('renders without compare price when not provided', () => {
    const productWithoutCompare = { ...mockProduct, compareAtPrice: undefined };
    render(<ProductCard product={productWithoutCompare} onAdd={vi.fn()} />);
    expect(screen.queryByText('€2499')).not.toBeInTheDocument();
  });

  it('renders without specs when not provided', () => {
    const productWithoutSpecs = { ...mockProduct, specs: undefined };
    render(<ProductCard product={productWithoutSpecs} onAdd={vi.fn()} />);
    expect(screen.queryByText('165cm • 32kg • D-Cup')).not.toBeInTheDocument();
  });

  it('renders add to cart button with icon', () => {
    const { container } = render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    const addButton = container.querySelector('button[class*="w-10 h-10"]');
    expect(addButton).toBeInTheDocument();
    const svgPath = container.querySelector('path');
    expect(svgPath).toBeInTheDocument();
  });

  it('has hover effects class', () => {
    const { container } = render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    const card = container.firstChild;
    expect(card).toHaveClass('group');
  });

  it('has cursor-pointer class', () => {
    const { container } = render(<ProductCard product={mockProduct} onAdd={vi.fn()} />);
    const card = container.firstChild;
    expect(card).toHaveClass('cursor-pointer');
  });
});
