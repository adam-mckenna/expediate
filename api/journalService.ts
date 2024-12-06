import { Journal } from '@/types/Journal'

const createMockData = (date: string, data: string) => {
  return {
    id: date,
    dqs: 31,
    message:
      'Keep up the good work! If you want to improve more, try cutting back on <strong>table sugar</strong>',
    breakfast: [
      {
        title: 'Instant oats',
        category: 'Whole Grains',
        servings: 2,
        score: 2,
      },
      {
        title: 'Mango',
        category: 'Fruit',
        servings: 1,
        score: 2,
      },
      {
        title: 'Basil seeds',
        category: 'Nuts and Seeds',
        servings: 4,
        score: 2,
      },
      {
        title: 'Soy milk (unsweetened)',
        category: 'Dairy',
        servings: 1,
        score: 1,
      },
      {
        title: 'Banana',
        category: 'Nuts And Seeds',
        servings: 1,
        score: 1,
      },
      {
        title: 'Peanut butter',
        category: 'Nuts and Seeds',
        servings: 1,
        score: 1,
      },
      {
        title: 'Banana',
        category: 'Whole Grains',
        servings: 1,
        score: 1,
      },
      {
        title: 'Oats',
        category: 'Whole Grains',
        servings: 1,
        score: 1,
      },
    ],
    lunch: [
      {
        id: '4',
        title: 'Table sugar',
        category: 'Sweets',
        servings: 1,
        score: -1,
      },
      {
        id: '5',
        title: 'Banana bread',
        category: 'Sweets',
        servings: 1,
        score: -1,
      },
    ],
    dinner: [
      {
        id: '100',
        title: 'Sweet potato',
        category: 'Vegetables',
        servings: 1,
        score: 2,
      },
    ],
    snacks: [
      {
        id: '4000',
        title: 'Cocoa powder',
        category: 'Other',
        servings: 1,
        score: 0,
      },
    ],
  }
}

export const createJournal = async (date: string, data: string) => {
  const response = await fetch(`http://localhost:3000/journal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // todo: this will be handled on the BE.
    body: JSON.stringify(createMockData(date, data)),
  })
  return response
}

export const listJournal = async () => {
  const response = await fetch(`http://localhost:3000/journal`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const getJournal = async (id: string) => {
  const response = await fetch(`http://localhost:3000/journal/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const updateJournal = async (id: string, data: Journal) => {
  const response = await fetch(`http://localhost:3000/journal/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}
