interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center h-10 border border-[var(--border)] rounded-[2px] w-[120px]">
      <button
        type="button"
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        className="w-10 h-full flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--card)] disabled:opacity-40 transition-colors text-lg"
      >
        −
      </button>
      <div className="flex-1 h-full flex items-center justify-center text-[13px] font-medium text-[var(--foreground)] border-x border-[var(--border)]">
        {value}
      </div>
      <button
        type="button"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        className="w-10 h-full flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--card)] disabled:opacity-40 transition-colors text-lg"
      >
        +
      </button>
    </div>
  );
}
