import React, { useState } from 'react'
import Dummy from '../components/Dummy.jsx'
import PostItem from '../components/PostItem.jsx'

const CategoryPosts = () => {
  const [posts,setPosts] = useState(Dummy)
  return (
    <div>
        <section className='author-posts'>
      {posts.length > 0 ?  <div className='container author-posts_container'>
            {
                posts.map(({id,title,desc,category,authorID})=> <PostItem key={id} category={category} title={title} description={desc} authorID={authorID}/>)
            }
            </div> : <h2 className='center'>No Posts Found!</h2>}
    </section>
    </div>
  )
}

export default CategoryPosts
