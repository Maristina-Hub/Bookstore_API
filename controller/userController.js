import { User } from '../models/users.js'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';


export const postUserController = async(req, res) => {
    //get user info
    // you dont just get a post request form req.body.
    // you parse req.body to a validator using a user validator to validate evry input 
    // assignment is to add uservalidator to validate all the input
     //we would get userpayload from req.body hence the destructuring
        const { firstName, email, password } = req.body;
        if(firstName !== "" && email !== "" && password !== "") {
             // to hold the response we use the try catch
        try {
            const salt = await bcrypt.genSalt(10) // 10 is default
            const hashedPassword = await bcrypt.hash(password, salt)
        const userPayload = new User({
            firstName,
            email,
            password: hashedPassword
        });

        const input = await userPayload.save();
        delete input._doc.password
         
        if(input) {
            return res.json({
                status: 'success',
                message: 'Created Successfully',
                data: input
            })
        } 
        res.status(500).json({
                status: 'Failed',
                message: 'Something went wrong',
    });
} catch (error) {  
        console.log(error);
} 
} res.json({status: 'Failed', message: 'Ooops An input field was not filled'}) 
    
}

export const loginUserController = async (req, res) => {
    const { email, password } = req.body
    try {
        //validate users input
        if (!email && !password) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Please enter a valid email and password' 
            });
        }

            //find user
            const authUser = await User.findOne({ email });
            
            if (!authUser) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Email not found'
                });   
        }
        
        //compare password
        const isMatch = await bcrypt.compare(password, authUser.password);
        delete isMatch.password
        //if there is a match
        if(isMatch) {
            // the payload would be used to later to create a token
            const payload = {
                id: authUser.id,
                email: authUser.email,
            }
        
        
        //create token
        const authToken = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 86400,
        });

        return res.status(200).json({
            status: 'success',
            message: 'success',
            token: 'Bearer ' + authToken,
        });
        }
        //if no match
        return res.status(400).json({
        status: "fail",
        message: "email or password not correct"
        })
    
    } catch (err) { 
        console.error(err)
        res.status(500).json({
            status: 'Fail',
            err
        })
    }
}

export const verify = async(req, res, next) => {
  //check for authorization token
    const token = req.headers.authorization;

    if (!token)
    return res.status(401).json({ status: 'fail', message: 'unauthorized' });

    let bearerToken = token.split(' ')[1];

    await jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decode) => {
    if (err)
    return res
        .status(500)
        .json({ status: false, message: 'Failed to authenticate token.' });
    next();
    });
    return res.json(401).json({
    status: 'fail',
    massage: 'unauthorized',
    });
};