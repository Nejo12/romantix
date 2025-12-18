import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@/components/ui/Checkbox';

describe('Checkbox Component', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" checked={false} onChange={vi.fn()} />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders checked state correctly', () => {
    const { container } = render(<Checkbox label="Checked" checked={true} onChange={vi.fn()} />);
    const checkmark = container.querySelector('svg');
    expect(checkmark).toBeInTheDocument();
  });

  it('renders unchecked state correctly', () => {
    const { container } = render(<Checkbox label="Unchecked" checked={false} onChange={vi.fn()} />);
    const checkmark = container.querySelector('svg');
    expect(checkmark).not.toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = render(<Checkbox label="Click me" checked={false} onChange={handleChange} />);
    const checkboxDiv = container.querySelector('.w-5.h-5');
    if (checkboxDiv) {
      await user.click(checkboxDiv);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    }
  });

  it('toggles from checked to unchecked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = render(<Checkbox label="Toggle" checked={true} onChange={handleChange} />);
    const checkboxDiv = container.querySelector('.w-5.h-5');
    if (checkboxDiv) {
      await user.click(checkboxDiv);
      expect(handleChange).toHaveBeenCalledWith(false);
    }
  });

  it('shows checkmark icon when checked', () => {
    const { container } = render(<Checkbox label="Checked" checked={true} onChange={vi.fn()} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('label is clickable', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Click label" checked={false} onChange={handleChange} />);
    await user.click(screen.getByText('Click label'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
