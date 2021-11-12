import client from './bot/bot.js'
import app from './server/express/server.js'
import ws from './server/websockets/wss.js'


import dotenv from 'dotenv'
dotenv.config()

client.login(process.env.TOKEN)
ws(app.listen(process.env.PORT || 3000, () => {
    console.log("servidor iniciado")
}))