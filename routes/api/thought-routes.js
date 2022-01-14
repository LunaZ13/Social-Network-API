const router = require('express').Router();
const { getAllThoughts, 
        getThoughtById,
        createThought,
        updateThought,
        deleteThought,
        addReaction,
        removeReaction
     } = require('../../Controllers/thoughts-controller');

// set up GET all and POST at routes
router
    .route('/')
    .get(getAllThoughts);
   

// set up GET one, PUT, and DELETE routes
router
    .route('/:id/')
    .post(createThought)
    .get(getThoughtById)
    .put(updateThought);;
   // .delete(deleteThought);
    
router.route('/:thoughtId/:userId').delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);    

module.exports = router;