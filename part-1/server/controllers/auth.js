const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body
      //this loops through the login information comparing users[i] with the registration
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username){
          const authenticated = bcrypt.compareSync(password, users[i].passwordHash)
          // this compares the hashed password with the submitted password turning it into a hash, the value, if true will return the information to client
          if (authenticated) {
            let userToReturn = {...users[i]}
            // this keeps the hashed password from being returned to the client
            delete userToReturn.passwordHash
            res.status(200).send(users[i])
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      // username, email... etc is located in file /crypto-secruity/index.js
        const { username, email, firstName, lastName, password } = req.body
        const salt = bcrypt.genSaltSync(12)
        const hashedPassword = bcrypt.hashSync(password, salt)
        let user = {
          username,
          email,
          firstName,
          lastName,
          hashedPassword
        }
        users.push(user)
        res.status(200).send(req.body)
    }
}