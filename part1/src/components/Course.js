import React from 'react';

const CalcSum = (props) => {
  
  let initialValue = 0;

  let total = props.data.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.exercises;
  }, initialValue);

  return (<>total of {total} exercises</>);
}

const Course = (props) => {

  return (
    <>
      <h1>Web</h1>
      {props.courses.map((course) =>
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => 
            <div key={part.id}>
              {part.name + ' ' + part.exercises}
            </div>
          )}
          <CalcSum data={course.parts} />
        </div>
      )}
    </>
  )
}

export default Course;