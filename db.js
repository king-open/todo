const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error)  return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error) => {
        if (error) return console.log(error)
        resolve()
      })
    })

  }
}
module.exports = db