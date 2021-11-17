import client from './bot/bot.js'
import {server} from './server/server.js'
// import ws from './server/websockets/wss.js'

import dotenv from 'dotenv'
dotenv.config()

client.login(process.env.TOKEN)
server.listen(process.env.PORT || 3000, function() {
    console.log("servidor iniciado")
})
// ws(server)