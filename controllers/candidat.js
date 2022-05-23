const Candidat = require("../models/candidat");
const bcrypt = require("bcryptjs");

// GET Counts
exports.getCounts = async (req, res, next) => {
    const toDoCount = await Candidat.find({
        candidatStatus: "To-Do"
    })
    const inProgressCount = await Candidat.find({
        candidatStatus: "In-Progress"
    })
    const archivedCount = await Candidat.find({
        candidatStatus: "Archived"
    })


    return res.status(200).json({
        message: "All Counts Found!",
        toDoCount: toDoCount.length,
        inProgressCount: inProgressCount.length,
        archivedCount: archivedCount.length
    })
}

//Send in Body to Add Candidate
exports.addCandidat = async (req, res, next) => {
    console.log("Adding A Candidat!");
    console.log(req.body);
    const {
        candidatName,
        candidatEmail,
        candidatAddress,
        candidatPhone,
        candidatActivitySector,
        candidatJob,
        candidatFBURL,
        candidatAlternatePhone,
        candidatSkills,
        candidatAge,
        candidatMotivation,
        candidatLanguages,
        candidatLicensePermis,
        candidatConduireEnFrance,
        candidatStartDate,
        candidatEndDate,
        candidatYearsExperience,
        candidatFetes,
        candidatPhoto,
        candidatExperienceDetails,
        candidatCurrentWork,
        enteredBy,
        candidatStatus
    } = req.body;

    await Candidat.findOne({
        candidatEmail: candidatEmail
    })
        .then((candidat) => {
            console.log("candidate found - ", candidat);
            if (candidat) {
                return res
                    .status(400)
                    .json({
                        error: "USER_EXISTS",
                        message: "User Already Exists",
                        status: false
                    });
            }

            const newCandidat = new Candidat({
                candidatName,
                candidatEmail,
                candidatAddress,
                candidatActivitySector,
                candidatPhone,
                candidatJob,
                candidatFBURL,
                candidatAlternatePhone,
                candidatSkills,
                candidatAge,
                candidatMotivation,
                candidatLanguages,
                candidatLicensePermis,
                candidatConduireEnFrance,
                candidatStartDate,
                candidatEndDate,
                candidatYearsExperience,
                candidatFetes,
                candidatPhoto,
                candidatExperienceDetails,
                candidatCurrentWork,
                enteredBy,
                candidatStatus
            })

            newCandidat
                .save()
                .then(() => {
                    return res
                        .status(200)
                        .json({
                            message: "Candidat Registered Successfully!",
                            status: true
                        })
                })
                .catch(err => {
                    console.log(err)
                    return res
                        .status(400)
                        .json({
                            error: "INTERNAL_SERVER_ERROR",
                            message: "Error in Saving Candidat!",
                            status: false
                        })
                })
        })
        .catch(err => {
            return res.status(400).json({
                message: err,
                status: false
            })
        })
}

// Send id in query to view Candidate
exports.viewCandidat = async (req, res, next) => {
    console.log("Finding A Candidat ... ");
    console.log(req.query);
    const foundCandidat = await Candidat.findById(req.query.id)
    return res.status(200).json({
        message: "Candidat Found",
        candidat: foundCandidat
    })
}

// GET Request
exports.viewAllToDoCadidats = async (req, res, next) => {
    console.log("List All To-Do Candidates ... ");
    try {
        let candidates = await Candidat.find({
            candidatStatus: "To-Do"
        }).exec();
        if (!candidates) {
            res.status(400).send("No Data Found!");
        } else {
            res.status(200).json(candidates);
        }
    } catch (err) {
        res.status(500).send("Fetch Error!");
    }
}

// GET Request
exports.viewAllInProgressCadidats = async (req, res, next) => {
    console.log("List All In-Progress Candidates ... ");
    try {
        let candidates = await Candidat.find({
            candidatStatus: "In-Progress"
        }).exec();
        if (!candidates) {
            res.status(400).send("No Data Found!");
        } else {
            res.status(200).json(candidates);
        }
    } catch (err) {
        res.status(500).send("Fetch Error!");
    }
}

