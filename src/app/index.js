import React from 'react';
import ReactDOM from 'react-dom';
import {Recipe} from './recipe';
import {Ingredient} from './ingredient';
import {Modal} from './modal';
import {World} from './global'

let starterRecipes =  [
    {
      name: 'apple pie',
      ingredients: ['apples', 'sugar', 'four'],
      selected: false,
    }, {
      name: 'banna cognac',
      ingredients: ['nanners', 'cognac'],
      selected: false,
    }
  ];
let recipes;
if (localStorage.getItem('recipes') == null ){
  localStorage.setItem('recipes', JSON.stringify(starterRecipes));
} 
  recipes = JSON.parse(localStorage.getItem('recipes'));
  // recipes.map((recipes) => recipes.selected = false);

class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      recipes: recipes,
      showModal: false,
      editIndex: -1
    }
  }
  
  saveRecipe(e, index){
    let recipes = this.state.recipes.slice();
    let name = e.target.getAttribute('data-name');
    let ingredients = e.target.getAttribute('data-ingredients').split(',');
    let newRecipe;
    
    this.removeHangingIngredient(ingredients);
    
    if (index == -1){
      if (ingredients.length && name.length){
         newRecipe = {
          name: name,
          ingredients: ingredients
        }
      recipes.push(newRecipe);
      this.openCloseRecipe(-1);
      recipes.map((recipes) => recipes.selected = false);
      }
    } else {
      recipes[index].name = name;
      recipes[index].ingredients = ingredients; 
    }

    this.setState({recipes: recipes});
    this.closeModal();
  }
    
  removeHangingIngredient(ingredients){
    for (var i = 0; i<ingredients.length; i++){
      if (!ingredients[i].trim().length){
        ingredients.splice(i, 1);
      }
    }
    return ingredients
  }
  
  componentDidUpdate(){
    if (this.state.showModal){
      document.getElementsByClassName('overlay')[0].classList.add('updated');
      document.getElementsByClassName('modal')[0].classList.add('updated');
    }
    let recipes = this.state.recipes;
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }


  handleClick(index){
    this.openCloseRecipe(index);
  }
  
  openCloseRecipe(index){
          // make a copy of the recipes to not mutate the state directly
     let recipes = this.state.recipes.slice();
     const ingredients = document.getElementsByClassName('ingredients');
        for (let i = 0; i<recipes.length; i++){
          // If the one that was clicked is closed, open it
          if (i === index && !recipes[index].selected){
            this.animiateOpenClose(World.getHeight(recipes[i]), ingredients[i], false);
            // set the recipe to selected
            recipes[i].selected = true;
            
          } else if(recipes[i].selected){
            // close all open recipes and set them to false
            this.animiateOpenClose(World.getHeight(recipes[i]), ingredients[i], true);
            recipes[i].selected = false; 
          }
                    
     }
     // change the state to the saved one
     this.setState({
       recipes: recipes,
        editIndex: index
     });  
  }

  animiateOpenClose(height, element, close){
   requestAnimationFrame(function(timestamp){
      const starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
      World.moveit(starttime, timestamp, element, height, 500, close) // 400px over 1 second
   });  
 } 
  
  closeModal(){
   this.setState({showModal: false});
 }
  
 editRecipe(index){
   this.openModal(index.index);
 } 
  
 openModal(index){
  this.setState({
    showModal: true,
    editIndex: index
  });  
 }
 
  deleteRecipe(index){
    let recipes = this.state.recipes;
    recipes.splice(index, 1);
    this.setState({recipes: recipes});
  }
  
  renderRecipe(recipe, index){
    return <Recipe key={index} edit={(i)=> this.editRecipe({index: i})} delete={(i)=> this.deleteRecipe(i)} onClick={()=> this.handleClick(index)} recipe={recipe} recipeIndex={index}  />
  }
  renderModal(recipe, index){
    if (this.state.showModal){
      return <Modal originalRecipe={recipe} saveRecipe={(e)=> this.saveRecipe(e, index)} closeModal={()=> this.closeModal()} />;
    }
  }

  renderOverlay(){
    if (this.state.showModal){
      return 'overlay';
    }
  }
  
  render(){
    return(
      <div>
        <div className={this.renderOverlay()}></div>
        <div className='outer_container'>
          <div className='container'>
          {this.state.recipes.map((recipe, index)=>
            this.renderRecipe(recipe, index)
          )}
          </div>
          <input className='add_button' type='button' value='Add Recipe' onClick={() => this.openModal(-1)} />
          {this.renderModal(this.state.recipes[this.state.editIndex], this.state.editIndex)}
        </div>
      </div> 
    )
  }
}

