const rents = require('../../services/rents.js');
const rentRequests = require('../../services/rentRequests.js');
const videos = require('../../services/videos.js');
const rentsRecords = require('../../services/rentsRecords.js');
const users = require('../../services/users.js');

async function addRent(req, res)
{
    try{
        const { videoId } = req.query;

        const result = await rents.addRent({username: req.username, videoId});
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

        if(style === 'byVideo')
        {
            const videList = await videos.getVideos();
            records = rentsRecords.getRecordsByVideo(videList, records);
        }
        else if(style === 'byCustomer')
        {
            const customerList = await users.getUsers();
            records = rentsRecords.getRecordsByCustomers(customerList, records);
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
        const result = await rents.getRents(req.username);
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

module.exports = {
    addRent,
    getRents,
    getRentsByUser,
    deleteRent,
}