// GET Request
exports.viewAllArchivedCadidats = async (req, res, next) => {
    console.log("List All Archived Candidates ... ");
    try {
        let candidates = await Candidat.find({
            candidatStatus: "Archived"
        }).exec();
        if (!candidates) {
            res.status(400).send("No Data Found!");
        } else {
            res.status(200).json(candidates);
        }
    } catch (err) {
        res.status(500).send("Fetch Error!");
    }
}

// Body Required
exports.moveToInProgress = async (req, res, next) => {
    console.log("Changing Candidat Status ...");
    const { candidatId, workingFor, workingSince, salary } = req.body;
    await Candidat.updateOne({
        _id: candidatId
    }, {
        $set: {
            candidatCurrentWork: {
                workingFor: workingFor,
                workingSince: workingSince,
                salary: salary
            },
            candidatStatus: "In-Progress"
        }
    })
        .then(response => {
            console.log(response);
            return res
                .status(200)
                .json({
                    message: "Candidat Moved To In-Progress Successfully!"
                })
        })
        .catch(err => {
            console.log(err);
            return res
                .status(400)
                .json({
                    message: "Update Not Successfull, Try Again Later!"
                })
        })
}

// Body Required
exports.moveToArchived = async (req, res, next) => {
    console.log("Changing Candidat Status to Archived ... ");
    const { candidatId, reasonToArchive } = req.body;
    console.log(candidatId, reasonToArchive);

    await Candidat.findByIdAndUpdate(candidatId, {
        candidatArchived: {
            reason: reasonToArchive
        },
        candidatStatus: "Archived"
    })
        .then(response => {
            console.log(response);
            return res.status(200).json({
                message: "Candidat Archived Successfully!"
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: "Update Not Successfull, Try Again Later!"
            })
        })
}

// Body Required
exports.editToDoCandidat = async (req, res, next) => {
    console.log("Editing A To-Do Candidat!");
    console.log(req.body);
    const {
        candidatId,
        candidatName,
        candidatAge,
        candidatMotivation,
        candidatActivitySector,
        candidatJob,
        candidatLanguages,
        candidatStartDate,
        candidatEndDate,
        candidatLicensePermis,
        candidatConduireEnFrance,
        candidatSkills,
        candidatExperienceDetails,
        candidatEmail,
        candidatPhone,
        candidatAddress,
        candidatFBURL,
        candidatYearsExperience,
        candidatPhoto
    } = req.body;

    await Candidat.findByIdAndUpdate(candidatId, {
        candidatName: candidatName,
        candidatAge: candidatAge,
        candidatMotivation: candidatMotivation,
        candidatActivitySector: candidatActivitySector,
        candidatJob: candidatJob,
        candidatLanguages: candidatLanguages,
        candidatStartDate: candidatStartDate,
        candidatEndDate: candidatEndDate,
        candidatLicensePermis: candidatLicensePermis,
        candidatConduireEnFrance: candidatConduireEnFrance,
        candidatSkills: candidatSkills,
        candidatExperienceDetails: candidatExperienceDetails,
        candidatEmail: candidatEmail,
        candidatPhone: candidatPhone,
        candidatAddress: candidatAddress,
        candidatFBURL: candidatFBURL,
        candidatYearsExperience: candidatYearsExperience,
        candidatPhoto: candidatPhoto
    })
        .then((response) => {
            console.log(response);
            return res.status(200).json({
                message: "Candidat (To-Do) Saved Successfully!",
                data: response
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: "Candidat Change Failed!",
                data: err
            })
        })
}

