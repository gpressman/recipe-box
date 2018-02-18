import React from 'react';
import ReactDOM from 'react-dom';

export class Ingredient extends React.Component {
  render(){
    return <p className='ingredient'>{this.props.name}</p>
  }
}