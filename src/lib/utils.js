import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function merge(...input) {
  return twMerge(clsx(...input));
}
