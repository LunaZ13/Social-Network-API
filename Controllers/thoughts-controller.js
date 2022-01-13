const { Thought, User } = require('../Models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => res.status(400).json(err));
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(thoughtsData => {
                if (!thoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id' });
                    return;
                }
                res.json(thoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    // create a new thought
    createThought({ params, body }, res) {
        console.log('ABOUT TO CREATE THOUGHT!!!')
        Thought.create(body)
        .then(({_id}) => {
            console.log('THOUGHT WAS CREATED!!! thought id', _id)
            console.log('USER Id we wanna save', params)

            return User.findOneAndUpdate(
                { _id: params.id },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(thoughtsData => {
            console.log('INside thoguhts data ?????? second .then!!', thoughtsData)
            if (!thoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this id' });
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.json(err));
    },
    // update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(thoughtsData => {
                if (!thoughtsData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                
                res.json(thoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a thought
    deleteThought({ params }, res) {
        console.log('DELETE THOUGHT!!!!! HAPPENING!!!')
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then((thoughtsData) => {
                if (!thoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id' });
                    return;
                }
                User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: thoughtsData._id } },
                    { new: true }
                ).then(function(userData) {
                    res.json(userData)
                })
                //res.json(thoughtsData);
            })
            .catch(err => {
                console.log('ERRRR!!', err)
                res.status(404).json(err)
            });
    },
    // add a reaction to thought
    addReaction({ params, body }, res) {
        console.log('WE HIT ADD REACTION!', params, body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this id' });
                return;
            }
            res.json(thoughtsData);
            })
            .catch(err => res.status(404).json(err));
    },
    // remove a reaction from a thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: params.reactionId } },
            { new: true }
        )
        .then(thoughtsData => {
            if (thoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this id '});
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }
}


module.exports = thoughtController;