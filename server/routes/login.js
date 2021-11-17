import dotenv from 'dotenv'
dotenv.config()

export default (req, res) => {
    if (app.db[req.sessionId]) {
        // login direto
        res.redirect('/');
    }
    else {
        res.redirect(process.env.LOGINURL)
    }
}