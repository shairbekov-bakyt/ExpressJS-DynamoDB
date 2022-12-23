// import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
// import dotenv from 'dotenv'
//
// dotenv.config()

// import {CognitoUserPool} from "amazon-cognito-identity-js";
// import CognitoExpress from 'cognito-express';
const CognitoExpress = require('cognito-express')
const {CognitoUserPool, CognitoUser, AuthenticationDetails} = require('amazon-cognito-identity-js')
require("dotenv").config()


// Setup CognitoExpress
const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_DEFAULT_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    tokenExpiration: 3600
})

// Setup CognitoUserPool
const poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID
};
// console.log(poolData)

const UserPool = new CognitoUserPool(poolData)

const signUp = (email, password) => {
    return new Promise((resolve, reject) => {
        UserPool.signUp(email, password, [], [], (err, data) => {
            if (err) {
                console.error(err)
                resolve({status: err.code, message: err.message})
            }
            resolve({status: 201, message: "you need to verify account check your email"})
        })
    })
}

const signIn = (Username, Password) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({Username, Pool: UserPool});
        const authDetails = new AuthenticationDetails({Username, Password});

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                resolve({
                    email: data.getIdToken().payload.email,
                    accessToken: data.getAccessToken().getJwtToken(),
                    refreshToken: data.getRefreshToken().getToken()
                })
            },
            onFailure: (err) => {
                reject(err)
            },
            newPasswordRequired: (data) => {
                resolve({
                    email: data.getIdToken().payload.email,
                    accessToken: data.getAccessToken().getJwtToken(),
                    refreshToken: data.getRefreshToken().getToken()
                })
            },
        })
    })
}
const validateAuth = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        // Validate the token
        const token = req.headers.authorization.split(" ")[1]
        cognitoExpress.validate(token, function (err, response) {
            if (err) {
                // If there was an error, return a 401 Unauthorized along with the error
                res.status(401).send(err)
            } else {
                //Else API has been authenticated. Proceed.
                next();
            }
        });
    } else {
        // If there is no token, respond appropriately
        res.status(401).send("No token provided.")
    }
}


module.exports = {
    validateAuth,
    signIn,
    signUp
}
