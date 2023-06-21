import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <>
    <Part part={props.part[0].name} exercises={props.part[0].exercises} />
    <Part part={props.part[1].name} exercises={props.part[1].exercises} />
    <Part part={props.part[2].name} exercises={props.part[2].exercises} />
  </>
)



const Part = (props) => (
  <p>{props.part}: {props.exercises}</p>
)

const Total = (props) => (
  <p>Number of exercises: {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content part={parts} />
      <Total total={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))