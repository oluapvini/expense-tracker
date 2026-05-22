export function parseFlags(args) {
  const flags = {};

  for (let i = 0; i < args.length; i++) {
    const token = args[i];

    if (token.startsWith("--")) {
      const key = token.slice(2);      // "--amount" -> "amount"
      const value = args[i + 1];       // próximo item é o valor
      flags[key] = value;
      i++; // pula o valor
    }
  }

  return flags;
}