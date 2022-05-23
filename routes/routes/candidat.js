const router = require("express").Router();
const candidatController = require("../../controllers/candidat");
const { auth } = require("../../middleware/auth");

// Setters
router.post("/addCandidat", auth, candidatController.addCandidat);

// Getters
router.get("/getCounts", auth, candidatController.getCounts);
router.get("/viewCandidat", auth, candidatController.viewCandidat);
router.get("/allToDoCandidats", auth, candidatController.viewAllToDoCadidats);
router.get("/allInProgressCandidats", auth, candidatController.viewAllInProgressCadidats);
router.get("/allArchivedCandidats", auth, candidatController.viewAllArchivedCadidats);

// Status Setters
router.post("/moveToInProgress", auth, candidatController.moveToInProgress);
router.post("/moveToArchived", auth, candidatController.moveToArchived);

// Editors
router.post("/editToDoCandidat", auth, candidatController.editToDoCandidat);
router.post("/editInProgressCandidat", auth, candidatController.editInProgressCandidat);
router.post("/editArchivedCandidat", auth, candidatController.editArchivedCandidat);

// Filters

module.exports = {
    router: router,
    basePath: '/'
};
