import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <>
    <Part part={props.data.part1.name} exercises={props.data.part1.exercises} />
    <Part part={props.data.part2.name} exercises={props.data.part2.exercises} />
    <Part part={props.data.part3.name} exercises={props.data.part3.exercises} />
  </>
)



const Part = (props) => (
  <p>{props.part}: {props.exercises}</p>
)

const Total = (props) => (
  <p>Number of exercises: {props.total}</p>
)

const App = () => {
  const data = {
    course: "Half Stack application development",
    part1: {
      name: "Fundamentals of React",
      exercises: 10
    },
    part2: {
      name: "Using prps to pass data",
      exercises: 7
    },
    part3: {
      name: "State of a component",
      exercises: 14
    }
  }

  return (
    <div>
      <Header course={data.course} />
      <Content data={data}  />
      <Total total={data.part1.exercises + data.part2.exercises + data.part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))