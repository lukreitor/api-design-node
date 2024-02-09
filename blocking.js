// blocking code is synchronous and will block further execution of code until it is complete

const me = 'John' // javascript will block here until this line of code is complete
console.log(me)

const fs = require('fs/promises')
const path = require('path')
const read = async () => {
   const result = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
   return result
}

read().then((f) => console.log(f))
console.log('done')
