/** Marguerite stylisée, utilisée comme logo. */
export default function DaisyMark({ size = 28 }: { size?: number }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        {petals.map((a) => (
          <ellipse key={a} cx="20" cy="9.5" rx="3.2" ry="7.5" transform={`rotate(${a} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="4.6" fill="var(--brass)" />
    </svg>
  );
}
