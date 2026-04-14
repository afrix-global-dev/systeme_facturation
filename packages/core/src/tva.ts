export const TVA_RATE = 0.16;

export function calculateTVA(ht: number) {
  const tva = ht * TVA_RATE;
  const ttc = ht + tva;

  return { ht, tva, ttc };
}

export function calculateFromTTC(ttc: number) {
  const ht = ttc / (1 + TVA_RATE);
  const tva = ttc - ht;

  return { ht, tva, ttc };
}
