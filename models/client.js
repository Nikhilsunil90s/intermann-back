const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    clientCompanyName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    clientEmail: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    clientPhone: {
        type: Number,
        required: true,
        trim: true
    },
    clientAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    candidatPhoto: {
        data: String,
        contentType: String,
    },
    clientActivitySector: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    clientJob: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    clientReferenceName: {
        type: String,
        lowercase: true,
        trim: true
    },
    clientReferenceNumber: {
        type: Number,
        trim: true
    },
    clientRequiredSkills: {
        type: String,
        lowercase: true,
        trim: true
    },
    numberOfPosts: {
        type: Number,
        trim: true
    },
    clientMotivation: {
        type: Number,
        trim: true
    },
    jobStartDate: {
        type: String,
        trim: true,
        required: true
    },
    jobEndDate: {
        type: String,
        trim: true,
        required: true
    },
    jobTotalBudget: {
        type: Number,
        trim: true
    },
    netSalary: {
        type: Number,
        trim: true
    },
    clientImportance: {
        type: Number,
        required: true,
        trim: true
    },
    enteredBy: {
        type: String,
        required: true,
        trim: true
    },
    jobStatus: {
        type: String,
        required: true,
        trim: true,
        enum: ["To-Do", "In-Progress", "Signed Contract", "Archived"],
        default: "To-Do"
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Client', clientSchema, 'client');

