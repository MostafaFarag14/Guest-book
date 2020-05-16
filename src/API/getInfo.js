export const getMessage = (messageId) => {
  return fetch('http://localhost:5000/getmessage',
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
  return fetch('http://localhost:5000/user',
  {
    method: 'post',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({
     id: userId
    })
  })
  .then(resp => resp.json())
}