const AWS = require("aws-sdk")
const {param} = require("express/lib/router");
require("dotenv").config()

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID
});

const tableName = "User";
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const getUsers = async () => {
    const params = {
        TableName: tableName
    };
    const users = await dynamoClient.scan(params).promise();
    return users
};

const addOrUpdateUser = async (userItem) => {
    const params = {
        TableName: tableName,
        Item: userItem
    };
    const user = await dynamoClient.put(params).promise();
    return user
}


const getUserById = async (id) => {
    const params = {
        TableName: tableName,
        Key: {
            id,
        }
    }
    const userById = await dynamoClient.get(params).promise();
    return userById;
}

const deleteUserById = async (id) => {
    const params = {
        TableName: tableName,
        Key: {
            id,
        }
    }
    return await dynamoClient.delete(params).promise();
}

module.exports = {
    dynamoClient,
    getUsers,
    getUserById,
    deleteUserById,
    addOrUpdateUser
}