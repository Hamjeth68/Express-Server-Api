let idCounter = 0;

export function generateId(): string {
  return (++idCounter).toString();
}
