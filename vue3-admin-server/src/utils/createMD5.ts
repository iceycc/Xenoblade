import crypto from 'crypto'
import { userSecret } from '../config/auth'

// md5加密
export const createMd5 = (content: any) => {
  const md5 = crypto.createHash('md5')
  return md5.update(`${content}_${userSecret}`).digest('hex')
}
