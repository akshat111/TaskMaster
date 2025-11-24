const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowercase: true},
        password: {type:String, required: true},
        avatarUrl: {type: String},
        teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }]
    },
    {timestamps: true }
);

//Password hashing middleware
userSchema.pre('save', async function () {
    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//password verify
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);