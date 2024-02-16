//Poll model/object
const pollModel = {
    pollId: Number,
    pollName: String,
    question: String,
    options: [
        {
            optionId: Number,
            optionText: String,
        }
    ]
};

module.exports = pollModel;