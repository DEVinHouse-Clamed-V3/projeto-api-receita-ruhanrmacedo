import { AppDataSource } from "../data-source";
import { Recipe } from "../entities/Recipe";
import { RecipeIngredient } from "../entities/RecipeIngredient";
import { RecipeStep } from "../entities/RecipeStep";
import { Request, Response } from "express";

class RecipeController {
  private recipeRepository = AppDataSource.getRepository(Recipe);
  private recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
  private recipeStepRepository = AppDataSource.getRepository(RecipeStep);

  create = async (req: Request, res: Response) => {
    try {
      let { name, preparation_time, is_fitness, ingredients, steps } = req.body;

      preparation_time = parseFloat(preparation_time);

      if (!name || isNaN(preparation_time) || !Array.isArray(ingredients) || ingredients.length === 0 || !Array.isArray(steps) || steps.length === 0) {
        res.status(400).json({ message: "Dados inválidos" });
        return;
      }

      // Cria a receita
      const recipe = this.recipeRepository.create({ name, preparation_time, is_fitness });
      await this.recipeRepository.save(recipe);

      // Cria os ingredientes
      const ingredientEntities = ingredients.map(ingredient =>
        this.recipeIngredientRepository.create({ name: ingredient.name, recipe_id: recipe.id })
      );
      await this.recipeIngredientRepository.save(ingredientEntities);

      // Cria os passos
      const stepEntities = steps.map(step =>
        this.recipeStepRepository.create({ description: step.description, recipe_id: recipe.id })
      );
      await this.recipeStepRepository.save(stepEntities);

      res.status(201).json({ message: "Receita criada com sucesso", recipe });
      return;
    } catch (error) {
      console.error("Erro ao criar receita:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
      return;
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const recipes = await this.recipeRepository.find({ relations: ["ingredients", "steps"] });
      res.json(recipes);
      return;
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
      return;
    }
  };
}

export default RecipeController;
