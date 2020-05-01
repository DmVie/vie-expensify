import React from 'react'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      <h1>Paae Not Found!</h1>
      <p>Whoops, looks like you're a little lost? <Link to="/">Go home</Link></p>
    </div>
  )
}

export default PageNotFound
