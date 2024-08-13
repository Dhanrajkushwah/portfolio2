const manageUserModel = require("../models/user.model");
const status = require("../config/status");

// Add Contact
exports.create = async (req, res) => {
    try {
        const obj = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            yourmessage: req.body.yourmessage,
        };
        const newManageUserModel = new manageUserModel(obj);
        await newManageUserModel.save();
        res.json({ success: true, status: status.OK, msg: 'Adding Contact Us is successfully.' });
    } catch (err) {
        console.log("err", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Contact failed.' });
    }
};



//get all Contact
exports.list = async (req, res) => {
    try {
        const data = await manageUserModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Contact failed.' });

    }
}


