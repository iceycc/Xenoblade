import axios from 'axios'

const useFetch = async (url: string): Promise<unknown> => {
  return await new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get'
    }).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(new Error(res.statusText))
      }
    }).catch(err => {
      reject(new Error(err.message))
    })
  })
}

export {
  useFetch
}
