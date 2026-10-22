// "use client";

// import {
//   useEffect,
//   useLayoutEffect,
//   type DependencyList,
//   type RefObject,
// } from "react";
// import { gsap } from "@/lib/gsap";

// const useIsoLayoutEffect =
//   typeof window !== "undefined" ? useLayoutEffect : useEffect;

// export function useGsapContext(
//   callback: () => void | (() => void),
//   scope: RefObject<HTMLElement | null>,
//   deps: DependencyList = [],
// ): void {
//   useIsoLayoutEffect(() => {
//     let cleanup: void | (() => void);
//     const ctx = gsap.context(() => {
//       cleanup = callback();
//     }, scope.current ?? undefined);

//     return () => {
//       if (typeof cleanup === "function") cleanup();
//       ctx.revert();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, deps);
// }

"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useGsapContext<T extends Element>(
  callback: () => void | (() => void),
  ref: RefObject<T | null>,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const context = gsap.context(() => {
      callback();
    }, element);

    return () => {
      context.revert();
    };
  }, [callback, ref]);
}
