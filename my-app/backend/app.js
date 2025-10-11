const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { SMTPClient } = require('emailjs');
const userModel = require('./models/monoogseConnections');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const Artwork = require('./models/artworkmodel'); 
const fs = require("fs");
const path = require('path');
require('dotenv').config();



const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";


const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

app.use(cookieParser());
app.use(cors({
  origin: [
    FRONTEND_URL,
    "https://children-art-museum.vercel.app" 
  ], 
  credentials: true, // needed for cookies
}));

app.use(bodyParser.json());




// Setup SMTP client
const client = new SMTPClient({
  user: 'sanjaygangotri8385@gmail.com',
  password: 'huru pnhm aiul goxs', // Recommend using env variables instead of hardcoding
  host: 'smtp.gmail.com',
  ssl: true,
});



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Serve static images from uploads/
app.use('/uploads', express.static('uploads'));




app.post('/api/signup', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send("Missing required fields");
  }



  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User already exists.');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Send confirmation email
    await client.sendAsync({
      from: '"ChildrenArtClub" <sanjaygangotri8385@gmail.com>',
      to: `${firstName} <${email}>`,
      subject: 'Thanks for becoming a member of our club',
      attachment: [
        {
          data: `
            <html>
              <body>
                <h2 style="color: black;">Thank you, ${firstName}!</h2>
                <p style="color: black;">You can now log in anytime.</p>
                <a 
                  href="${FRONTEND_URL}/login"
                  style="
                    display:inline-block;
                    padding:10px 20px;
                    background-color:#007BFF;
                    color:#fff;
                    text-decoration:none;
                    border-radius:5px;
                    font-weight:bold;
                    font-size:16px;
                    margin-top:10px;"
                >Login</a>
              </body>
            </html>`,
          alternative: true // tells emailjs this is HTML
        }
      ]
    });

    return res.status(200).send("Signup success & Email sent");
  } catch (error) {
    console.error("Signup error:", error);

    // If user creation succeeded but email failed, handle accordingly
    if (error.message && error.message.includes('sendAsync')) {
      return res.status(500).send("Signup saved, but failed to send email");
    }

    return res.status(500).send("Failed to create user");
  }
});




app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      // For security, don't reveal non-existence
      return res.status(200).send("If an account with that email exists, a reset link has been sent.");
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 3600000; // 1 hour from now

    user.resetToken = resetToken;
    user.resetTokenExpiry = expiry;
    await user.save();

    const resetUrl = `${FRONTEND_URL}/reset-password/${resetToken}`;



    await client.sendAsync({
      from: '"ChildrenArtClub" <sanjaygangotri8385@gmail.com>',
      to: `${user.firstName} <${email}>`,
      subject: 'Password Reset Request',
      attachment: [
        {
          data: `
            <html>
              <body>
                <p>Hello ${user.firstName},</p>
                <p>You requested to reset your password. Click the link below to proceed:</p>
                <a href="${resetUrl}"
                  style="
                    display:inline-block;
                    padding:10px 20px;
                    background-color:#007BFF;
                    color:#fff;
                    text-decoration:none;
                    border-radius:5px;
                    font-weight:bold;
                    font-size:16px;"
                >Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
              </body>
            </html>`,
          alternative: true
        }
      ]
    });

    return res.status(200).send("If an account with that email exists, a reset link has been sent.");
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).send("Failed to process forgot password request");
  }
});




app.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).send("Invalid request");
  }

  try {
    // Find user with matching reset token and unexpired
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send("Invalid or expired reset token");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return res.status(200).send("Password reset successful");
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).send("Internal server error");
  }
});




app.post('/api/log_in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send as HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,         // keep it secure from JS
      secure: false,          // must be false on localhost
      sameSite: "lax",        // allows cross-origin requests from your frontend
      maxAge: 60 * 60 * 1000, // 1 hour
    });





    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// ---------------- AUTH MIDDLEWARE ----------------
function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}




app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select('-password -resetToken -resetTokenExpiry');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      school: user.school,
      profileImageUrl: user.profileImageUrl, // 🆕 Added this
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// POST: upload artwork
app.post('/api/artwork', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, artBy, age, school } = req.body; // <-- new fields

    if (!req.file) return res.status(400).send("No image uploaded");

    const newArt = await Artwork.create({
      userId: req.user.userId,
      title: title || req.file.originalname,
      description: description || "",
      artBy: artBy || "",
      age: age || "",
      school: school || "",
      imageUrl: `${FRONTEND_URL}/uploads/${req.file.filename}`,
      createdAt: new Date(), // optional: store posting date
    });

    res.json(newArt);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload artwork");
  }
});



// GET: fetch user artworks
app.get('/api/artwork', authMiddleware, async (req, res) => {
  try {
    const arts = await Artwork.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(arts);
  } catch (err) {
    res.status(500).send("Failed to fetch artworks");
  }
});

// DELETE: delete artwork
app.delete("/api/artwork/:id", authMiddleware, async (req, res) => {
  try {
    const art = await Artwork.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!art) return res.status(404).send("Artwork not found or unauthorized");

    // 🧹 Extract filename from imageUrl (e.g., http://localhost:5000/uploads/xyz.jpg)
    const filePath = path.join(
      __dirname,
      "uploads",
      path.basename(art.imageUrl)
    );

    //  Delete image file from uploads folder if it exists
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn("Failed to delete image file:", err.message);
      } else {
        console.log("Deleted image file:", filePath);
      }
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Failed to delete artwork");
  }
});


// POST: Upload or update user profile image (DP)
app.post('/api/profile/upload-dp', authMiddleware, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No image uploaded");

    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).send("User not found");

    // 🧹 Delete old DP if it’s not the default one
    if (user.profileImageUrl && !user.profileImageUrl.includes("default-avatar.jpg")) {
      const oldFilePath = path.join(__dirname, "uploads", path.basename(user.profileImageUrl));
      fs.unlink(oldFilePath, (err) => {
        if (err) console.warn("Failed to delete old DP:", err.message);
      });
    }

    // Save new image URL
    user.profileImageUrl = `${FRONTEND_URL}/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: "Profile image updated", profileImageUrl: user.profileImageUrl });
  } catch (err) {
    console.error("DP upload error:", err);
    res.status(500).send("Failed to upload profile image");
  }
});


app.get("/api/gallery/museum", async (req, res) => {
  try {
    const { search, school, age, page = 1, limit = 6 } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { artBy: { $regex: search, $options: "i" } },
      ];
    }
    if (school) query.school = school;
    if (age) query.age = Number(age);

    const artworks = await Artwork.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Artwork.countDocuments(query);

    res.json({ artworks, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});





// Serve React static files
app.use(express.static(path.join(__dirname, '..', 'my-app', 'build')));

// Catch-all handler for React
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "my-app", "build", "index.html"));
});



// app.listen(5000, 'localhost', () => {
//   console.log("Server is listening at http://localhost:5000/");
// });

module.exports = app;