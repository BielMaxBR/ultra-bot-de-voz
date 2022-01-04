import { Collection, Client as DiscordClient } from "discord.js"
import { readdir, lstatSync } from "fs"

export default class Client extends DiscordClient {
    constructor(options) {
        super(options || {})

        this.commands = new Collection()
        this.events = new Collection()
    }

    login(token) {
        super.login(token)
    }

    getCommand(value) {
        return this.commands.get(value)
    }

    async loadCommands(dir, root) {
        return new Promise((res, rej) => {

            readdir(root + '/' + dir, async (err, files) => {
                if (err) {
                    console.error(err)
                    return rej(false)
                }

                for (const file of files) {
                    const filePath = `${dir}/${file}`
                    const fileStatus = lstatSync(`${root}/${filePath}`)

                    if (fileStatus.isDirectory()) {
                        this.loadCommands(filePath, root)
                        continue
                    }

                    if (file.endsWith('.js')) {
                        const imported = await import('../' + filePath)
                        const command = imported.default
                        this.commands.set(command.builder.name, command)
                    }
                }
                console.log('comandos carregados')
                res(true)
            })
        })
    }
    loadEvents(dir, root) {
        return new Promise((res, rej) => {

            readdir(root + '/' + dir, async (err, files) => {
                if (err) {
                    console.error(err)
                    return rej(false)
                }

                for (const file of files) {
                    const filePath = `${dir}/${file}`
                    const fileStatus = lstatSync(`${root}/${filePath}`)

                    if (fileStatus.isDirectory()) {
                        this.loadEvents(filePath, root)
                        continue
                    }

                    if (file.endsWith('.js')) {
                        const imported = await import('../' + filePath)
                        const event = imported.default
                        super.on(file.split(".")[0], (...args) => event(...args))
                    }
                }
                console.log('eventos carregados')
                res(true)
            })
        })
    }
}