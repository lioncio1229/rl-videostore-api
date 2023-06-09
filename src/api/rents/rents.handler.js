const rents = require('../../services/rents.js');
const movies = require('../../services/movies.js');
const rentsRecords = require('../../services/rentsRecords.js');
const users = require('../../services/users.js');

async function addRent(req, res)
{
    try{
        const { movieId } = req.query;

        const result = await rents.addRent({username: req.username, movieId});
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getRents(req, res)
{
    try{
        const { style } = req.query;
        let records = await rents.getRents();

        if(style === 'byMovie')
        {
            const videList = await movies.getMovies();
            records = rentsRecords.getRecordsByMovie(videList, records);
        }
        else if(style === 'byCustomer')
        {
            const userList = await users.getUsers();
            records = rentsRecords.getRecordsByCustomers(userList, records);
        }

        res.status(200).send(records);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getRentsByUser(req, res)
{
    try{
        const result = await rents.getRents(req.params.username);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function deleteRent(req, res)
{
    try{
        const { rentId } = req.params;
        const result = await rents.deleteRent(rentId);
        res.status(200).send(result);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

async function getRentEvent(req, res)
{
    try{
        const { rentId } = req.params;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        res.write(`event: start\ndata: ${JSON.stringify({message: 'Connection established'})}\n\n`);

        async function sendEvent() {

            const rTime = await rents.rentRemainingTime(rentId);

            if (rTime <= 0) {
                res.write(`event: end\ndata: ${JSON.stringify({ rentId })}\n\n`);
                return res.end();
            }

            res.write(`event: update\ndata: ${JSON.stringify({remainingTime: rTime})}\n\n`);

            setTimeout(sendEvent, 3000);
        }

        await sendEvent();
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

module.exports = {
    addRent,
    getRents,
    getRentsByUser,
    deleteRent,
    getRentEvent,
}