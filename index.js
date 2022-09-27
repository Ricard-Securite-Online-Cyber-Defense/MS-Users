const express = require('express')
var ActiveDirectory = require('activedirectory');
const app = express()
const port = 3000

app.use(express.json())

app.post('/', async (req, res) => {
    var config = {
        url: 'ldap://192.168.16.20',
        baseDN: 'dc=killerbee,dc=com',
    }

    var ad = new ActiveDirectory(config);
    var username = req.body.email;
    var password = req.body.password;

    ad.authenticate(username, password, function(err, auth) {
        if (err) {
            res.send('Cannot authenticate')
            return;
        }

        if (auth) {
            res.send({
                'auth': auth,
                'user': username
            });
        }
        else {
            res.send('Authentication failed');
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})