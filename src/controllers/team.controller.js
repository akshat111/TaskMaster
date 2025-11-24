const Team = require('../models/Team');
const User = require('../models/User');

// Create new team / project
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    const team = await Team.create({
      name,
      description,
      owner: req.user._id,
      members: [req.user._id]
    });

    // user ke teams array me add
    if (!req.user.teams.includes(team._id)) {
      req.user.teams.push(team._id);
      await req.user.save();
    }

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: 'Team creation failed', error: err.message });
  }
};

// Get all teams of logged-in user
exports.getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user._id });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch teams', error: err.message });
  }
};

// Invite member to team
exports.inviteMember = async (req, res) => {
  try {
    const { id } = req.params;      // teamId
    const { userId } = req.body;    // jisko invite karna

    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // sirf owner invite kar sakta hai
    if (!team.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only owner can invite members' });
    }

    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();
    }

    const user = await User.findById(userId);
    if (user && !user.teams.includes(team._id)) {
      user.teams.push(team._id);
      await user.save();
    }

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: 'Failed to invite member', error: err.message });
  }
};
