import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchPollData, submitVote } from '../services/pollAPI';
import './styling.css';
import logo from '../assets/assets/logo.png';
import background from '../assets/assets/background.jpg';

const VotingPage = ({ pollId }) => {
    //States to store poll data, selected option ID and to check if button is disabled
    const [poll, setPoll] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const history = useHistory();


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
    const handleVote = async () => {
        //Checks to see if option been selected
        if (!selectedOptionId) {
            alert('Please select an option before submitting!');
            return;
        }
        try {
            await submitVote(poll.pollId, selectedOptionId);
            alert('Vote has been submitted successfully');
            history.push('/confirmation');
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
        <div className='container' style={{ backgroundImage: `url(${background})` }}>
            <img src={logo} alt="Dizplai" className='logo' />
            <div className='content'>
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