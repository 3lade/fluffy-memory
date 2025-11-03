import React, { useState } from 'react'
import {useQuery} from '@tanstack/react-query'


function RecipeList() {

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showMore, setShowMore] = useState(null);
    // const [showMoreId, setShowMoreId] = useState('')

    async function fetchRecipeData() {
        
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            if(response.ok) {
                const data = await response.json();
                const recipeData = data.meals
                console.log(data.meals)
                return recipeData
            }
        } catch (error) {
            return error.message
        }
    }

    
    
    const {
        data: recipeData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['recipeData'],
        queryFn: fetchRecipeData     
    })
    
    if(isLoading) {
        return <p>Loading....</p>
    }
    
    if(isError) {
        return <p>{error.message}</p>
    }

    const categories = ['All', ...new Set(recipeData.map((data) => data.strCategory))]
    // console.log(categories)

    const recipeDetails = (data) => {
        setSelectedCategory(data)
    }

    const filteredRecipies = selectedCategory === 'All' ? recipeData : recipeData.filter(recipe => recipe.strCategory === selectedCategory)

    const showMoreDetails = (data) => {
        setShowMore(data.idMeal === showMore ? null : data.idMeal);
    }

    const getIngredients = (recipe) => {

        // const ingredients = [];

        // for( let i=0; i<= 20; i++) {
        //     const ingredient = recipe[`strIngredient${i}`]
        //     if(ingredient && ingredient.trim() !== '') {
        //         ingredients.push(ingredient)
        //     }
        // }
        // return ingredients;

        const entries = Object.entries(recipe);

        const ingredientList = entries
                                        .filter(([key, value]) => key.startsWith(`strIngredient`) && value)
                                        .map(([key, value], idx) => {
                                            const measure = recipe[`strMeasure${idx+1}`]
                                            return {
                                                ingredient: value.trim(),
                                                measure: measure ? measure.trim() : ''
                                            }
                                        })
            return ingredientList;

    }

  return (
    <div>
        {
            categories.map((data) => (
                <button onClick={() => recipeDetails(data)}>{data}</button>
            ))
        }
        <div>
            {
                filteredRecipies.map((recipe) => (
                    <div key={recipe.idMeal} style={{margin: '20px'}}>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{maxWidth: "100px", maxHeight: "100px"}}/><br />
                        <h3>{recipe.strMeal}</h3><br />
                        <span><strong>Category: </strong>{recipe.strCategory}</span><br />  
                        <span><strong>Area: </strong>{recipe.strArea}</span><br />
                        <span><button onClick={() => showMoreDetails(recipe)}>{showMore ? 'Hide' : 'Show More'}</button></span><br />
                        { 
                            showMore === recipe.idMeal &&
                            <div key={showMore}>
                                <span>{recipe.strInstructions.split(' ').splice(0, 20).join(' ')}...</span>
                                <span>Instructions: </span>
                                <ul>
                                    <span>Ingredients:</span>
                                    {
                                        getIngredients(recipe).map((ing, idx) => (
                                            <li key={idx}>
                                                {ing.ingredient} - {ing.measure}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecipeList