import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const authorsData = [
  { id: 1,  name: 'Ernest Achiever', posts: 3 },
  { id: 2,  name: 'Vansh Raj Chopra', posts: 2 },
  { id: 3,  name: 'Jonathan Jensih', posts: 6 },
  { id: 4,  name: 'Dishaa Rajput', posts: 1 },
  { id: 5,  name: 'Nilakshi Raaj', posts: 5 },
  { id: 6,  name: 'Hajia Bano', posts: 2 },
]


const Authors = () => {
  const [authors, setAuthors] = useState(authorsData)
  return (
    <section className="authors">
      {authors.length > 0 ? <div className='container authors_container'>
        {
          authors.map(({ id, avatar, name, posts }) => {
            return <Link key={id} className='author' to={`/posts/users/${id}`}>
              <div className="author_avatar">
                <img src={avatar} alt={`Image of ${name}`} />
              </div>
              <div className='author_info'>
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <h2>No users/authors found</h2>}
    </section>
  )
}

export default Authors
