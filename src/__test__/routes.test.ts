import supertest from 'supertest'
import app from '../server'
import request from 'supertest'
import exp from 'constants'

describe('POST /user', function () {
   it('responds with json', async function () {
      const res = await request(app)
         .post('/user')
         .send({ username: 'andre', password: 'voarei' })
         .set('Accept', 'application/json')

      //expect(res.headers['Content-Type']).toMatch(/json/)
      //expect(res.status).toEqual(200)
   })
})

describe('GET /', function () {
   it('Should send back some data', async function () {
      const res = await supertest(app)
         .get('/')
         .set('Accept', 'application/json')

      //expect(res.headers['Content-Type']).toMatch(/json/)
      expect(res.status).toEqual(200)
      expect(res.body.message).toBe('hello')
   })
})
