import prisma from '../db'
import { createJWT, hashPassword, comparePassword } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
   try {
      const user = await prisma.user.create({
         data: {
            username: req.body.username,
            password: await hashPassword(req.body.password),
         },
      })
      const token = createJWT(user)
      res.json({ token })
   } catch (err) {
      err.type = 'input'

      next(err)
   }
}

export const signin = async (req, res, next) => {
   try {
      const user = await prisma.user.findUnique({
         where: {
            username: req.body.username,
         },
      })
      const isValid = await comparePassword(req.body.password, user.password)
      if (!isValid) {
         res.status(401).json({ message: 'invalid credentials' })
         return
      }
      const token = createJWT(user)
      res.json({ token })
   } catch (err) {
      next(err)
   }
}
