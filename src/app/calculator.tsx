"use client";

export const dynamic = "force-dynamic";

import { useLocalStorage } from "~/hooks/use-local-storage";
import { ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { Container } from "~/components/container";
import { InstallPrompt } from "~/components/install-prompt";
import { Label } from "~/components/ui/label";
import NumericInput from "./numeric-input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "~/components/ui/select";
import { z } from "zod";
import { useEffect, useState } from "react";
import Image from "next/image";

const isValidUnit = z.enum(["ft", "in", "cm", "m"]).parse;
export type SizeObject = {
  value: string;
  unit: "ft" | "in" | "cm" | "m";
};

export default function Calculator() {
  const [width, setWidth] = useLocalStorage<SizeObject>("w", {
    value: "0",
    unit: "ft",
  });
  const [height, setHeight] = useLocalStorage<SizeObject>("h", {
    value: "0",
    unit: "ft",
  });

  const [details, setDetails] = useLocalStorage("details", {
    qty: "1",
    sqft: "20",
  });
  const [total, setTotal] = useLocalStorage("total", 0);

  useEffect(() => {
    // Debounce the total calculation
    const timeoutId = setTimeout(() => {
      const qty = Number(details.qty);
      const sqft = Number(details.sqft);

      const calculatedTotal =
        calculateSize(width.value, "width") *
        calculateSize(height.value, "height") *
        sqft *
        qty;
      sqft * qty;
      setTotal(Math.floor(calculatedTotal));
    }, 300); // Adjust debounce time as needed (e.g., 300ms)

    // Cleanup function to clear the timeout if any dependency changes
    return () => clearTimeout(timeoutId);
  }, [width, height, details]); // Dependencies: effect runs when any of these change

  const calculateSize = (size: string, sizeType: "width" | "height") => {
    const unit = sizeType === "width" ? width.unit : height.unit;
    const value = Number(size);
    let actualNewValue: number;

    if (unit === "ft") {
      actualNewValue = value;
    } else if (unit === "in") {
      actualNewValue = value / 12;
    } else if (unit === "cm") {
      actualNewValue = value / 2.54 / 12;
    } else {
      actualNewValue = (value * 100) / 2.54 / 12;
    }

    return actualNewValue;
  };

  const handleUnitChange = (unit: string, sizeType: "width" | "height") => {
    const a = isValidUnit(unit);
    if (sizeType === "width") {
      setWidth((oldValue) => ({ ...oldValue, unit: a }));
    } else {
      setHeight((oldValue) => ({ ...oldValue, unit: a }));
    }
  };

  return (
    <div className="flex gap-2 p-2  items-center  h-screen flex-col">
      <div className="w-full max-w-lg items-center justify-center flex p-4">
        <Image
          alt="Darcy Graphix Logo"
          width={400}
          height={0}
          src="/logo.svg"
        />
      </div>
      <Container>
        <div className="grid grid-cols-7 gap-1">
          <Label htmlFor="width" className="col-span-1">
            Width:
          </Label>
          <NumericInput
            errorClassName="row-start-2"
            handleStateChange={(value) =>
              setWidth((oldValue) => ({ ...oldValue, value }))
            }
            value={width.value}
            name="width"
            className="col-span-4"
          />
          <Select
            value={width.unit}
            onValueChange={(v) => handleUnitChange(v, "width")}
          >
            <SelectTrigger className="col-span-2  w-full">
              <SelectValue placeholder={width.unit} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ft">ft</SelectItem>
              <SelectItem value="in">in</SelectItem>
              <SelectItem value="cm">cm</SelectItem>
              <SelectItem value="m">m</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-7 gap-1">
          <Label htmlFor="width" className="col-span-1">
            Height:
          </Label>
          <NumericInput
            errorClassName="row-start-2"
            handleStateChange={(value) =>
              setHeight((oldValue) => ({ ...oldValue, value }))
            }
            value={height.value}
            name="height"
            className="col-span-4"
          />
          <Select
            value={height.unit}
            onValueChange={(v) => handleUnitChange(v, "height")}
          >
            <SelectTrigger className="col-span-2 w-full">
              <SelectValue placeholder={height.unit} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ft">ft</SelectItem>
              <SelectItem value="in">in</SelectItem>
              <SelectItem value="cm">cm</SelectItem>
              <SelectItem value="m">m</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-8 gap-1">
          <Label htmlFor="sqft" className="col-span-4">
            Quantity
          </Label>
          <NumericInput
            value={details.qty}
            handleStateChange={(value) =>
              setDetails((oldValue) => ({ ...oldValue, qty: value }))
            }
            name="sqft"
            errorClassName="row-start-3 col-start-1 col-span-4"
            className="col-span-4 row-start-2"
          />
          <Label htmlFor="sqft" className="col-span-4 col-start-5">
            Per square foot
          </Label>
          <NumericInput
            name="sqft"
            value={details.sqft}
            handleStateChange={(value) =>
              setDetails((oldValue) => ({ ...oldValue, sqft: value }))
            }
            errorClassName="row-start-3 col-span-4 col-start-5"
            className="col-span-4 row-start-2"
          />
        </div>
      </Container>
      <Container className="items-center grid grid-cols-7">
        <h1 className="font-bold  col-span-1">Total: </h1>
        <span
          className="w-full border col-span-6 rounded-sm p-2 text-xl bg-black text-white text-center"
          onClick={() => {
            navigator.clipboard.writeText(String(total));
            toast.success("Copied to clipboard!");
          }}
        >
          {total}
        </span>
        <span className="col-start-2 col-span-6 flex justify-center gap-1">
          <ArrowUp />
          Click to copy total!
        </span>
      </Container>
      <InstallPrompt />
    </div>
  );
}
