const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 24 Fields
const candidatSchema = new Schema({
    candidatName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    candidatEmail: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    candidatPhone: {
        type: Number,
        required: true,
        trim: true
    },
    candidatAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    candidatActivitySector: {
        type: String,
        required: true,
        trim: true,
    },
    candidatJob: {
        type: String,
        required: true,
        trim: true,
    },
    candidatFBURL: {
        type: String,
        lowercase: true,
        trim: true
    },
    candidatAlternatePhone: {
        type: Number,
        trim: true
    },
    candidatSkills: {
        type: String,
        lowercase: true,
        trim: true
    },
    candidatAge: {
        type: Number,
        trim: true
    },
    candidatMotivation: {
        type: Number,
        trim: true
    },
    candidatLanguages: [
        {
            type: String,
            trim: true
        }
    ],
    candidatLicensePermis: {
        type: Boolean,
        default: false,
    },
    candidatConduireEnFrance: {
        type: Boolean,
        default: false,
    },
    candidatStartDate: {
        type: String,
        trim: true,
        required: true
    },
    candidatEndDate: {
        type: String,
        trim: true,
        required: true
    },
    candidatYearsExperience: {
        type: Number,
        trim: true
    },
    candidatFetes: [{
        type: String,
        trim: true
    }],
    candidatPhoto: {
        data: String,
        contentType: String,
    },
    candidatExperienceDetails: [{
        period: {
            type: String,
            trim: true,
            required: true
        },
        location: {
            type: String,
            trim: true,
            required: true
        },
        workDoneSample: {
            type: String,
            trim: true,
            required: true
        }
    }],
    candidatCurrentWork: [
        {
            workingFor: {
                type: String,
                trim: true,
                required: false,
            },
            workingSince: {
                type: String,
                trim: true,
                required: false,
            },
            salary: {
                type: String,
                trim: true,
                required: false,
            }
        }
    ],
    enteredBy: {
        type: String,
        required: true,
        trim: true
    },
    candidatStatus: {
        type: String,
        required: true,
        trim: true,
        enum: ["To-Do", "In-Progress", "Archived"],
        default: "To-Do"
    },
    candidatArchived: {
        reason: {
            type: String,
            required: false,
            trim: true
        }
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Candidat', candidatSchema, 'candidat');
