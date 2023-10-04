const jwt = require('jsonwebtoken')
const User = require('../Model/UserModel')

const protect  = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers


  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    let jwt_sec = 'abc123';  
    const  de  = jwt.verify(token, jwt_sec)
    console.log('de', de)

    req.user = await User.findById( de.id ).select('-password')
    console.log('user-MIO', req.user)
      
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = protect 