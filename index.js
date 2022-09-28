const express = require('express')
let ActiveDirectory = require('activedirectory');
const app = express()
const port = 3000

app.use(express.json())

app.post('/', async (req, res) => {
    let config = {
        url: 'ldap://192.168.16.20',
        baseDN: 'dc=killerbee,dc=com',
    }

    res.send("aze")

    let ad = new ActiveDirectory(config);
    let username = req.body.email;
    let password = decrypt(req.body.password);

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

function decrypt(encodedText) {
    encodedText = encodedText.split("").reverse()
    const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_', '.', '@', '-', ' ', '\'', '"'];
    const shuffledChars = ['v', 'h', '.', 'N', 'V', 'y', 'e', 'B', 'c', 'L', 'f', 'g', '_', 'T', "'", 'l', '@', 'd', '-', 'k', 'S', 'K', 'R', 'P', 'D', 'Y', 'J', 'A', 'I', 's', 'q', 'i', 'm', 'O', 'C', 'F', 'U', 'E', 'G', 'j', 'Q', 'w', 'u', 'H', 'n', ' ', 'r', 'x', 't', 'W', 'z', 'a', 'M', 'X', '"', 'b', 'Z', 'o', 'p']
    let array = []
    let j = 0
    for (let i = 0; i < encodedText.length; i++) {
        j === 6 ? j = 0 : j++
        array = [...array, chars[shuffledChars.indexOf(encodedText[i]) - j]]
    }

    return array.join('')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})