const express = require('express')
const app = express()

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
  
let users = [
    {
        "id": 1,
        "user": "Lucas1",
        "pass": "Cont1234",
        "name": "lucas",
        "lastName": "carri",
        "year": "32",
        "rol": "admin",
        "token": "1234567890"
    },{
        "id": 2,
        "user": "Seba1",
        "pass": "Pword123",
        "name": "seba",
        "lastName": "bolean",
        "year": "30",
        "rol": "user",
        "token": "1234567891"
    }
];


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/users', (request, response) => {
    response.json(users)
})

app.post('/login', (request, response) => {
    const credentials = request.body
    console.log('credentials(login):', credentials)

    if(!credentials || !credentials.user || !credentials.password){
        return response.status(400).json({
            error: 'in request, user or password is missing'
        })
    }  

    const hasNumber = /\d/;
    const isUpperCase = /[A-Z]/;
    const islowerCase = /[a-z]/;

    const loginUserHasNumber = hasNumber.test(credentials.user);
    const loginpasswordHasNumber = hasNumber.test(credentials.password);
    console.log('number');
    console.log('loginUserHasNumber(login):', loginUserHasNumber);
    console.log('loginpasswordHasNumber(login):', loginpasswordHasNumber);

    const loginUserHasUpperCase = isUpperCase.test(credentials.user);
    const loginpasswordHasUpperCase = isUpperCase.test(credentials.password);
    console.log('UpperCase');
    console.log('loginUserHasUpperCase(login):', loginUserHasUpperCase);
    console.log('loginpasswordHasUpperCase(login):', loginpasswordHasUpperCase);

    const loginUserHaslowerCase = islowerCase.test(credentials.user);
    const loginpasswordHaslowerCase = islowerCase.test(credentials.password);
    console.log('lowerCase');
    console.log('loginUserHaslowerCase(login):', loginUserHaslowerCase);
    console.log('loginpasswordHaslowerCase(login):', loginpasswordHaslowerCase);

    if(!(loginUserHasNumber && loginUserHasUpperCase && loginUserHaslowerCase)){
        return response.status(400).json({
            error: 'the User need get a number, a Lowercase Characters and a Uppercase Characters '
        })
    }

    if(!(loginpasswordHasNumber && loginpasswordHasUpperCase && loginpasswordHaslowerCase)){
        return response.status(400).json({
            error: 'the Password need get a number, a Lowercase Characters and a Uppercase Characters '
        })
    }

    const user = users.find(elem => elem.user == credentials.user);
    console.log('users.find: -*-*-*-*-*-*-*-*-*-*-*-*-');
    console.log('user:',user);

    if(user) {
        if(user.pass == credentials.password){
            response.json(user)
        } else {
            return response.status(400).json({
                error: 'wrong password'
            })
        }
        
    } else {
        return response.status(400).json({
            error: 'User do not exit'
        })
    }
    
})

const PORT = 3001 
app.listen(PORT, () => {
    console.log( `Server running on port ${PORT}`)
})