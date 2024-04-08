import React from 'react';
import {Link} from 'react-router-dom';

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/sdfdf`} className='post_author'>
      <div className="post_author-avatar">
        <img src="" alt="avatar of author" />
      </div>
      <div className="post_author-details">
        <h5>BY: Ernest Achiever</h5>
        <small>Just now</small>
      </div>
    </Link>
  )
}

export default PostAuthor
