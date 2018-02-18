import React from 'react';
import ReactDOM from 'react-dom'


export class Modal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: this.props.originalRecipe != null ? this.props.originalRecipe.name : '',
      ingredients: this.props.originalRecipe != null ? this.props.originalRecipe.ingredients : ''
    }
  }
  handleChange(e, prop){
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    return(
      <div className='modal'>
        <div className='modal_titles_container'>
         <p className='add_title'> Add recipe </p>
         <a href="#" className="close_modal" onClick={this.props.closeModal}>X</a>
        </div> 
           <label> Recipe Name </label><br />
           <input className='recipe_name' name="name" type='text' onChange={(e)=> this.handleChange(e)} value={this.state.name}/>
          <label> Ingredients </label><br />
          <textarea className='recipe_ingredients' name="ingredients" onChange={(e)=> this.handleChange(e)} rows='3' placeholder='Enter ingredients separated by comma' value={this.state.ingredients}
             />
          <div className='modal_footer'>
              <input className='save_recipe' data-name={this.state.name} data-ingredients={this.state.ingredients} type='button' value='Save' onClick={this.props.saveRecipe} />
              <input className='footer_close' type='button' value='Close' onClick={this.props.closeModal} />
          </div>
       </div>
    )
  }
}