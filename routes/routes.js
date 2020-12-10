const { Router } = require('express');
const bodyParser = require('body-parser');
const Film = require('../models/film')

const router = Router();
const jsonParser = bodyParser.json();

router.get('/', async(req, res) => {
    try {
        const films = await Film.find({});
        let filmJson = JSON.stringify(films);

        res.render('index', {
            title: 'film',
            filmJson: filmJson
        });
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.post('/', jsonParser, async function(req, res) {
    try {
        res.sendStatus(200);
        const reqBody = req.body;

        const film = new Film({
            title: reqBody.title,
            rateIMDb: reqBody.rateIMDb,
            durationinMin: reqBody.durationinMin
        });
        await film.save();

    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.delete('/', jsonParser, async function(req, res) {
    try {
        res.sendStatus(200);
        const reqBody = req.body;
        const film = await Film.findById(reqBody.id);
        await film.delete();
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

router.put('/', jsonParser, async function(req, res) {
    try {
        res.sendStatus(200);
        const reqBody = req.body;
        const film = await Film.findById(reqBody.id);

        if (reqBody.title != '') {
            film.title = reqBody.title;
        }
        if (reqBody.rateIMDb != '') {
            film.rateIMDb = reqBody.rateIMDb;
        }
        if (reqBody.durationinMin != '') {
            film.durationinMin = reqBody.durationinMin;
        }

        await film.save();
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
});

module.exports = router