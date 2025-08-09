const Video = require('../Modals/video')
const mongoose = require('mongoose');



exports.uploadVideo = async (req , res)=>{
    try{
        
        const {title,description,videoLink,videoType,thumbnail} =req.body
        
        const videoUpload = new Video({user:req.user._id,title,description,videoLink,videoType,thumbnail})
        await videoUpload.save()

        res.status(201).json({sucess:"true",videoUpload})
    }
    catch(error){
        res.status(500).json({error:'Server error'})
    }
} 


exports.getAllVideo= async(req , res)=>{
    try{
        const videos=  await Video.find().populate('user','channelName profilePic userName createdAt')
        res.status(201).json({sucess:'true',"videos":videos})
    }catch(error){
        res.status(500).json({error:'Server error'})
    }
}

exports.getVideoById = async(req,res)=>{

    try{
        let {id} = req.params
        const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt')

        res.status(201).json({sucess:'true',"video":video})
    }
    catch(error){
        res.status(500).json({error:'Server error'})
    }
}


exports.getAllVideoByUserID = async(req,res)=>{
    try{
        let {userId} = req.params
        const video = await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt about')
        res.status(201).json({sucess:'true','video':video})
    }catch(error){
        res.status(500).json({error:'Server error'})
    }
}

// Update video
exports.updateVideo = async (req, res) => {
    try {
        let { id } = req.params;
        const { title, description, videoLink, videoType, thumbnail } = req.body;

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ success: 'false', error: 'Video not found' });
        }

        // Check if the logged-in user owns the video
        if (video.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: 'false', error: 'Unauthorized to update this video' });
        }

        // Update only provided fields
        if (title) video.title = title;
        if (description) video.description = description;
        if (videoLink) video.videoLink = videoLink;
        if (videoType) video.videoType = videoType;
        if (thumbnail) video.thumbnail = thumbnail;

        await video.save();

        res.status(200).json({ success: 'true', video });
    } catch (error) {
        console.error("Error updating video:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

//Delete video

exports.deleteVideo = async (req, res) => {
    try {
        let { id } = req.params;

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ success: 'false', error: 'Video not found' });
        }

        // Check if the logged-in user owns the video
        if (video.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: 'false', error: 'Unauthorized to delete this video' });
        }

        await Video.findByIdAndDelete(id);

        res.status(200).json({ success: 'true', message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

//like api

exports.likeVideo = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: 'false', error: 'Invalid video ID format' });
        }

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ success: 'false', error: 'Video not found' });
        }

        const userId = req.user._id.toString();

        // Remove dislike if user previously disliked
        if (video.dislikedBy.includes(userId)) {
            video.dislikedBy = video.dislikedBy.filter(u => u.toString() !== userId);
        }

        // Toggle like
        if (video.likedBy.includes(userId)) {
            // Already liked → remove like
            video.likedBy = video.likedBy.filter(u => u.toString() !== userId);
        } else {
            // Add like
            video.likedBy.push(userId);
        }

        // Update counts
        video.like = video.likedBy.length;
        video.dislike = video.dislikedBy.length;

        await video.save();

        res.status(200).json({ success: 'true', video });
    } catch (error) {
        console.error("Error liking video:", error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};


//Dislike api

exports.dislikeVideo = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: 'false', error: 'Invalid video ID format' });
        }

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ success: 'false', error: 'Video not found' });
        }

        const userId = req.user._id.toString();

        // Remove like if user previously liked
        if (video.likedBy.includes(userId)) {
            video.likedBy = video.likedBy.filter(u => u.toString() !== userId);
        }

        // Toggle dislike
        if (video.dislikedBy.includes(userId)) {
            // Already disliked → remove dislike
            video.dislikedBy = video.dislikedBy.filter(u => u.toString() !== userId);
        } else {
            // Add dislike
            video.dislikedBy.push(userId);
        }

        // Update counts
        video.like = video.likedBy.length;
        video.dislike = video.dislikedBy.length;

        await video.save();

        res.status(200).json({ success: 'true', video });
    } catch (error) {
        console.error("Error disliking video:", error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};
