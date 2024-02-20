import React, { useState, useEffect } from "react";
import { getVotes } from "../services/pollAPI";
import './confirmationStyling.css';
import logo from '../assets/assets/logo.png';
import background from '../assets/assets/background.jpg';

const ConfirmationPage = ({ pollId }) => { //Accept pollId as a prop
    const [votes, setVotes] = useState({});

    useEffect(() => {
        //Fetch votes from the server
        const fetchVoteData = async () => {
            try {
                const voteData = await getVotes(pollId);
                console.log('Vote data:', voteData);
                setVotes(voteData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('No votes found for this poll');
                    // Handle case where there are no votes for the poll
                } else {
                    console.error('Error fetching votes:', error);
                }
            }
        };
        fetchVoteData();
    }, [pollId, votes]);

    //Function to calculate the % of the votes
    const calculatePercentage = (votesCount, totalVotes) => {
        return ((votesCount / totalVotes) * 100).toFixed(0);
    };

    const totalVotes = Object.values(votes).reduce((total, count) => total + count, 0);

    //Sample option texts due to pollData out of src directory
    const optionTexts = {
        1: "Manchester City",
        2: "Arsenal",
        3: "Liverpool"
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${background})` }}>
            <img src={logo} alt="Dizplai" className="logo" />
            <div className="content">
                <h1>Thank you for <b>your response</b></h1>
                <div className="results">
                    {Object.entries(votes).map(([optionId, count]) => (
                        <div className="outerProgress" >
                            <div key={optionId} className="progress"style={{ width: `${calculatePercentage(count, totalVotes)}%` }}>
                                <p>{optionTexts[optionId]} {calculatePercentage(count, totalVotes)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

};

export default ConfirmationPage;