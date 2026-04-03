const FIRST_NAMES = [
  'Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Avery', 'Quinn',
  'Sage', 'Blake', 'Drew', 'Jamie', 'Kendall', 'Skyler', 'Dakota', 'Reese',
  'Parker', 'Cameron', 'Finley', 'Hayden', 'Logan', 'Spencer', 'River',
  'Emery', 'Rowan', 'Peyton', 'Lane', 'Ellis', 'Harley', 'Remy',
  'Charlie', 'Frankie', 'Jessie', 'Leslie', 'Robin', 'Sam', 'Terry',
]

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez',
  'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez', 'Lee', 'Harris',
  'Walker', 'Robinson', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright',
  'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Reed',
]

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateName(): string {
  const first = FIRST_NAMES[randInt(0, FIRST_NAMES.length - 1)]
  const last = LAST_NAMES[randInt(0, LAST_NAMES.length - 1)]
  return `${first} ${last}`
}

export function generateDateOfBirth(): string {
  const year = randInt(1970, 2000)
  const month = randInt(1, 12)
  const day = randInt(1, 28) // safe across all months
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/** Generate a URL-safe username from a name + short random suffix */
export function generateEmailUsername(name: string): string {
  const base = name.toLowerCase().replace(/\s+/g, '.')
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}.${suffix}`
}
