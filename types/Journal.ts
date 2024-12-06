export type Occasion = 'breakfast' | 'lunch' | 'dinner' | 'snacks'

export type FoodCategory =
  | 'Fruit'
  | 'Vegetables'
  | 'Whole Grains'
  | 'Lean Meat Or Fish'
  | 'Nuts And Seeds'
  | 'Dairy'
  | 'Refined Grains'
  | 'Sweets'
  | 'Fried Foods'
  | 'Fatty Proteins'
  | 'Other'

export type Food = {
  name: string
  category: FoodCategory
  servings: number
  score: number
}

export interface Journal {
  id: string
  dqs: number
  message: string
  breakfast: Array<Food>
  lunch: Array<Food>
  dinner: Array<Food>
  snacks: Array<Food>
}
