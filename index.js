import client from './bot.js'
import app from './server.js'

import dotenv from 'dotenv'
dotenv.config()

client.login(process.env.TOKEN)
app.listen(process.env.PORT || 3000)