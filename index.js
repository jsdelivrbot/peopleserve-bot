const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const GoogleSpreadsheet = require('google-spreadsheet');
const bodyParser = require('body-parser');
const async = require('async');
const doc = new GoogleSpreadsheet('1rdDiUasw1IasMa3-hOgj0hvVur-mqunjq4U79VJthws');


async.series([
    setAuth = (step) => {
        // see notes below for authentication instructions!
        var creds = {
            "type": "service_account",
            "project_id": "fresh-effort-200709",
            "private_key_id": "82c302ed12ebdc2bbc4c93a588c99fb9c317a656",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfnuiDo8tEhjrx\nQqrQ0lDT0PVT9v8Pd2vyqmDF57Pdk0KF0Rstcwlq+TAhmV9FvB/XC/0ci6uFltrQ\nOrZgxpnuhaMvDjXPnSUWweyIsQ6Y+lBsCdb4g7DtmtUn62zBH+Y4Ie0mSMcK2II4\n8uU1/Zkd4kaRS+ae3Z8z99go4dN+oybRvmNyV4E7njlzmtI2yIZWYDNpJFuSePQL\nJprIivHlhkqvG+suOJjKkcvfJqsSd6WW527os78elxE0uKB7amojHV/f/vMmoLpF\ntaRBpcFH0p5foOyPta3Dj/TBYgjprNB5/y1JDd8TC8IhIxuEq+aiAjv5wQlKFcco\n7HTb1+4lAgMBAAECggEACXdfIA94Cpml/TuQQyTLQ69CHWH/QRI6sKrcul/svC3z\nkAQVXIip/PzHl0vak+7S5JStb3fztXnQ2EXjHbIpht/Itw2yBfIH37r4etLP+XqU\nMmloT6y1CCJalIIoclD1/PY7c5MgBXX5oxmkm6MX5ZHPJZF0HTp/f+bURvhoQTuh\nICAOp/qkdA5B+qJBLJush+7gvu00rzhNNOMAYJeQA3yeeuHvMxpqZHEg3c+0Jilg\n/54NmCoOGGdIKGmu/XoD1Chz0ernDeD1CUKKclpmQuhjK3Bk2KGhCfQ8VcMZQjMr\ncdF1R2k6HzXUcmLTeffLFycC/yHLYnJFx/pArci3MQKBgQDRIOFEirroFfd4e0b1\nHygbKr0BhlL3WrT7T5EtXmQ0zAEc4D+XejP7A4oYrVCAs9MmXDs4vOOVANaZd1A9\nDLievqBqcK39zQsO9xlOb1t2CNjvN3V0B9T5XOcIOXub5LyVO+KC+K3wfslTkD0p\n7UjaW6y1ShbHv96oplRY37zm2wKBgQDDZW9WDed7SSDeEW3fGWo+2K9be3++NPpk\nllVo9mgJviTifWw3nqioCj7ECdcXGgqDYQaADwfex2uYV4BQsaLd3ho/qeO7bI2p\nOp1/CenTSIyPjXT1bvLzC5e8XGC88HKgQp6GbO1mQE4if46ztm+f4m4md9iivhi3\nyUnRKIoO/wKBgQCKLteqmqB1yk4C5jI0tamiidLptwALQXxksmaTO9Oqr0Hs+qAK\nT00Zh3UwaRTQdgIHTtoy21zlj/A854G1VTqIah1FN78//MRZ1xx5n0sn6yCssFCD\noskvHBvsa08p6zJQyYkaUYddaelNtfk0Qv3oirrL73Ct/DH77iu9rdj8EQKBgQCh\ny41siWjjKkOf/ninIwlZ7t0NeG7nlkC8J8ujdV3iq2MpdEe2qpbnRkyA0dEcHQEV\nlrLmOQwAScrrQ5FJwD2nT/EWRFwBZzrKJXIirpfCzzEs8SomzO85l6DWZPvpl4Si\n9WcE0o+lepv4bv1ADFHT54/kJJrq71PSY0fPfK0NCwKBgGwG/6BirUGU++GnplBy\n2sEfo/i1NTwKefKUDZAPTD6GeZ1nIl3/nKpcgadpTE1N7ugh6hCCG6CUA5r8vimV\nKNm2tpWSpSDtB/OKWjU8iwpIRz63oIySzVsCa1H0OFHnHyvTMk6ixlohkP73qzNk\nXosrL9uUMQk5OZ06TBMuKYZO\n-----END PRIVATE KEY-----\n",
            "client_email": "peopleserve@fresh-effort-200709.iam.gserviceaccount.com",
            "client_id": "109023989379681204479",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://accounts.google.com/o/oauth2/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/peopleserve%40fresh-effort-200709.iam.gserviceaccount.com"
        }

        doc.useServiceAccountAuth(creds, step);
    }
])


