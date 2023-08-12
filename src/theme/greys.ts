import chroma from "chroma-js";

const NUM_COLORS = 9;
const BASE = chroma("rgb(8,8,18)");
const BRIGHT_AMOUNT = 1;

export let grey: Record<number, string> = {};

for (let i = 1; i <= NUM_COLORS; i++) {
  const amount = (i / NUM_COLORS) * BRIGHT_AMOUNT;
  grey[i * 100] = BASE.brighten(amount).hex();
}
