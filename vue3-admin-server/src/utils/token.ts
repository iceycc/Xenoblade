import util from 'util'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/auth'

const jwtVerify = util.promisify<string, string>(jwt.verify)

export const createToken = (payload: any) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '6h' })
}


// 解析token
export const getInfoByToken = async <T>(token: string): Promise<T | null> => {
  try {
    const res = await jwtVerify(token, jwtSecret)
    return res as unknown as T
  } catch (err) {
    console.error(err.message)
    return null
  }
}
