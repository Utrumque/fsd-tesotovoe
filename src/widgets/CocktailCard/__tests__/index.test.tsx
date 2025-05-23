import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CocktailCard from '../CocktailCard';
import type { Cocktail } from 'entities/cocktail/model/cocktail';

const mockCocktail: Cocktail = {
  idDrink: '1',
  strDrink: 'Test Cocktail',
  strDrinkAlternate: null,
  strTags: null,
  strVideo: null,
  strCategory: 'Test Category',
  strIBA: null,
  strAlcoholic: 'Alcoholic',
  strGlass: 'Test Glass',
  strInstructions: 'Test Instructions',
  strInstructionsDE: null,
  strInstructionsES: null,
  strInstructionsFR: null,
  strInstructionsIT: null,
  strInstructionsZH_HANS: null,
  strInstructionsZH_HANT: null,
  strDrinkThumb: 'test-image.jpg',
  strImageSource: null,
  strImageAttribution: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
  strIngredient1: 'Ingredient 1',
  strMeasure1: 'Measure 1',
  strIngredient2: 'Ingredient 2',
  strMeasure2: 'Measure 2',
  strIngredient3: null,
  strMeasure3: null,
  strIngredient4: null,
  strMeasure4: null,
  strIngredient5: null,
  strMeasure5: null,
  strIngredient6: null,
  strMeasure6: null,
  strIngredient7: null,
  strMeasure7: null,
  strIngredient8: null,
  strMeasure8: null,
  strIngredient9: null,
  strMeasure9: null,
  strIngredient10: null,
  strMeasure10: null,
  strIngredient11: null,
  strMeasure11: null,
  strIngredient12: null,
  strMeasure12: null,
  strIngredient13: null,
  strMeasure13: null,
  strIngredient14: null,
  strMeasure14: null,
  strIngredient15: null,
  strMeasure15: null,
};

describe('CocktailCard', () => {
  it('отображает скелетон при загрузке', () => {
    render(<CocktailCard cocktail={mockCocktail} isLoading={true} />);
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('отображает информацию о коктейле', () => {
    render(<CocktailCard cocktail={mockCocktail} isLoading={false} />);

    expect(screen.getByText(mockCocktail.strDrink)).not.toBeNull();
    expect(screen.getByText(mockCocktail.strCategory)).not.toBeNull();
    expect(screen.getByText(mockCocktail.strGlass)).not.toBeNull();
    expect(screen.getByText(mockCocktail.strInstructions)).not.toBeNull();
  });

  it('отображает ингредиенты с мерками', () => {
    render(<CocktailCard cocktail={mockCocktail} isLoading={false} />);

    expect(screen.getByText(`${mockCocktail.strMeasure1} ${mockCocktail.strIngredient1}`)).not.toBeNull();
    expect(screen.getByText(`${mockCocktail.strMeasure2} ${mockCocktail.strIngredient2}`)).not.toBeNull();
  });

  it('отображает изображение коктейля', () => {
    render(<CocktailCard cocktail={mockCocktail} isLoading={false} />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toBe(mockCocktail.strDrinkThumb);
    expect(image.getAttribute('alt')).toBe(mockCocktail.strDrink);
  });

  it('заменяет изображение на placeholder при ошибке загрузки', () => {
    render(<CocktailCard cocktail={mockCocktail} isLoading={false} />);

    const image = screen.getByRole('img');
    fireEvent.error(image);

    expect(image.getAttribute('src')).toBe('/placeholder-cocktail.jpg');
  });

  it('не отображает пустые ингредиенты', () => {
    const cocktailWithoutIngredients: Cocktail = {
      ...mockCocktail,
      strIngredient1: '',
      strMeasure1: '',
    };
    render(<CocktailCard cocktail={cocktailWithoutIngredients} isLoading={false} />);

    const ingredients = screen.getAllByRole('listitem');
    expect(ingredients).toHaveLength(1); // Только второй ингредиент должен отображаться
  });

  it('корректно обрабатывает отсутствующие мерки ингредиентов', () => {
    const cocktailWithoutMeasure: Cocktail = {
      ...mockCocktail,
      strMeasure1: '',
    };
    render(<CocktailCard cocktail={cocktailWithoutMeasure} isLoading={false} />);

    expect(screen.getByText(mockCocktail.strIngredient1!)).not.toBeNull();
  });
});
