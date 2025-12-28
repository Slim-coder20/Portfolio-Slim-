const mongoose = require ('mongoose'); 

const projectSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true,
    trim: true,
  }, 
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); 

const Project = mongoose.model('Project', projectSchema); 

module.exports = Project;