"use client";

import { cn } from "~/lib/utils";
import { ReactNode } from "react";

export function Container({
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
