import { useEffect, useRef, useState } from "react";

// Raqamni 0 dan haqiqiy qiymatigacha "sanaб" chiqaradigan hook.
// prefers-reduced-motion yoqilgan bo'lsa darhol yakuniy qiymatni qaytaradi.
export function useCountUp(target: number, durationMs = 1100): number {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [value, setValue] = useState(prefersReduced ? target : 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      // easeOutCubic — oxiriga kelib sekinlashadi
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setValue(target);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, prefersReduced]);

  return value;
}

type CountUpProps = {
  value: number;
  durationMs?: number;
  decimals?: number;
  className?: string;
  locale?: string;
};

// O'zbek lokalida formatlangan, animatsiyali raqam.
export function CountUp({
  value,
  durationMs = 1100,
  decimals = 0,
  className,
  locale = "uz-UZ",
}: CountUpProps) {
  const current = useCountUp(value, durationMs);
  const text = current.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}
