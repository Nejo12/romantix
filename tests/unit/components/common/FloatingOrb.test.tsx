import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { FloatingOrb } from '@/components/common/FloatingOrb';

describe('FloatingOrb Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <FloatingOrb color="rgba(255, 45, 138, 0.1)" size={500} x="10%" y="20%" duration={9} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies correct size', () => {
    const { container } = render(
      <FloatingOrb color="rgba(255, 45, 138, 0.1)" size={400} x="10%" y="20%" duration={9} />
    );
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.width).toBe('400px');
    expect(orb.style.height).toBe('400px');
  });

  it('applies correct color', () => {
    const { container } = render(
      <FloatingOrb color="rgba(139, 61, 255, 0.12)" size={500} x="10%" y="20%" duration={9} />
    );
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.background).toContain('radial-gradient');
    expect(orb.style.background).toContain('rgba(139, 61, 255, 0.12)');
  });

  it('applies correct positioning', () => {
    const { container } = render(
      <FloatingOrb color="rgba(255, 45, 138, 0.1)" size={500} x="25%" y="30%" duration={9} />
    );
    const orb = container.firstChild as HTMLElement;
    expect(orb.style.left).toBe('25%');
    expect(orb.style.top).toBe('30%');
  });

  it('has pointer-events-none class', () => {
    const { container } = render(
      <FloatingOrb color="rgba(255, 45, 138, 0.1)" size={500} x="10%" y="20%" duration={9} />
    );
    const orb = container.firstChild as HTMLElement;
    expect(orb).toHaveClass('pointer-events-none');
  });

  it('is positioned absolutely', () => {
    const { container } = render(
      <FloatingOrb color="rgba(255, 45, 138, 0.1)" size={500} x="10%" y="20%" duration={9} />
    );
    const orb = container.firstChild as HTMLElement;
    expect(orb).toHaveClass('absolute');
  });

  it('has rounded-full class for circle shape', () => {
    const { container } = render(
      <FloatingOrb color="rgba(255, 45, 138, 0.1)" size={500} x="10%" y="20%" duration={9} />
    );
    const orb = container.firstChild as HTMLElement;
    expect(orb).toHaveClass('rounded-full');
  });
});
