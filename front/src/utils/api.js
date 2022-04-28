const BASENAME = process.env.REACT_APP_BASENAME

let link

if (BASENAME === undefined) {
  link = 'https://flow-mess.glitch.me/'
} else {
  link = BASENAME
}

export const getMessages = () => {
  console.log(' get from: ', link)
  return fetch(link, {
    method: 'GET',
  })
  .then(res => {
    return res.json()
  })
}
