const mongoose = require("mongoose");

const searchHistory = new mongoose.Schema({
    query:{
        type:String,
        required:true
    },
    response:{
         type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const SearchHistory = mongoose.model("SearchHistory",searchHistory);

module.exports = SearchHistory;