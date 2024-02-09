import * as user from '../user'

describe('user handler', () => {
   it('should create a new user', async () => {
      const req = { body: { username: 'andre', password: 'voarei' } }
      const res = {
         json({ token }) {
            expect(token).toBeTruthy()
         },
      }

      const createNewUser = await user.createNewUser(req, res, () => {})
   })
})