exports.editInProgressCandidat = async (req, res, next) => {
    console.log("Editing A Candidat In-Progress!");
    console.log(req.body);
    const {
        candidatId,
        candidatName,
        candidatAge,
        candidatMotivation,
        candidatActivitySector,
        candidatJob,
        candidatLanguages,
        candidatStartDate,
        candidatEndDate,
        candidatLicensePermis,
        candidatConduireEnFrance,
        candidatSkills,
        candidatExperienceDetails,
        candidatEmail,
        candidatPhone,
        candidatAddress,
        candidatFBURL,
        candidatYearsExperience,
        candidatPhoto,
        candidatCurrentWork // includes further JSON of workingFor and Salary fields
    } = req.body;

    await Candidat.findOneAndUpdate({
        _id: candidatId
    }, {
        $set: {
            candidatName: candidatName,
            candidatAge: candidatAge,
            candidatMotivation: candidatMotivation,
            candidatActivitySector: candidatActivitySector,
            candidatJob: candidatJob,
            candidatLanguages: candidatLanguages,
            candidatStartDate: candidatStartDate,
            candidatEndDate: candidatEndDate,
            candidatLicensePermis: candidatLicensePermis,
            candidatConduireEnFrance: candidatConduireEnFrance,
            candidatSkills: candidatSkills,
            candidatExperienceDetails: candidatExperienceDetails,
            candidatEmail: candidatEmail,
            candidatPhone: candidatPhone,
            candidatAddress: candidatAddress,
            candidatFBURL: candidatFBURL,
            candidatYearsExperience: candidatYearsExperience,
            candidatPhoto: candidatPhoto,
            candidatCurrentWork: {
                workingFor: candidatCurrentWork.workingFor,
                workingSince: candidatCurrentWork.workingSince,
                salary: candidatCurrentWork.salary
            }
        }
    })
        .then((response) => {
            console.log(response);
            return res.status(200).json({
                message: "Candidat (In-Progress) Saved Successfully!",
                data: response
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: "Candidat Change Failed!",
                data: err
            })
        })
}

exports.editArchivedCandidat = async (req, res, next) => {
    console.log("Editing A Candidat Archived!");
    console.log(req.body);
    const {
        candidatId,
        candidatName,
        candidatAge,
        candidatMotivation,
        candidatActivitySector,
        candidatJob,
        candidatLanguages,
        candidatStartDate,
        candidatEndDate,
        candidatLicensePermis,
        candidatConduireEnFrance,
        candidatSkills,
        candidatExperienceDetails,
        candidatEmail,
        candidatPhone,
        candidatAddress,
        candidatFBURL,
        candidatYearsExperience,
        candidatPhoto,
        candidatArchived
    } = req.body;

    await Candidat.findOneAndUpdate({
        _id: candidatId
    }, {
        $set: {
            candidatName: candidatName,
            candidatAge: candidatAge,
            candidatMotivation: candidatMotivation,
            candidatActivitySector: candidatActivitySector,
            candidatJob: candidatJob,
            candidatLanguages: candidatLanguages,
            candidatStartDate: candidatStartDate,
            candidatEndDate: candidatEndDate,
            candidatLicensePermis: candidatLicensePermis,
            candidatConduireEnFrance: candidatConduireEnFrance,
            candidatSkills: candidatSkills,
            candidatExperienceDetails: candidatExperienceDetails,
            candidatEmail: candidatEmail,
            candidatPhone: candidatPhone,
            candidatAddress: candidatAddress,
            candidatFBURL: candidatFBURL,
            candidatYearsExperience: candidatYearsExperience,
            candidatPhoto: candidatPhoto,
            candidatArchived: {
                reason: candidatArchived.reason
            }
        }
    })
        .then((response) => {
            console.log(response);
            return res.status(200).json({
                message: "Candidat (Archived) Saved Successfully!",
                data: response
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                message: "Candidat Change Failed!",
                data: err
            })
        })
}

// Filters 
exports.filterCandidatByLanguages = async (req, res, next) => {
    console.log("Filtering Candidats By Languages ... ");
    let lang = req.query.language
    await Candidat.find({ candidatLanguages: { $contains: lang } })
}

