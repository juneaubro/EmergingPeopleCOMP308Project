const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmergencyAlertSchema = new Schema({
    message: String,
    nurse: {
        type: Schema.ObjectId,
        ref: 'Nurse'
    }
});

module.exports = mongoose.model('EmergencyAlert',EmergencyAlertSchema);