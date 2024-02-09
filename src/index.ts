import * as dotenv from 'dotenv' // it loads the environment variables from a .env file into process.env
dotenv.config() // it loads the environment variables from a .env file into process.env
import config from './config'

import app from './server' //

app.listen(config.port, () => {
   console.log(`Server is listening on http://localhost:${config.port}`)
})
