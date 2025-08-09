const User=require('../Modals/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const cookieOptions = res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none", // for cross-site requests (Vercel ↔ Render)
    secure: true      // must be true for HTTPS
}).json({ success: true });


exports.signUp = async (req, res) => {
    try {
        const { channelName, userName, email, about, profilePic, password } = req.body;

        const isUsernameExist = await User.findOne({ userName });
        const isEmailExist = await User.findOne({ email });

        if (isUsernameExist) {
            return res.status(400).json({ error: "Username already exists" });
        }

        if (isEmailExist) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            channelName,
            userName,
            email,
            about,
            profilePic,
            password: hashedPassword
        });

        await user.save();

        //  Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'sahil');

        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            msg: "User registered successfully",
            success: true,
            token,       // Include token in response
            user         // Also include user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};




exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'sahil');

      // Set cookie with httpOnly and sameSite options
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,    // set to true if using HTTPS
        sameSite: 'Lax',
      });

      res.json({
        msg: 'Logged in Successfully',
        success: true,
        token,
        user,
      });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



exports.logout = async(req,res)=>{
    res.clearCookie('token',cookieOptions).json({msg:'Looged out successfully'})
}