function findById(id, rows) {
    rows.forEach((value, index) => {
        if (value.id == id) {
            console.log(index);
            return index
        }
        else {
            console.log("wala");
        }
    })
}

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/datepicker', (req, res) => {
        fbid = req.query['id']
        res.render('pages/sample', { id: fbid })
    })

    .get('/sample', (req, res) => {
        console.log(req.query.fbid);
        console.log('log');
        console.log(req.query.samples);
        var request = require('request');
        request.post(
            `https://api.chatfuel.com/bots/5acc3391e4b075d7ce12ddd4/users/${req.query.fbid}/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=newRequirements`,
            { json: { key: req.query.samples } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
    })

    .get('/skilled', (req, res) => {
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {

                var id = row.findIndex(value => value.id == req.query.id)
                console.log(id);
                row[id].category = req.query.category;
                row[id].save();
            })
        let data = [
            { position: "Forklift Operator" },
            { position: "Driver" },
            { position: "Butcher" },
            { position: "Massage Therapist" },
            { position: "Gym Instructor" },
            { position: "Warehouse Personnel" },
            { position: "CAD Operator" },
            { position: "Visual Artist" },
            { position: "Plant Operator" },
            { position: "Utility Man" }
        ];
        let id = req.query['id'];
        res.render('pages/positions', { positions: data, id: id });
    })

    .get('/retail', (req, res) => {
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query.id)
                console.log(id);
                row[id].category = req.query.category;
                row[id].save();
            })
        let date = [
            { position: "Sales Clerk" },
            { position: "Customer Service Associate" },
            { position: "Bagger" },
            { position: "Merchandiser" },
        ];
        let id = req.query.id;
        res.render('pages/positions', { positions: date, id: id });
    })

    .get('/food', (req, res) => {
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query.id)
                console.log(id);
                row[id].category = req.query.category;
                row[id].save();
            })
        let date = [
            { position: "Service Staff" },
            { position: "Kitchen Staff" },
            { position: "Dining Staff" },
            { position: "Dishwasher" },
            { position: "Busboy" },
            { position: "Barista" },
            { position: "Cook" }
        ];
        let id = req.query.id;
        res.render('pages/positions', { positions: date, id: id });
    })

    .get('/backOffice', (req, res) => {
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query.id)
                console.log(id);
                row[id].category = req.query.category;
                row[id].save();
            })
        let date = [
            { position: "HR Staff" },
            { position: "Accounting Staff" },
            { position: "Payroll Staff" },
            { position: "Admin Staff" },
            { position: "Area Coordinator" },
            { position: "Airline Ticketing Agent" },
            { position: "Auto Loan Processor" },
        ];
        let id = req.query.id;
        res.render('pages/positions', { positions: date, id: id });
    })

    .get('/NCR', (req, res) => {
        let date = [
            { location: "Caloocan" },
            { location: "Malabon" },
            { location: "Navotas" },
            { location: "Valenzuela" },
            { location: "Quezon City" },
            { location: "Marikina" },
            { location: "San Juan" },
            { location: "Marikina" },
            { location: "Rizal" },
            { location: "Mandaluyong" },
            { location: "Pasig" },
            { location: "Taguig" },
            { location: "Makati" },
            { location: "Pasay" },
            { location: "Las Pinas" },
            { location: "Paranaque" },
            { location: "Muntinlupa" },
        ];
        let id = req.query.id;
        res.render('pages/locations', { locations: date, id: id });
    })

    .get('/VISMIN', (req, res) => {
        let date = [
            { location: "Cebu" },
            { location: "Davao" },
            { location: "Bacolod" },
            { location: "Iloilo" },
            { location: "Roxas City" },
            { location: "Tacloban" },
            { location: "Antique" },
            { location: "Dumaguete" },
            { location: "Cagayan De Oro" },
            { location: "Cotabato" },
        ];
        let id = req.query.id;
        res.render('pages/locations', { locations: date, id: id });
    })

    .get('/NL', (req, res) => {
        let date = [
            { location: "Bulacan" },
            { location: "Pampanga" },
            { location: "Cotabato" },
            { location: "Nueva Ecija" },
            { location: "Zambales" },
            { location: "Bataan" },
            { location: "Tarlac" },
            { location: "Pangasinan" },
            { location: "La Union" },
            { location: "Baguio City" },
            { location: "La Trinidad" },
            { location: "Ilocos Norte" },
            { location: "Isabela" },
        ];
        let id = req.query.id;
        res.render('pages/locations', { locations: date, id: id });
    })

    .get('/SL', (req, res) => {
        let date = [
            { location: "Laguna" },
            { location: "Cavite" },
            { location: "Batangas" },
            { location: "MIMAROPA" },
            { location: "Quezon Province" },
        ];
        let id = req.query.id;
        res.render('pages/locations', { locations: date, id: id });
    })




    .get('/results', (req, res) => {
        doc.addRow(2, {
            "id": "1234",
            "firstname": "Testing",
            "lastname": Date.now()
        }, (result) => {
            res.send(result)
        }, (err) => {
            res.send(err)
        })
    })


    .get('/Start', (req, res) => {
        doc.addRow(2, {
            "Id": req.query["messenger user id"],
            "Firstname": req.query["first name"],
            "Lastname": req.query["last name"],
            "Education": "",
            "Category": "",
            "Position": "",
        }, (result) => {
            res.send(result)
        }, (err) => {
            res.send(err)
        })
    })

    .get('/check', (req, res) => {
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                if (row.find(x => x.id == req.query["messenger user id"])) {

                    request.post(
                        `https://api.chatfuel.com/bots/5acc3391e4b075d7ce12ddd4/users/${req.query.id}/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=Validate`,
                        { json: { key: "" } },
                        function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.log("success");
                                console.log(body)
                            }
                        })
                }
                else{
                    request.post(
                        `https://api.chatfuel.com/bots/5acc3391e4b075d7ce12ddd4/users/${req.query.id}/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=Education`,
                        { json: { key: "" } },
                        function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                console.log("success");
                                console.log(body)
                            }
                        })
                }

            })
    })

    .get('/Education', (req, res) => {
        console.log(req.query["messenger user id"])
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                // console.log(row[findById(req.query["messenger user id"],row)])
                row[findById(req.query["messenger user id"], row)].education = req.query.education;
                row[findById(req.query["messenger user id"], row)].save();
                // console.log(err);
                res.send(row);
            })
    })

    .get('/Category', (req, res) => {

        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                console.log(row[findById(req.query["messenger user id"], row)])
                row[findById(req.query["messenger user id"], row)].category = req.query.category;
                row[findById(req.query["messenger user id"], row)].save();
                res.send(row);
            })
    })

    .get('/Position', (req, res) => {
        console.log(req.query)
        console.log(req.query.Others);

        var request = require('request');
        if (req.query.WorkPosition != "undefined") {
            console.log("pumasok")
            doc.getRows(2,
                {
                    offset: 1,
                }, (err, row) => {
                    var id = row.findIndex(value => value.id == req.query.id)
                    row[id].position = req.query.WorkPosition;
                    row[id].save();
                })


            request.post(
                `https://api.chatfuel.com/bots/5acc3391e4b075d7ce12ddd4/users/${req.query.id}/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=Location`,
                { json: { key: req.query.WorkPosition } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log("success");
                        console.log(body)
                    }
                }
            );

        }
        else if (req.query.Others != "") {
            console.log(req.query.Others);
            doc.getRows(2,
                {
                    offset: 1,
                }, (err, row) => {
                    row.map((value, index) => {
                        var id = row.findIndex(value => value.id == req.query.id)
                        row[id].position = req.query.Others;
                        row[id].save();
                    })

                })

            request.post(
                `https://api.chatfuel.com/bots/5acc3391e4b075d7ce12ddd4/users/${req.query.id}/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=Location`,
                { json: { key: req.query.Others } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                }
            );

        }
    })

    .get('/LocPrint', (req, res) => {
        var request = require('request');
        if (req.query.WorkPosition != "undefined") {
            doc.getRows(2,
                {
                    offset: 1,
                }, (err, row) => {
                    var id = row.findIndex(value => value.id == req.query.id)
                    row[id].location = req.query.WorkPosition;
                    row[id].save();
                })


            request.post(
                `https://api.chatfuel.com/bots/5acc3391e4b075d7ce12ddd4/users/${req.query.id}/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=Thankyou`,
                { json: { key: req.query.WorkPosition } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                }
            );

        }
        else if (req.query.Others != "") {
            doc.getRows(2,
                {
                    offset: 1,
                }, (err, row) => {
                    row.map((value, index) => {
                        var id = row.findIndex(value => value.id == req.query.id)
                        row[id].location = req.query.Others;
                        row[id].save();
                    })

                })

            request.post(
                `https://api.chatfuel.com/bots/5acc3391e4b075d7ce12ddd4/users/${req.query.id}/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=Thankyou`,
                { json: { key: req.query.Others } },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body)
                    }
                }
            );

        }

    })

    .get('/writeName', (req, res) => {
        console.log(req.query)
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query["messenger user id"])
                row[id].name = req.query.Name;
                row[id].save();
                res.send(row);
            })
    })

    .get('/writeAddress', (req, res) => {
        console.log(req.query)
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query["messenger user id"])
                row[id].address = req.query.Address;
                row[id].save();
                res.send(row);
            })
    })

    .get('/writeBirthday', (req, res) => {
        console.log(req.query)
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query["messenger user id"])
                row[id].birthday = req.query.birthday;
                row[id].save();
                res.send(row);
            })
    })

    .get('/writeEmail', (req, res) => {
        console.log(req.query)
        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query["messenger user id"])
                row[id].email = req.query.email;
                row[id].save();
                res.send(row);
            })


    })

    .get('/writeNumber', (req, res) => {
        console.log(req.query)
        console.log(req.query.number.length);

        doc.getRows(2,
            {
                offset: 1,
            }, (err, row) => {
                var id = row.findIndex(value => value.id == req.query["messenger user id"])
                row[id].number = req.query.number;
                row[id].save();
                res.send(row);
            })


    })

    .listen(PORT, () => console.log(`Listening on ${PORT}`))
