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
  title: string
  category: FoodCategory
  servings: number
  score: number
}
