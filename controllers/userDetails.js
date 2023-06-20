import express from 'express';
import UserDetails from '../models/userSchema.js';
// import bcrypt from 'bcryptjs';

const router = express.Router();

// export const getUserDetails = async (req, res) => {
//     // const { email, password } = req.body;
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: 'Please fill in the data' })
//         }

//         const userCheck = await UserDetails.findOne({ email: email });

//         // console.log(userCheck);

//         if (userCheck) {

//             const isCorrect = await bcrypt.compare(password, userCheck.password);

//             if (!isCorrect) {
//                 res.status(400).json({ error: 'Invalid Credentials' });
//             } else {
//                 res.json({ message: 'User Signed In Successfully' });
//             }

//         } else {

//             res.status(400).json({ error: 'Invalid Credentials' });

//         }


//         // if (userCheck) {
//         //     if (password != userCheck.password) res.send('Invalid Credentials');
//         //     // else res.status(200).json({ message: 'Authentication Successful' }); galat
//         //     else res.send('Auth Successful');
//         // }
//         // else {
//         //     res.send('Invalid Credentials');
//         // }

//         // res.status(200).json(userCheck);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const createUserDetails = async (req, res) => {
    console.log('creating new')
    const { username, email, password, cpassword } = req.body;
    if (!username || !email || !password || !cpassword) {
        return res.status(422).json({ error: 'Please fill in all fields' });
    }

    try {
        const userExist = await UserDetails.findOne({ email: email });
        if (userExist) {
            console.log('DUM DUM DUM MST HAi');
            return res.status(422).json({ error: 'This email already exists' })
            // res.send(userExist);
        } else if (password != cpassword) {
            return res.status(422).json({ error: 'Passwords are not matching' });
        } else {
            const newUserDetails = new UserDetails({ username, email, password, cpassword });

            await newUserDetails.save();
            console.log("User Details added");

            res.status(201).json({ message: 'User registered successfully' })
            // res.send(newUserDetails);
        }
        // res.status(201).json(userExist);

    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}



export default router;