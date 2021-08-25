import React from 'react';

const Person = ({ person }) => {
  console.log('rendering');
  return (
    <div>
      <p>{person.name}</p>
      <p>{person.age}</p>
    </div>
  );
};

export default React.memo(Person);
//checke this without using React.memo and with React.memo 
//to check how much time is it rendering this component on counter increase