import React, { useState, useEffect } from "react";
import { getVotes } from "../services/pollAPI";
import './confirmationStyling.css';
import logo from '../assets/assets/logo.png';
import background from '../assets/assets/background.jpg';

const ConfirmationPage = ({ pollId }) => { //Accept pollId as a prop
    const [ votes, setVotes ] = useState([]);

    useEffect(() => {
        //Fetch votes from the server
        const fetchVoteData = async () => {
            try {
                const voteData = await getVotes(pollId);
                setVotes(voteData);
            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };
        fetchVoteData();
    }, [pollId, setVotes]);

    //Function to calculate the % of the votes
    const calculatePercentage = (votesCount) => {
        const totalVotes = votes.reduce((total, votes) => total + votes.count, 0);
        return ((votesCount / totalVotes) * 100).toFixed(0);
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <img src={logo} alt="Dizplai" className="logo" />
            <div className="content">
                <h1>Thank you for <b>your response</b></h1>
                <div className="results">
                    {votes.map((vote) => (
                        <div key={vote.optionId}>
                            <p>{vote.optionText} {calculatePercentage(vote.count)}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

};

export default ConfirmationPage;