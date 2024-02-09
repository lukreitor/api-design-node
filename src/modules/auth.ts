import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt' // to hash the password

// hash the password
export const comparePassword = async (password, hashedPassword) => {
   return bcrypt.compare(password, hashedPassword)
} // why async? because bcrypt.compare is an async function, which means it returns a promise

export const hashPassword = async (password) => {
   return bcrypt.hash(password, 10)
} // why 10? it is the number of rounds of hashing, the higher the number, the more secure the hash, but it also takes longer to hash, its called salt, it is a random string that is added to the password before hashing, it makes the hash unique

export const createJWT = (user) => {
   const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
   )

   return token
}

// middleware to protect routes with jwt
export const protect = (req, res, next) => {
   const bearer = req.headers.authorization // bearer is an a design pattern for authentication, generic way of describing someone having the hability to send a token and it can be any type of token

   if (!bearer || !bearer.startsWith('Bearer ')) {
      return res
         .status(401)
         .json({ message: 'Unauthorized, You are not logged in' })
      /* 
         another way is
         res.status(401)
         res.json({ message: 'Unauthorized, You are not logged in' })
         return
      */
   }

   const [, token] = bearer.split(' ')

   if (!token) {
      return res.status(401).json({
         message: 'Unauthorized, You are not logged in, not valid token',
      })
   }

   try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      req.user = user
      next()
   } catch (e) {
      console.error(e)
      res.status(401).json({
         message: 'Unauthorized, You are not logged in, not valid token',
      })
   }
}
