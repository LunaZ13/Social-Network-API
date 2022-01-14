const User = require('../Models/User.js');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({path: 'thoughts', select: '-__v'})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({path: 'thoughts', select: '-__v'})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },
    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },
    // add a friend to user
    addFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.id },
                { $push: { friends: params.friendId } },
                { new: true,  runValidators: true }
            )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No friend found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    //remove a friend from user
    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id},
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id '});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }
}


module.exports = userController;
