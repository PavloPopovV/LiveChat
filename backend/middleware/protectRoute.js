import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt
        if (!token) return res.status(400).json({ message: "Unauthorized - No token Provide" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({ message: "Unauthorized - Invalid Token" });

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(400).json({ message: "User not found" });

        req.user = user
        next()

    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default protectRoute;