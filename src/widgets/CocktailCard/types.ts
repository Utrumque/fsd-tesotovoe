import type { Cocktail } from 'entities/cocktail/model/cocktail';

export interface CocktailCardProps {
  cocktail: Cocktail;
  isLoading: boolean;
}
