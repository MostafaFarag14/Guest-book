export const getMessage = (messageId) => {
  return fetch('https://pacific-atoll-58394.herokuapp.com/getmessage',
  {
    method: 'post',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
     id: messageId
    })
  })
  .then(resp => resp.json())
  .then(jsonResp => jsonResp)
}


export const getMessageOwner = (userId) => {
  return fetch('https://pacific-atoll-58394.herokuapp.com/user',
  {
    method: 'post',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
     id: userId
    })
  })
  .then(resp => resp.json())
}