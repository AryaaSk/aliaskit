import { generateName, generateDateOfBirth, generateEmailUsername } from '../lib/names'

describe('generateName', () => {
  it('returns a string with two space-separated words', () => {
    const name = generateName()
    expect(typeof name).toBe('string')
    const parts = name.split(' ')
    expect(parts).toHaveLength(2)
    expect(parts[0].length).toBeGreaterThan(0)
    expect(parts[1].length).toBeGreaterThan(0)
  })

  it('returns names from the known first/last name arrays', () => {
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
    // Run many times to get confidence over randomness
    for (let i = 0; i < 50; i++) {
      const name = generateName()
      const [first, last] = name.split(' ')
      expect(FIRST_NAMES).toContain(first)
      expect(LAST_NAMES).toContain(last)
    }
  })

  it('produces the format "First Last"', () => {
    for (let i = 0; i < 20; i++) {
      const name = generateName()
      expect(name).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/)
    }
  })
})

describe('generateDateOfBirth', () => {
  it('returns a string in YYYY-MM-DD format', () => {
    const dob = generateDateOfBirth()
    expect(dob).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('returns a year between 1970 and 2000 (inclusive)', () => {
    for (let i = 0; i < 50; i++) {
      const dob = generateDateOfBirth()
      const year = parseInt(dob.split('-')[0], 10)
      expect(year).toBeGreaterThanOrEqual(1970)
      expect(year).toBeLessThanOrEqual(2000)
    }
  })

  it('returns a month between 01 and 12', () => {
    for (let i = 0; i < 50; i++) {
      const dob = generateDateOfBirth()
      const month = parseInt(dob.split('-')[1], 10)
      expect(month).toBeGreaterThanOrEqual(1)
      expect(month).toBeLessThanOrEqual(12)
    }
  })

  it('returns a day between 01 and 28', () => {
    for (let i = 0; i < 50; i++) {
      const dob = generateDateOfBirth()
      const day = parseInt(dob.split('-')[2], 10)
      expect(day).toBeGreaterThanOrEqual(1)
      expect(day).toBeLessThanOrEqual(28)
    }
  })

  it('returns a valid ISO date', () => {
    for (let i = 0; i < 20; i++) {
      const dob = generateDateOfBirth()
      const parsed = new Date(dob)
      expect(parsed.toString()).not.toBe('Invalid Date')
    }
  })

  it('pads month and day to two digits', () => {
    // Run many iterations to catch single-digit months/days
    for (let i = 0; i < 100; i++) {
      const dob = generateDateOfBirth()
      const [, month, day] = dob.split('-')
      expect(month).toHaveLength(2)
      expect(day).toHaveLength(2)
    }
  })
})

describe('generateEmailUsername', () => {
  it('returns a lowercase string', () => {
    const username = generateEmailUsername('Alex Smith')
    expect(username).toBe(username.toLowerCase())
  })

  it('replaces spaces with dots in the base name', () => {
    const username = generateEmailUsername('Alex Smith')
    expect(username.startsWith('alex.smith.')).toBe(true)
  })

  it('appends a 4-character alphanumeric suffix', () => {
    const username = generateEmailUsername('Alex Smith')
    // format: base.suffix — suffix is the last dot-separated segment
    const parts = username.split('.')
    const suffix = parts[parts.length - 1]
    expect(suffix).toHaveLength(4)
    expect(suffix).toMatch(/^[a-z0-9]{4}$/)
  })

  it('handles multi-word names correctly', () => {
    const username = generateEmailUsername('Jordan Lee Davis')
    expect(username.startsWith('jordan.lee.davis.')).toBe(true)
  })

  it('returns different values for the same name on repeated calls', () => {
    const results = new Set(
      Array.from({ length: 20 }, () => generateEmailUsername('Sam Jones'))
    )
    // With 4-char alphanumeric suffix (36^4 = 1.6M possibilities), collisions are extremely rare
    expect(results.size).toBeGreaterThan(1)
  })

  it('handles names already lowercase', () => {
    const username = generateEmailUsername('alex smith')
    expect(username.startsWith('alex.smith.')).toBe(true)
  })
})
