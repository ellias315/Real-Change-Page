import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { log } from 'console';
const jwt = require('jsonwebtoken');

const secretKey = 'igg-belly';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  await User.findOne({ email })
    .then(async (result) => {
      if (result) {
        return res.status(400).json({ message: 'User exist!!' });
      }
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name: name, email: email, password: hashedPassword });
        try {
          const recordResult = await user.save();
          res.status(200).json({ status: 200, message: 'User registered successfully' });
        } catch (error) {
          console.log(error, '---- saving error in register.');
          res.status(400).json({ message: 'User registration failed', error });
        }
      }
    })
    .catch(err => {
      console.log(err, '----- register error.');
    })
};



export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;
  try {
    await User.findOne({ email })
      .then(async (result) => {
        if (result) {
          const isValid = await bcrypt.compare(password, result.password);
          if (!isValid)
            return res.status(401).json({ message: 'Invalid password' });
          else {
            const payload = { name: result.name, email: result.email, password: result.password }; // example payload
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            res.status(200).json({ status: 200, accessToken: token, message: 'Login successful', userData: result });
          }
        }
        else
          return res.status(404).json({ message: 'User not found' });
      });
  } catch (error) {
  }
};

export const me = async (req: Request, res: Response) => {
  console.log(req.body, ' ---- my info')
  //   const decoded = jwt.verify(req.body, secretKey);
  //   console.log(decoded, '--- verify');

  //   res.status(200).json({ status: 200, userData: { name: "Elliaskoh", email: "sea676319@gmail.com", password: '123qwe!@#QWE' } });
}
