export default (req, res) => {
    if (app.db[req.sessionID]) {
        delete app.db[req.sessionID]
    }
    req.session.destroy();
    res.redirect('/');
}