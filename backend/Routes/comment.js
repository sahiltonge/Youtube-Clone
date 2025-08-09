const express = require('express')
const router = express.Router()
const auth = require('../middleware/authentication')

const CommentController = require('../Controllers/comment')

router.post('/comment',auth,CommentController.addComment)

router.get('/comment/:videoId',CommentController.getCommentByVideoId)







module.exports = router