// class Recipe extends React.Component {
//   renderIngredient(ingredient, index){
//     return <Ingredient name={ingredient} key={index}/>
//   }
  
//   render(){
//       let height = {
//         height: this.props.recipe.selected ? getHeight(this.props.recipe) + 'px' : '0px'
//       }
//       return(
//         <div className='recipe_container'>
//           <div className='recipe' onClick={this.props.onClick}>
//            {this.props.recipe.name}
//           </div>
//           <div className='ingredients' style={height}>
//               <p className='ingredients_title'>Ingredients</p>
//               {this.props.recipe.ingredients.map((ingredient, index) => 
//                this.renderIngredient(ingredient, index)
//                 )}
//                 <div className='actions'>
//                <input className='delete_recipe' type='button' value='Delete' onClick={()=> this.props.delete(this.props.recipeIndex)} />
//                <input className='edit_recipe' type='button' value='Edit' onClick={()=> this.props.edit(this.props.recipeIndex)} />
//               </div>
//             </div>
//           </div>
//       )
//   }
// }

// class Ingredient extends React.Component {
//   render(){
//     return <p className='ingredient' key={this.props.key}>{this.props.name}</p>
//   }
// }


// class Modal extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       name: this.props.originalRecipe != null ? this.props.originalRecipe.name : '',
//       ingredients: this.props.originalRecipe != null ? this.props.originalRecipe.ingredients : ''
//     }
//   }
//   handleChange(e, prop){
//     this.setState({[e.target.name]: e.target.value})
//   }
//   render(){
//     return(
//       <div className='modal'>
//         <div className='modal_titles_container'>
//          <p className='add_title'> Add recipe </p>
//          <a href="#" className="close_modal" onClick={this.props.closeModal}>X</a>
//         </div> 
//            <label> Recipe Name </label><br />
//            <input className='recipe_name' name="name" type='text' onChange={(e)=> this.handleChange(e)} value={this.state.name}/>
//           <label> Ingredients </label><br />
//           <textarea className='recipe_ingredients' name="ingredients" onChange={(e)=> this.handleChange(e)} rows='3' placeholder='Enter ingredients separated by comma' value={this.state.ingredients}
//              />
//           <div className='modal_footer'>
//               <input className='save_recipe' data-name={this.state.name} data-ingredients={this.state.ingredients} type='button' value='Save' onClick={this.props.saveRecipe} />
//               <input className='footer_close' type='button' value='Close' onClick={this.props.closeModal} />
//           </div>
//        </div>
//     )
//   }
// }

// function moveit(starttime, timestamp, el, dist, duration, close){
//     //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
//     var timestamp = timestamp || new Date().getTime();
//     // subtract the starting timestamp from most recent to get how long timers been running
//     let runtime = timestamp - starttime;
//     // divide run time by duration to get what % of time completed
//     let progress = runtime / duration;
//     // If we're closing we want the % to go down and never less than 0
//     if (close){
//       progress = Math.max((1-progress), 0);
//     } else {
//         // We don't want to be multiplying the height more than 1
//         progress = Math.min(progress, 1);
//         // Padding needs to be added on open otherwise it will always be partially visible
//         el.style.paddingTop = '10px';
//       }
//       // Update the height to the current % of the distance input
//       el.style.height = (dist * progress).toFixed(2) + 'px';
//       // If the runtime is less than the duration call requestAnimation again
//       if (runtime < duration){ // if duration not met yet
//           requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
//               moveit(starttime, timestamp, el, dist, duration, close);
//           });
//         // If the time is up and we're trying to close, remove the padding
//       } else if (close) {
//         el.style.paddingTop = '0';
//       }  
// }


ReactDOM.render(<Index />, document.getElementById('app'))