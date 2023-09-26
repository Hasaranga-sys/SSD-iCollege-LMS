import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container">Home
        <Link to="/AdminHome">
            <button className="btn btn-primary" variant="contained">admin home</button>
        </Link>
        <Link to="/StudentHome">
            <button className="btn btn-primary" variant="contained">student home</button>
        </Link>
    </div>
  )
}

export default Home