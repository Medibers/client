import jwt from 'jsonwebtoken'

const secret: string = process.env.REACT_APP_JWT_SECRET || ''

export default (token: string | null) => {
  return (token ? jwt.verify(token, secret) : {}) as Record<string, unknown>
}
