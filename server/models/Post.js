//const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
title: {
  type: string,
  required: true
},
body: {
  type: string,
  required: true
},
createdAt: {
  type: Date,
  default: Date.now
},
updatedAt: {
  type: Date,
  default: Date.now
}
});

// module.exports = mongoose.model('Post', PostSchema);