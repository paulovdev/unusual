"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { ClipText } from "@/components/ui/clip-text";

export function RevealText({
  text,
  className,
  indent = 0,
  delay,
  exit = false,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once, amount: 0.2 });

  return (
    <div ref={ref}>
      <ClipText
        text={text}
        animate={isInView ? "animate" : "initial"}
        exit={exit}
        className={className}
        indent={indent}
        delay={delay}
      />
    </div>
  );
}
