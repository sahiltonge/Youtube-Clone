const express = require('express')
const router = express.Router()
const auth = require("../middleware/authentication")
const videoController = require('../Controllers/video')


router.post('/upload',auth,videoController.uploadVideo)

router.get('/allVideo',videoController.getAllVideo);

router.get('/getVideoById/:id',videoController.getVideoById)

router.get('/:userId/channel',videoController.getAllVideoByUserID)

router.put("/update/:id",auth,videoController.updateVideo)

router.delete('/delete/:id',auth,videoController.deleteVideo)

router.put('/like/:id',auth,videoController.likeVideo)

router.put('/dislike/:id',auth,videoController.dislikeVideo)


module.exports = router