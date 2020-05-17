

1. I used React bootstrap to make register and login forms
2. To be able to navigate betwwen pages (register , login , home and message details page i used react router
3. In navigation component there are 3 react router links to be able to login , register or signout
4. In Register\login endpoint in backend i used bcryptjs to encrypt passwords before storing in database or comparing the entered one with the stored password
5. For database i used Mongodb atlas as it's easy to create and connect a database 
6. I created two models for user and message and used the reference model to relate documents  , every user has (name, email, password) and messages field which is an array to store id_s of user messages that he writes 
7. Each  message has a content field , owner feld which is a reference to user id, reply field to indicate whether it's a message or a reply to another message and replies field which is an array of id_s that references another messages that are replies
8. To connect backend server to database and make CRUD operations i used mongoose library 
9. home scrren route renders a writeMessage component to enable user to write his own message and list of message components which data are fetched using /book endpoint 
10. When user click reply to any message he will be directed to /message route which renders a writeMessage component but with different prop to save this message as a reply to the original message using the /reply endpoint
11.User can delete a message by clicking delete button on a certain message that triggers /delete endpoint 
12. In backend server i created a function called createMessage to use it in creating a message or a reply by providing an argument to save it in reply field in message document , for example if it is a reply , /reply endpoint will first save the reply to database then get the original message and push that reply id to replies array of original message
13. At home screen /book endpoint will get messages that has a reply attribute of false value to display only the written messages on wall or home screen not a reply to another message

## editting message in frontend is not available yet
