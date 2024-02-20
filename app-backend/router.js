const express = require('express');
const pollData = require('./data/pollData');
const router = express.Router();
let votes = {}; //store submitted vote

//Route for getting a poll by ID
router.get('/polls/:id', (req, res) => {
    const { id } = req.params;
    const poll = pollData.find(poll => poll.pollId === parseInt(id));
    if (!poll) {
        return res.status(404).send('Poll not found');
    }
    res.json(poll);
});

//Route for submitting a vote
router.post('/polls/:id/vote', (req, res) => {
    const { id } = req.params;
    const { optionId } = req.body;
    const poll = pollData.find(poll => poll.pollId === parseInt(id));

    //Checked to see if optionId is provided
    if (!optionId) {
        return res.status(400).send('Please pick an option!');
    }

    //Checks to see if poll exists
    if (!poll) {
        return res.status(404).send('Poll not found');
    }

    //Checks if the provided optionId exists within the poll's options
    const optionExists = poll.options.find(option => option.optionId === parseInt(optionId));

    if (!optionExists) {
        return res.status(400).send('Invalid optionId');
    }

    //Check to see if current poll ID exists in vote object,
    //if not then initialise an empty object
    if (!votes[id]) {
        votes[id] = {};
    }

    //Checks to see current optionID if it exists within the current pollID
    //If not, initialise with value of 0
    if (!votes[id][optionId]) {
        votes[id][optionId] = 0;
    }

    //Increment vote for specified option within specified pollID
    votes[id][optionId]++;

    res.send('Vote submitted successfully');
});

//Route for getting poll votes by their ID
router.get('/polls/:id/votes', (req, res) => {
    const { id } = req.params;
    const poll = pollData.find(poll => poll.pollId === parseInt(id));


    //Checks to see if poll exists
    if (!poll) {
        return res.status(404).send('Poll not found');
    }

    //Returns the votes for each option of poll
    const votesForPoll = {};
    poll.options.forEach(option => {
        votesForPoll[option.optionId] = votes[id]?.[option.optionId] || 0;
    });

    res.json(votesForPoll);
});

module.exports = router;