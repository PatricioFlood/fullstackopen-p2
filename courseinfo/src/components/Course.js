import React from 'react'

const Course = ({course}) => (
  <div>
    <Header title = {course.name} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts} />
  </div>
)

const Header = ({title}) => <h1>{title}</h1>

const Part = ({part}) => <p> {part.name} {part.exercises} </p>

const Content = ({parts}) => (
  <div>
    {parts.map(
      part => (
        <Part key={part.id} part={part} />
      )
    )}
  </div>
)

const Total = ({parts}) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  
  return <p><b>Total of {total} exercises </b></p>
}

export default Course