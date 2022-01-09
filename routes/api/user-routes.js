const router = require('express').Router()

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../Controllers/user-controller');

// set up GET all and POST at routes
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// set up GET one, PUT, and DELETE routes
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;

// var router = require('express').Router()
// var userController = require('../../Controllers/user-controller')

// router.get('/', (req, res)=> {
//     res.send('hellp homepage soon!')
// })
// router.get('/all', userController.getAllUsers)
// router.post('/create', userController.createUser)
// router.post('/addfriend/:userId', userController.addFriend)

// module.exports = router