"use client";

import type React from "react";

import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { SizeObject } from "./calculator";

type NumericInputType = {
  className?: string;
  value: string;
  placeholder?: string;
  name?: string;
  errorClassName?: string;
  handleStateChange: (value: string) => void;
};

export default function NumericInput({
  value,
  className,
  placeholder,
  name,
  errorClassName,
  handleStateChange,
}: NumericInputType) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty input
    if (newValue === "") {
      handleStateChange(newValue);
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

    handleStateChange(newValue);
    setError(null);
  };

  return (
    <>
      <Input
        name={name}
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
          className={cn(
            "text-sm col-start-2 col-span-6 text-red-500",
            errorClassName,
          )}
        >
          {error}
        </p>
      )}
    </>
  );
}
