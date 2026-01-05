const { members } = require("../data/mockData");

exports.getMembers = (req, res) => {
  res.json(members);
};

exports.createMember = (req, res) => {
  const { name, email } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newMember = {
    id: members.length ? members[members.length - 1].id + 1 : 1,
    name,
    email: email || null
  };

  members.push(newMember);
  res.status(201).json(newMember);
};
