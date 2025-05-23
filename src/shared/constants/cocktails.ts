export const AVAILABLE_COCKTAIL_CODES = ['margarita', 'mojito', 'a1', 'kir'] as const;

export type CocktailCode = (typeof AVAILABLE_COCKTAIL_CODES)[number];
