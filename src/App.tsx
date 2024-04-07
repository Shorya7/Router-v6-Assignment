// import { useState } from 'react'

import './App.css'
import CourseList from './components/courses'

function App() {
  

  return (
    <>
      <div className='app'>
        <div className='courses_head'>
        <h1>Courses</h1>
        </div>
        <div className='courses_content'>
          <CourseList/>
        </div>
      </div>
    </>
  )
}

export default App
