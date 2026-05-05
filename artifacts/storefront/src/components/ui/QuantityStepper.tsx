interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({ value, onChange, min = 1, max = 99 }: QuantityStepperProps) {
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center h-10 border border-border rounded-[2px] w-[120px]">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="w-10 h-full flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
      >
        −
      </button>
      <div className="flex-1 h-full flex items-center justify-center text-[13px] font-medium text-foreground border-x border-border">
        {value}
      </div>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="w-10 h-full flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
      >
        +
      </button>
    </div>
  );
}
