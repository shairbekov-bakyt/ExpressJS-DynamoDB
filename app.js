const {
    addOrUpdateUser,
    getUsers,
    deleteUserById,
    getUserById,
} = require('./dynamo');
const express = require('express')
const bodyParser = require('body-parser')
const {validateAuth, signUp, signIn} = require('./auth.js')
const cors = require('cors')

const app = express()
const port = 3000

app.use(bodyParser(), cors());
app.get('/', (req, res) => {
    res.send('Hello World!').status(200)
})

app.get('/api/v1/users', validateAuth, async (request, response) => {
    try {
        const users = await getUsers()
        response.send(users).status(200)
    } catch (err) {
        console.log(err)
        response.send({errorMessage: 'Something went wrong'}).status(500)
    }

})

app.get('/api/v1/users/:id', async (request, response) => {
    const id = request.params.id
    try {
        const userById = await getUserById(id)
        response.send(userById).status(200)
    } catch (error) {
        response.send({errorMessage: 'Something went wrong'}).status(500)
    }
})

app.delete('/api/v1/users/:id', async (request, response) => {
    const id = request.params.id
    try {
        await deleteUserById(id);
        response.send({state: "success"}).status(200)

    } catch (err) {
        response.send({errorMesage: 'Something went wrong'}).status(500)
    }
})

app.post('/api/v1/users', validateAuth, async (request, response) => {
    const user = request.body;
    try {
        const newUser = await addOrUpdateUser(user);
        response.json(newUser).status(200);
    } catch (err) {
        console.log(err)
        response.status(500).send({errorMessage: 'Something went wrong'});
    }
});

app.post('/api/v1/users/signUp', async (request, response) => {
    const user = request.body
    try {
        const {email, password} = user
        if (!email && !password) {
            response.send({message: "password or email invalid", status: 400})
        }
        const newUser = await addOrUpdateUser(user)
        const registeredUser = await signUp(email, password)
        response.send(registeredUser)
    } catch (error) {
        response.send(error)
    }
})

app.post('/api/v1/users/signIn', async (request, response) => {
    const user = request.body
    try {
        const {email, password} = user
        if (!email && !password) {
            response.send({message: "password or email invalid", status: 400})
        }
        const signinedUser = await signIn(email, password)
        response.send(signinedUser)
    } catch (error) {
        response.send(error)
    }
})



app.put('/api/v1/users/:id', async (request, response) => {
    const user = request.body;
    const {id} = request.params;
    user.id = id;
    try {
        const newUser = await addOrUpdateUser(user);
        response.send(newUser).status(200);
    } catch (err) {
        response.send({errorMessage: 'Something went wrong'}).status(500);
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
