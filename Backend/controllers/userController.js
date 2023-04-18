const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//helper function
const generateAccessToken = (user) => {
    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        "thisissecretkey",
        { expiresIn: "30m" }
    );
    return token;
};

const generateRefreshToken = (user) => {
    const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        "thisissecretkeyforrefresh"
    );
    return token;
};

let refreshTokens = [];
//login
const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json("user not found");
    }
    if (username === user.username && password === user.password) {
        const accessToken = generateAccessToken(user);
        const refreshToken =generateRefreshToken(user) 
        refreshTokens.push(refreshToken)
        
        return res.status(200).json({
            msg: "Login successfully",
            accessToken: accessToken,
            refreshToken:refreshToken,
            isAdmin: user.isAdmin,
        });
    } else {
        return res.status(403).json("Login failed");
    }
};

const logout=async(req,res)=>{
    const refreshToken = req.body.token
    refreshTokens = refreshTokens.filter(((token)=>token!==refreshToken))
    res.status(200).json("Logged Out successfully")
}
//create user
const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid ID");
    }
    if (req.user.isAdmin !== "true") {
        res.status(403).json(
            `Only Admin can perform this action admin stat:${req.user.isAdmin}`
        );
    } else if (req.user.isAdmin === "true") {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            res.status(404).json(`No User with ${id} exists`);
        }
        res.status(200).json(
            `User with id: ${id} has been deleted successfully and his Admin status was : ${req.user.isAdmin}`
        );
    }
};
//1 line above this makes it clear that req.user is the user thats sending the request

//verify users
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "thisissecretkey", (err, user) => {
            if (err) {
                return res.status(403).json("toke invalid");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("you are not authenticated");
    }
};


const tokenRefresh = async (req, res) => {
    //take refresh token from user
    const refreshToken = req.body.token;

    //send if there is no token
    if (!refreshToken) {
        res.send(401).json("No token receievd");
    }
    if(!refreshTokens.includes(refreshToken)){
        res.status(403).json("Invalid refresh token")
    }
    jwt.verify(refreshToken,"thisissecretkeyforrefresh",(err,user)=>{
        if(err){
            console.log(err)
        }
        refreshTokens = refreshTokens.filter((token)=>token !==refreshToken)
        
        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)
        refreshTokens.push(newRefreshToken)
        res.status(200).json({accessToken:newAccessToken,refreshToken:newRefreshToken})
    })
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    verify,
    login,
    tokenRefresh,
    logout
};
