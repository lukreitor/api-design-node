import { validationResult } from 'express-validator'

export const handleInputErros = (req, res, next) => {
   const errors = validationResult(req) // it checks if there are any errors in the request, here it checks if the name is a string
   console.log(errors)
   if (!errors.isEmpty()) {
      res.status(400) // bad request, the request is not valid
      res.json({ errors: errors.array() })
   } else {
      next()
   }
}
