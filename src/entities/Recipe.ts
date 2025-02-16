import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { RecipeIngredient } from "./RecipeIngredient";
import { RecipeStep } from "./RecipeStep";

@Entity("recipes") 
export class Recipe {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({ type: "time", nullable: false })
  preparation_time: number;

  @Column({ type: "boolean", default: false })
  is_fitness: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @OneToMany(() => RecipeIngredient, ingredient => ingredient.recipe)
  ingredients: RecipeIngredient[];

  @OneToMany(() => RecipeStep, step => step.recipe, { cascade: true })
  steps: RecipeStep[];
}