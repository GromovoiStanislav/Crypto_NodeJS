//Migrating from bcrypt

import argon2 from 'argon2'
import bcrypt from 'bcrypt'

router.post('/login', async ctx => {
  const { email, password } = ctx.request.body
  const user = await User.findOne({ email })
  
  // bcrypt hashes start with $2a$ or $2b$
  // argon2 hashes start with $argon2i$, $argon2d$ or $argon2id$
  if (user.password.startsWith('$2')) {
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new Error('Unauthorized')
    }

    // rehash password with argon2
    user.password = await argon2.hash(password)
    await user.save()
  } else {
    const match = await argon2.verify(user.password, password)
    if (!match) {
      throw new Error('Unauthorized')
    }
  }
  // user is authorized and password is updated
  
})
