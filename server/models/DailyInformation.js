const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyInformationSchema = new Schema({
    pulseRate: String,
	bloodPressure: String,
    weight: String,
    temperature: String,
	respiratoryRate: String,
});

module.exports = mongoose.model('DailyInformation',DailyInformationSchema);