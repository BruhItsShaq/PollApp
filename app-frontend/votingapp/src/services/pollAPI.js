/* eslint-disable no-template-curly-in-string */
const URL = 'http://localhost:3000';

//Function to fetch the poll data
export const fetchPollData = async () => {
    try{
        const response = await fetch(`${URL}/polls/1`);
        if(!response.ok){
            throw new Error('There is no poll :(');
        }
        return await response.json();
    } catch(error) {
        console.error('Error fetching poll data:', error);
        throw error;
    }
};

//Function to post the votes
export const submitVote = async (pollId, optionId) => {
    try {
        console.log('Submitting vote for pollId:', pollId, 'and optionId:', optionId);

        const response = await fetch(`${URL}/polls/${pollId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ optionId }),
        });

        console.log('Response from server:', response);

        if (!response.ok) {
            console.error('Failed to submit vote');
            throw new Error('Failed to submit vote');
        }

        const data = await response.text();
        console.log('Data received:', data);
        return data;
    } catch (error) {
        console.error('Error submitting the vote', error);
        throw error;
    }
};
//Function to get the votes once submitted
export const getVotes = async (pollId) => {
    try{
        const response = await fetch(`${URL}/polls/${pollId}/votes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok){
            throw new Error('There are no votes for this poll');
        }
        return await response.json();
    } catch (error){
        console.error('Error obtaining votes', error);
        throw error;
    }
};
