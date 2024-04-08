const {Router} = require('express')

const {deletePost,createPost,getPost,getPosts,getCatPost,getUserPosts,editPost} = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')
const router = Router()

router.post('/create', createPost,authMiddleware)
router.get('/getpost',getPosts)
router.get('/:id',getPost)
router.get('/categories/:category',getCatPost)
router.get('/users/:id',getUserPosts)
router.patch('/:id',editPost,authMiddleware)
router.delete('/:id',deletePost,authMiddleware)


module.exports = router