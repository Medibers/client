import jwt from 'jsonwebtoken'

const secret: string = process.env.REACT_APP_JWT_SECRET || ''

const fn = (token: string | null) =>
  (token ? jwt.verify(token, secret) : {}) as Record<string, unknown>

export default fn
