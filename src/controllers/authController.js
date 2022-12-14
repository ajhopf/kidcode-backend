import UserSchema from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const UserSchema = require('../models/userSchema')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET;

const login = (req, res) => {
  try {
    UserSchema.findOne({ email: req.body.email }, (error, user) => {
      if (!user) {
        return res.status(401).send({
          //alterando a mensagem para não mostrar se é login ou password errado
          message: 'Login não autorizado',
          email: `${req.body.email}`
        });
      }

      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).send({
          //alterando a mensagem para não mostrar se é login ou password errado
          message: 'Login não autorizado'
        });
      }

      const token = jwt.sign({ name: user.name }, SECRET);

      res.status(200).send({
        message: 'Login autorizado',
        token
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export { login };
