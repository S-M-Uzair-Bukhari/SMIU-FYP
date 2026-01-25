const functions = require('../functions/feedback');

const addFeedback = async (req, res) => {
    try {
        const feedback = await functions.addFeedback(req);
        return res.status(200).json({msg: 'FeedBack is Added Successfully:', data: feedback});
    } catch (error) {
        console.log('Having errors while Adding Feedback');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Adding Feedback:', error})  
    }
};

const getFeedback = async (req, res) => {
    try {
        const feedback = await functions.getFeedback(req);
        return res.status(200).json({msg: 'FeedBacks:', data: feedback});
    } catch (error) {
        console.log('Having errors while Getting Feedback');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Getting Feedback:', error})  
    }  
};

const deleteFeedback = async (req, res) => {
    try {
        const { userId } = req.body;
        const feedback = await functions.deleteFeedback(userId);
        return res.status(200).json({msg: 'FeedBack is Deleted Successfully'});
    } catch (error) {
        console.log('Having errors while Deleting Feedback');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Deleting Feedback:', error})  
    }   
};

module.exports = { 
    addFeedback,
    getFeedback,
    deleteFeedback
};





