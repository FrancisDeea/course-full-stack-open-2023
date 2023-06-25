import React from 'react'
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
    const name = course.name;
    const content = course.parts
    const totalExercises = content.reduce((s, p) => s + p.exercises, 0)

    return (
        <div>
            <Header text={name} />
            <Content content={content} />
            <Total value={totalExercises} />
        </div>
    )
}

export default Course;