const AWS = require("aws-sdk")
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
    console.log(users)
    return users
};