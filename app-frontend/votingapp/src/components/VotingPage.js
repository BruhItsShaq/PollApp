import React, { useState, useEffect } from 'react';
import { fetchPollData, submitVote } from './services/pollApi';
import './styling.css';
import logo from './assets/assets/logo.jpg';
import background from './assets/assets/background.jpg';

const VotingPage = () => {
    //States to store poll data, selected option ID and to check if button is disabled
    const [poll, setPoll] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    useEffect(() => {
        //fetch poll data when components mounts
        const fetchPoll = async () => {
            try {
                const pollData = await fetchPollData();
                setPoll(pollData);
            } catch (error) {
                console.error('Error fetching poll:', error);
            }
        };

        fetchPoll();
    }, []);

    //Function to handle option selection
    const HandleOptionSelect = (optionId) => {
        setSelectedOptionId(optionId);
        setIsButtonDisabled(false); //Enable the vote button once an option is selected
    }

    //Function to handle votes submitted
    const handleVote = async (optionId) => {
        //Checks to see if option been selected
        if (!selectedOptionId) {
            alert('Please select an option before submitting!');
            return;
        }
        try {
            await submitVote(poll.pollId, optionId);
            alert('Vote has been submitted successfully');
        } catch (error) {
            console.error('Error whilst submitting vote', error);
            alert('Failed to submit vote');
        }
    }

    //If poll data is empty, show loading
    if (!poll) {
        return <div>Loading...</div>
    }

    return (
        <div className='container'>
            <img src={logo} alt="Dizplai" className='logo' />
            <div style={{ backgroundImage: `url(${background})` }}>
                <h1 className='title'>{poll.pollName}</h1>
                <p className='question'>{poll.question}</p>
                <div className='options'>
                    {poll.options.map((option) =>
                        <button key={option.optionId}
                            onClick={() => HandleOptionSelect(option.optionId)}
                            className={`optionButton ${selectedOptionId === option.optionId ? "selected" : ""}`}
                        >
                            {option.optionText}
                        </button>
                    )}
                </div>
                <button onClick={handleVote} className='submitButton' disabled={isButtonDisabled}>
                    Submit Vote
                </button>
            </div>
        </div>
    );
};

export default VotingPage;