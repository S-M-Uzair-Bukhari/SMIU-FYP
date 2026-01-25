const feedbackModel =  require('../models/feedback');

const addFeedback = async (req) => {
    const newFeedback = new feedbackModel(req.body);
    let result = newFeedback.save();
    return result;
};

const getFeedback = async (req) => {
    const { feedBackId, userId } = req.query;

    const filter = {};
    if(feedBackId) filter._id = feedBackId;
    if(userId) filter.userId = userId;

    let feedback = feedbackModel.find(filter);
    return feedback;
};

const deleteFeedback = async (userId) => {
    let feedback = feedbackModel.findOneAndDelete({userId: userId});
    return feedback;
};

module.exports = {
    addFeedback,
    getFeedback,
    deleteFeedback
};