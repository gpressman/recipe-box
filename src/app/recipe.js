import React from 'react';
import ReactDOM from 'react-dom';
import {Ingredient} from './ingredient';
import {World} from './global';

export class Recipe extends React.Component {
  render(){
      let style = {
        height: this.props.recipe.selected ? World.getHeight(this.props.recipe) + 'px' : '0px',
        paddingTop: this.props.recipe.selected ? '10px' : '0',
      }
      return(
        <div className='recipe_container'>
          <div className='recipe' onClick={this.props.onClick}>
           {this.props.recipe.name}
          </div>
          <div className='ingredients' style={style}>
              <p className='ingredients_title'>Ingredients</p>
              {this.props.recipe.ingredients.map((ingredient, index) => 
                <Ingredient name={ingredient} key={index} />
                )}
                <div className='actions'>
               <input className='delete_recipe' type='button' value='Delete' onClick={()=> this.props.delete(this.props.recipeIndex)} />
               <input className='edit_recipe' type='button' value='Edit' onClick={()=> this.props.edit(this.props.recipeIndex)} />
              </div>
            </div>
          </div>
      )
  }
}