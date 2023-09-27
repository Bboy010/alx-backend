## 0x03. Queuing System in JS

### Ressources
1. [Redis quick start](https://intranet.alxswe.com/rltoken/8xeApIhnxgFZkgn54BiIeA)
2. [Redis client interface](https://intranet.alxswe.com/rltoken/1rq3ral-3C5O1t67dbGcWg)
3. [Redis client for Node JS](https://intranet.alxswe.com/rltoken/mRftfl67BrNvl-RM5JQfUA)


### Required files for the project
> package.json
```
{
    "name": "queuing_system_in_js",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "lint": "./node_modules/.bin/eslint",
      "check-lint": "lint [0-9]*.js",
      "test": "./node_modules/.bin/mocha --require @babel/register --exit",
      "dev": "nodemon --exec babel-node --presets @babel/preset-env"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "chai-http": "^4.3.0",
      "express": "^4.17.1",
      "kue": "^0.11.6",
      "redis": "^2.8.0"
    },
    "devDependencies": {
      "@babel/cli": "^7.8.0",
      "@babel/core": "^7.8.0",
      "@babel/node": "^7.8.0",
      "@babel/preset-env": "^7.8.2",
      "@babel/register": "^7.8.0",
      "eslint": "^6.4.0",
      "eslint-config-airbnb-base": "^14.0.0",
      "eslint-plugin-import": "^2.18.2",
      "eslint-plugin-jest": "^22.17.0",
      "nodemon": "^2.0.2",
      "chai": "^4.2.0",
      "mocha": "^6.2.2",
      "request": "^2.88.0",
      "sinon": "^7.5.0"
    }
  }
```
---
> .babelrc
```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
---
> $ npm install

---
## Tasks 0
> Download, extract, and compile the latest stable Redis version (higher than 5.0.7 - https://redis.io/download/):

## task 1
1.  [Node Redis Client](./0-redis_client.js)
2.  [Node Redis client and basic operations](./1-redis_op.js)
3. [Node Redis client and async operations](./2-redis_op_async.js)
4. [Node Redis client and advanced operations](./4-redis_advanced_op.js)
5. [Node Redis client subscriber](./5-subscriber.js)
5. [Node Redis client subscriber](./5-publisher.js)
6. [Create the Job creator](./6-job_creator.js)
7. [Create the Job processor](./6-job_processor.js)
8. [Track progress and errors with Kue: Create the Job creator](./7-job_creator.js)
9. [Track progress and errors with Kue: Create the Job processor](./7-job_processor.js)
10. [Writing the job creation function](./8-job.js)
11. [Writing the test for job creation](./8-job.test.js)
12. [In stock?](./9-stock.js)
13. [Can I have a seat?](./100-seat.js)

- [💉] boom
---
## Author <hkoffianderson@gmai.com>
