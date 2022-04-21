const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotivationalTipsSchema = new Schema({
    message: String,
    nurse: {
        type: Schema.ObjectId,
        ref: 'Nurse'
    }
});

module.exports = mongoose.model('MotivationalTips',MotivationalTipsSchema);