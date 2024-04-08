const {Router} = require('express')

const {registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors} = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/register',registerUser)
router.post('/login',loginUser) 
router.get('/:id',getUser)
router.get('/',getAuthors)
router.post('/change-avatar',changeAvatar,authMiddleware)
router.patch('/edit-user',editUser,authMiddleware)  

module.exports = router