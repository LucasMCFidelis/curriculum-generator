import type { ReactNode } from "react";

export function FeedbackRoot({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {children}
    </div>
  );
}
