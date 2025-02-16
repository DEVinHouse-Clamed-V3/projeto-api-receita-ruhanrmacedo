import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Recipe } from "./Recipe";

@Entity("recipes_steps")
export class RecipeStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  description: string;

  @ManyToOne(() => Recipe, recipe => recipe.steps, { onDelete: "CASCADE" })
  @JoinColumn({ name: "recipe_id" })
  recipe: Recipe;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
