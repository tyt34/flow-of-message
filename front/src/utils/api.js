const link = 'http://localhost:3001'

export const getMessages = () => {
  //console.log(' get from: ', link)
  return fetch(link, {
    method: 'GET',
  })
  .then(res => {
    return res.json()
  })
}
