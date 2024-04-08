import React, { useState } from 'react'
import Dummy from '../components/Dummy.jsx'
import { Link } from 'react-router-dom'
const Dashboard = () => {
  const [posts,setPosts] = useState(Dummy)
  return (
    <div>
        posts.length ? <div className="container dashboard_container">
          {
            posts.map(post => {
              return <article key={posts.id} className='dashboard_post'>
                <div className="dasboard_post-info">
                    <div className='dasboard_post-thumbnail'>
                      <img src="" alt="post avatar" />
                    </div>
                    <h5>{post.title}</h5>
                </div>

                <div className="dasboard_post-actions"></div>
                <Link to={`/posts/${post.id}`} className='btn sm'>View</Link>
                <Link to={`/posts/${post.id}/edit`} className='btn sm primary'>Edit</Link>
                <Link to={`/posts/${post.id}/delete`} className='btn sm danger'>Delete</Link>
              </article>
            })
          }
        </div>
    </div>
  )
}

export default Dashboard
