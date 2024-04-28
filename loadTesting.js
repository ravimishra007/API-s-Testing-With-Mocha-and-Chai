'use strict'

const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3000/user/users',
  connections: 10,
  pipelining: 1, 
  duration: 10 
}, console.log)

// async/await
async function foo () {
  const result = await autocannon({
    url: 'http://localhost:3000/user/users',
    connections: 10, 
    pipelining: 1,
    duration: 10
  })
  console.log(result)
}