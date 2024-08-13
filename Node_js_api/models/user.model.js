const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    yourmessage: {
        type: String,
    },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const userData = mongoose.model('user', userSchema);
module.exports = userData;
