var router = require('express').Router()
var userController = require('../../Controllers/user-controller')

router.get('/', (req, res)=> {
    res.send('hellp homepage soon!')
})
router.get('/all', userController.getAllUsers)
router.post('/create', userController.createUser)
router.post('/addfriend/:userId', userController.addFriend)

module.exports = router