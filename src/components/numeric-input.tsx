"use client";

import type React from "react";

import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NumericInputType = {
  className?: string;
  setValue: Dispatch<SetStateAction<string | null>>;
  value: string;
  placeholder?: string;
};

export default function NumericInput({
  setValue,
  value,
  className,
  placeholder,
}: NumericInputType) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty input
    if (newValue === "") {
      setValue("");
      setError(null);
      return;
    }

    // Check if input contains only numbers and at most one dot
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(newValue)) {
      setError("Only numbers and at most one decimal point are allowed");
      return;
    }

    // Count the number of dots
    const dotCount = (newValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      setError("Only one decimal point is allowed");
      return;
    }

    setValue(newValue);
    setError(null);
  };

  return (
    <>
      <Input
        id="numeric-input"
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(error && "border-red-500", className)}
        aria-invalid={!!error}
        aria-describedby={error ? "numeric-input-error" : undefined}
      />
      {error && (
        <p
          id="numeric-input-error"
          className="text-sm col-start-2 col-span-6 text-red-500"
        >
          {error}
        </p>
      )}
    </>
  );
}
