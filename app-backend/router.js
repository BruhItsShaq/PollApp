const express = require('express');
const pollData = require('./data/pollData');
const router = express.Router();
let votes = []; //store submitted vote

//Route for getting a poll by ID
router.get('/polls/:id', (req, res) => {
    const { id } = req.params;
    const poll = pollData.find(poll => poll.pollId === parseInt(id));
    if (!poll){
        return res.status(404).send('Poll not found');
    }
    res.json(poll);
});

//Route for submitting a vote
router.post('/polls/:id/vote', (req, res) => {
    const {id} = req.params;
    const {optionId} = req.body;
    const poll = pollData.find(poll => poll.pollId === parseInt(id));

    //Checked to see if optionId is provided
    if(!optionId){
        return res.status(400).send('Please pick an option!');
    }
    
    //Checks to see if poll exists
    if (!poll){
        return res.status(404).send('Poll not found');
    }

    //Checks if the provided optionId exists within the poll's options
    const optionExists = poll.options.some(option => option.optionId === parseInt(optionId));

    if (!optionExists) {
        return res.status(400).send('Invalid optionId');
    }

    //store vote in array with ID and option
    votes.push({ pollId: parseInt(id), optionId: parseInt(optionId)});

    res.send('Vote submitted successfully');
});

//Route for getting polls by their ID
router.get('/polls/:id/votes', (req, res) => {
    const {id} = req.params;
    const poll = pollData.find(poll => poll.pollId === parseInt(id));


    //Checks to see if poll exists
    if (!poll){
        return res.status(404).send('Poll not found');
    }

    //Filters votes out using poll ID
    const pollVotes = votes.filter(vote => vote.pollId === parseInt(id));

    res.json(pollVotes);
});

module.exports = router;