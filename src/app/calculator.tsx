"use client";

export const dynamic = "force-dynamic";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "./use-local-storage";
import { Button } from "@/components/ui/button";
import { ArrowUp, Copy } from "lucide-react";
import { toast } from "sonner";

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-lg flex gap-2 flex-col p-2 lg:p-4 border rounded-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    isIOS && (
      <Container>
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      </Container>
    )
  );
}

export default function Calculator() {
  const [cm, setCm] = useLocalStorage("cm", { w: 0, h: 0 });
  const [inch, setInch] = useLocalStorage("in", { w: 0, h: 0 });
  const [ft, setFt] = useLocalStorage("ft", { w: 0, h: 0 });
  const [details, setDetails] = useLocalStorage("details", {
    qty: 1,
    sqft: 20,
  });

  const [total, setTotal] = useLocalStorage("total", 0);

  useEffect(() => {
    setTotal(Math.floor(ft.h * ft.w * details.qty * details.sqft));
  }, []);

  useEffect(() => {
    setTotal(Math.floor(ft.h * ft.w * details.qty * details.sqft));
  }, [ft, details]);

  return (
    <div className="flex gap-2 p-2  items-center h-screen flex-col">
      <Container className="">
        <h1 className="font-bold">Centimeters</h1>
        <div className="grid grid-cols-7 gap-2 items-center">
          <p className="col-span-1">Width: </p>{" "}
          <Input
            className="col-span-6"
            placeholder="Width in Centimeters"
            pattern="[0-9]*"
            inputMode="numeric"
            value={cm.w}
            onChange={(e) => {
              setCm((cm) => ({
                w: Number(e.target.value),
                h: cm.h,
              }));
              setInch((inch) => ({
                w: Number(e.target.value) / 2.54,
                h: inch.h,
              }));
              setFt((v) => ({
                w: Number(e.target.value) / 12 / 2.54,
                h: v.h,
              }));
            }}
          />
          <p className="col-span-1">Height: </p>
          <Input
            className="col-span-6"
            placeholder="Height in Centimeters"
            pattern="[0-9]*"
            inputMode="numeric"
            value={cm.h}
            onChange={(e) => {
              setCm((cm) => ({
                w: cm.w,
                h: Number(e.target.value),
              }));
              setInch((inch) => ({
                w: inch.w,
                h: Number(e.target.value) / 2.54,
              }));
              setFt((v) => ({
                w: v.w,
                h: Number(e.target.value) / 12 / 2.54,
              }));
            }}
          />
        </div>
      </Container>
      <Container className="">
        <h1 className="font-bold">Inches</h1>
        <div className="grid grid-cols-7 gap-2 items-center">
          <p className="col-span-1">Width: </p>{" "}
          <Input
            className="col-span-6"
            placeholder="Width in Inches"
            pattern="[0-9]*"
            inputMode="numeric"
            value={inch.w}
            onChange={(e) => {
              setInch((inch) => ({
                w: Number(e.target.value),
                h: inch.h,
              }));
              setCm((cm) => ({
                w: Number(e.target.value) * 2.54,
                h: cm.h,
              }));
              setFt((v) => ({
                w: Number(e.target.value) / 12,
                h: v.h,
              }));
            }}
          />
          <p className="col-span-1">Height: </p>
          <Input
            className="col-span-6"
            placeholder="Height in Centimeters"
            pattern="[0-9]*"
            inputMode="numeric"
            value={inch.h}
            onChange={(e) => {
              setInch((inch) => ({
                w: inch.w,
                h: Number(e.target.value),
              }));
              setCm((cm) => ({
                w: cm.w,
                h: Number(e.target.value) * 2.54,
              }));
              setFt((v) => ({
                w: v.w,
                h: Number(e.target.value) / 12,
              }));
            }}
          />
        </div>
      </Container>
      <Container>
        <h1 className="font-bold">Feet</h1>
        <div className="grid grid-cols-7 gap-2 items-center">
          <p className="col-span-1">Width: </p>{" "}
          <Input
            className="col-span-6"
            placeholder="Width in Inches"
            pattern="[0-9]*"
            inputMode="numeric"
            value={ft.w}
            onChange={(e) => {
              setFt((v) => ({
                w: Number(e.target.value),
                h: v.h,
              }));
              setInch((v) => ({
                w: Number(e.target.value) * 12,
                h: v.h,
              }));
              setCm((v) => ({
                w: Number(e.target.value) * 2.54 * 12,
                h: v.h,
              }));
            }}
          />
          <p className="col-span-1">Height: </p>
          <Input
            className="col-span-6"
            placeholder="Height in Centimeters"
            pattern="[0-9]*"
            inputMode="numeric"
            value={ft.h}
            onChange={(e) => {
              setFt((v) => ({
                w: v.w,
                h: Number(e.target.value),
              }));
              setInch((inch) => ({
                w: inch.w,
                h: Number(e.target.value) * 12,
              }));
              setCm((cm) => ({
                w: cm.w,
                h: Number(e.target.value) * 2.54 * 12,
              }));
            }}
          />
        </div>
      </Container>
      <Container className="w-full">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex gap-2 flex-col">
            <p>Quantity</p>
            <Input
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="quantity"
              value={details.qty}
              onChange={(e) =>
                setDetails((d) => ({ ...d, qty: Number(e.target.value) }))
              }
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p>Per square foot</p>
            <Input
              pattern="[0-9]*"
              inputMode="numeric"
              placeholder="sqft"
              value={details.sqft}
              onChange={(e) =>
                setDetails((d) => ({ ...d, sqft: Number(e.target.value) }))
              }
            />
          </div>
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
