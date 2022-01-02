import client from './bot/bot.js'
import app,{server} from './server/server.js'

import router from './server/router.js'
// app.use(router)

import dotenv from 'dotenv'
dotenv.config()

client.login(process.env.TOKEN)

// server.listen(process.env.PORT || 3000, function() {
//     console.log("servidor iniciado")
// })