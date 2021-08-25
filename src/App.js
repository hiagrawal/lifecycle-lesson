import React, { useState, useCallback, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';

// Understanding LifeCycles
/*import Lifecycles from './lifecycles.component';
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showChild: true,
      text: ''
    };
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <button
            onClick={() =>
              this.setState(state => ({
                showChild: !state.showChild
              }))
            }
          >
            Toggle Lifecycles
          </button>
          <button
            onClick={() =>
              this.setState(state => ({
                text: state.text + '_hello'
              }))
            }
          >
            Update Text
          </button>
          {this.state.showChild ? <Lifecycles text={this.state.text} /> : null}
        </header>
      </div>
    );
  }
}
export default App;*/

//Undersatnding React.memo for better performance and avoid re-render
/*import Person from './person.component';
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      person: { name: 'Jack', age: 22 },
      showPerson: false
    };
  }

  render() {
    const { count, person, showPerson } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          {showPerson ? <Person person={person} /> : null}*/

          /*{showPerson ? <Person person={{ name: 'Jack', age: 22 }} /> : null}
          if we define object inline, then on every render, object will be instantiated 
          and considered as new object since reference would get changed 
          and hence React.memo will consider it as a new object and re-render the Person component*/
          
          /*Button Count: {count}
          <button onClick={() => this.setState({ count: count + 1 })}>
            Increase Count
          </button>
          <button onClick={() => this.setState({ showPerson: !showPerson })}>
            Toggle Person
          </button>
          </header>
      </div>
    );
  }
}
export default App;*/

//Understanding useCallback and useMemo
//Set is like an array only and can holds objects
//only difference is that it takes objects only when it's reference is different else do not take it
//we will add functions in this set to check if useCallback is saving us from function instantiation
//without useCallback, on every render, function would be instantiated and hence reference would be changed 
//and so will be added in Set
//whereas when we use useCallback, it checks the second paramter, if it is same and there is no change in value 
//of second paramter then function will not be instantiated and hence reference would remain same and 
//will not be added in Set
//useCallback is used for function memoization and takes 2 paramter, first is the function 
//and second is the array of values on which first function has dependency on

//useMemo usage is also same as useCallback 
//ONly difference is useCallback memoizes the function while useMemo memoizes the output of the function
//so if output remains same, function will not be executed
//it also takes 2 paramters, first is function and second is array of values on which first function is dependent on
//so if value remains same, function will not be executed and will take the value from the memoized output
//useMemo is used in case of complex computations where function execution itself is a very costly process for the browser
  
const functions = new Set();
const App = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const incrementCount1 = useCallback(() => setCount1(count1 + 1), [count1]);
  const incrementCount2 = useCallback(() => setCount2(count2 + 1), [count2]);

  const logName = () => console.log('Hina');
  const logName1 = useCallback(() => console.log('Hina'),[]);

  const doSomethingComplicated = useMemo(() => {
    console.log('I am computing something complex');
    return ((count1 * 1000) % 12.4) * 51000 - 4000;
  }, [count1]);

  functions.add(incrementCount1);
  functions.add(incrementCount2);
  functions.add(logName);
  functions.add(logName1);
  functions.add(doSomethingComplicated);

  console.log(functions)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        Count1: {count1}
        <button onClick={incrementCount1}>Increase Count1</button>
        Count2: {count2}
        <button onClick={incrementCount2}>Increase Count2</button>
        complexValue: {doSomethingComplicated}
      </header>
    </div>
  );
};

export default App;