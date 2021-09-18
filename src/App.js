import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Person from './Person/Person';
   
class App extends Component {
  state = {
    persons: [
      { id: 'a1', name: 'Max', age: 28 },
      { id: 'a2', name: 'Manu', age: 29 },
      { id: 'a3', name: 'Stephanie', age: 26 }
    ], 
    otherState: 'some other value',
    showPersons: false,
   // userInput: ''

  }
  // state={
  //   userInput: ''
  // }
  // inputChangedHandler=(event)=>{
  //   this.setState({userInput:event.target.value});
  // }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex=this.state.persons.findIndex(p =>{
      return p.id===id;
    });  
    const person={
      ...this.state.persons[personIndex]
    
    };
    person.name=event.target.value;
    const persons=[...this.state.persons];
    persons[personIndex] =person;
    //   this.setState({
      // persons: [
      //   { name: 'Max', age: 28 },
      //   { name: event.target.value, age: 29 },
      //   { name: 'Stephanie', age: 26 }
      // ]
      this.setState( {persons:persons} ); 

  }

  deletePersonHandler=(personIndex)=>{
    const persons=this.state.persons;
    persons.splice(personIndex, 1);
    this.setState({persons: persons});    

  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }
 
  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
       ':hover': {
         backgroundColor: 'lightgreen',
         color: 'black'

       } 
         };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={()=> this.deletePersonHandler(index)}
            name={person.name}  
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}  
           </div>
      );
      style.backgroundColor='red';
      style[':hover']={
        backgroundColor: 'salmon ',
        color: 'black'
      }
    }
   // let classes= ['red','bold'].join(' ');
   const classes=[];
   if(this.state.persons.length<=2){
    classes.push('red');
   }
   if(this.state.persons.length<=1){
    classes.push('bold');
   }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>


        <button
          style={style}
          //onClick here we are passing reference
          onClick={() => this.togglePersonsHandler()}>Toggle Persons</button>

        {persons}
        {
        /* <hr/>
        <input
        type="text"
        onChange={this.inputChangedHandler}
        value={this.state.userInput} /> */}

      </div>
    );
     // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
} 

export default Radium(App);
