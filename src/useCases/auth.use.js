import { Author } from '../models/authors.model.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function login (email, password) {
  const authorFound = await Author.findOne({ email })
  if (!authorFound) {
    throw new StatusHttp('invalid!')
  }
  const isValidPassword = await bcrypt.compare(password, authorFound.password)
  if (!isValidPassword) {
    throw new StatusHttp('try again!')
  }

  return {
    token: jwt.sign({ id: authorFound._id }),
    id: authorFound._id,
    username: authorFound.username,
    name: authorFound.name,
    profilePic: authorFound.profilePic
  }
}

export {
  login
}
