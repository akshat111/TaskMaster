const router = require('express').Router();
const auth = require('../middleware/auth');
const teamController = require('../controllers/team.controller');

router.post('/', auth, teamController.createTeam);          // create team/project
router.get('/', auth, teamController.getMyTeams);           // my teams
router.post('/:id/invite', auth, teamController.inviteMember); // invite member

module.exports = router;
