const mongoose = require('mongoose');
require('dotenv').config();
DATABASE_URL='mongodb+srv://sahiltonge:sahil24@cluster0.q82bckx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database Connected"))
.catch((err) => console.error("DB Connection Error:", err));
