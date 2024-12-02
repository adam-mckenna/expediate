import { Journal } from '@/types/Journal'

export const getJournal = async (id: string) => {
  const response = await fetch(`http://localhost:3000/journal/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const updateJournal = async (id: string, updatedData: Journal) => {
  const response = await fetch(`http://localhost:3000/journal/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
  return response
}
