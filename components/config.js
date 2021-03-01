require('dotenv').config()

const MS_API_KEY = process.env.MS_API_KEY || null

module.exports = 
{
    "MS_API_KEY": MS_API_KEY,
    "apiUrl": "https://api.mediashuttle.com/v1"
}