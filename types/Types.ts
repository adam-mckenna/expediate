export type Occasion = 'breakfast' | 'lunch' | 'dinner' | 'snacks'

export type FoodCategory =
  | 'fruit'
  | 'vegetables'
  | 'whole-grains'
  | 'lean-meat-or-fish'
  | 'nuts-and-seeds'
  | 'dairy'
  | 'refined-grains'
  | 'sweets'
  | 'fried-foods'
  | 'fatty-proteins'
  | 'undefined'

export type Food = {
  title: string
  category: FoodCategory
  servings: number
  score: number
}
