import jwt from 'jsonwebtoken'

// admin authontication middleware

const authAdmin = async (req, res, next)=>{
    try {
        
        const {atoken} = req.headers

        if(!atoken){
            return res.json({success:false, message:"Not authorized login again"})
        }
        
        const tokenDecod = jwt.verify(atoken, process.env.JWT_SECRET)
        if(tokenDecod !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Not authorized login again"})
        }

        next()

    } catch (error) {

        console.log(error + "FROM ADMIN AUTH")
        return res.json({success : false, message : error.message})
        
    }
}

export default authAdmin