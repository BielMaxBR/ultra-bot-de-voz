export default (req, res) => {
    var session = req.session
    if (session && app.db[req.sessionID]) {
        //res.send("Welcome User <a href=\'/logout'>click to logout</a>");
        res.redirect('/client/html/a.html')
    } else {
        res.sendFile('/client/index.html', { root: "./client" })
    }
}