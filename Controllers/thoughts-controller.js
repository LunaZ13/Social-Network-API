const { Thought, User } = require('../Models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({path: 'reactions', select: '__v'})
            .select('-__v')
            .then(thoughtsData => res.json(thoughtsData))
            .catch(err => res.status(400).json(err));
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({path: 'reactions', select: '__v'})
            select('-__v')
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
        Thought.create(body)
        .then(({_id}) => {
            return User.findByIdAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(thoughtsData => {
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
            .populate({path: 'reactions', select: '__v'})
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
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtsData => {
                if (!thoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id' });
                    return;
                }
                res.json(thoughtsData);
            })
            .catch(err => res.status(404).json(err));
    },
    // add a reaction to thought
    addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body.id } },
                { new: true, runValidators: true }
            )
            .populate({path: 'reactions', select: '__v'})
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
    // removeFriend({ params }, res) {
    //     Thoughts.findOneAndUpdate(
    //         { _id: params.userId}
    //         { $pull: { }
    //     )
    // }
}


module.exports = thoughtController;