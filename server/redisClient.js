import { createClient } from 'redis';
import dotenv from "dotenv"
dotenv.config()

const client = createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

client.on('ready', () => {
    console.log('redis conectado')
})

const redis = {}
redis.get = (dataName, key) => {
    return new Promise((resolve) => {
        client.hget(dataName, key, (err, data) => {
            if (err) {
                resolve(undefined)
                return
            }
            resolve(data)
        })
    })
}
redis.set = (dataName, key, newData) => {
    return new Promise((resolve) => {
        client.hset(dataName, key, newData, (err, data) => {
            if (err) {
                resolve(undefined)
                return
            }
            resolve(data)
        })
    })
}
redis.del = (dataName, key) => {
    return new Promise((resolve) => {
        client.hdel(dataName, key, (err) => {
            if (err) {
                resolve(undefined)
                return
            }
            resolve("done")
        })
    })
}
export default redis