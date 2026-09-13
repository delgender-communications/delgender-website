/** A visitor is identified for a single calendar day. The id resets the next
 * day, so "483 visitors today" means 483 distinct people, not 483 page loads.
 **/
const STORAGE_KEY = "daily_visitor";

interface StoredVisitor {
  id: string;
  date: string;
}

function todayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function getDailyVisitorId(): string {
  const today = todayKey();
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      const visitor: StoredVisitor = JSON.parse(stored);
      if (visitor.date === today && visitor.id) {
        return visitor.id;
      }
    } catch {
      // fall through and mint a new one
    }
  }

  const id = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ id, date: today }));
  return id;
}
