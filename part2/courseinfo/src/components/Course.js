import React from 'react'
import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
    const name = course.name;
    const content = course.parts

    return (
        <div>
            <Header text={name} />
            <Content content={content} />
        </div>
    )
}

export default Course;