import React, { useState } from 'react'
import PostItem from './PostItem';
import Dummy from './Dummy';

const Posts = () => {
    const [posts,setPosts] = useState(Dummy);
  return (
    <section className='posts'>
      {posts.length > 0 ?  <div className='posts_container'>
            {
                posts.map(({id,title,desc,category,authorID})=> <PostItem key={id} category={category} title={title} description={desc} authorID={authorID}/>)
            }
            </div> : <h2 className='center'>No Posts Found!</h2>}
    </section>
  )
}

export default Posts
