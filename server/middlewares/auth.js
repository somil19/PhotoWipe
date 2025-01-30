// import jwt from 'jsonwebtoken'

// // Middleware Function to decode jwt token to get clerkId

// const authUser = async (req,res,next) => {
//     try {
//         const {token} = req.headers

//         if (!token) {
//             return res.json({success:false,message:"Not Authorized Login Again"})

//         }

//         const token_decode = jwt.decode(token)
//         req.body.clerkId = token_decode.clerkId
//         next()

//     } catch (error) {
//         console.log(error.message)
//         res.json({success:false,message:error.message})

//     }
// }

// export default authUser
import jwt from "jsonwebtoken";
import "dotenv/config";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export default userAuth;
