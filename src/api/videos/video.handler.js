import * as videos from "./videos.js";


export async function addVideo(req, res)
{
    try{
        const videoId = await videos.addVideo(req.query);
        res.status(200).send(videoId);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export async function getVideo(req, res)
{
    try{
        const {videoId} = req.query;
        if(videoId)
        {
            const video = await videos.getVideo(videoId);
            res.status(200).send(video);
        }
        else{
            const videoList = await videos.getVideos();
            res.status(200).send(videoList);
        }
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export async function updateVideo(req, res)
{
    try{
        const {videoId, title, description, category, price, rentingDuration} = req.query;
        
        if(!videoId)
        {
            throw new Error('Please add videoId parameter');
        }

        const payload = {};

        if(title) payload.title = title;
        if(description) payload.description = description;
        if(category) payload.category = category;
        if(price) payload.price = price;
        if(rentingDuration) payload.rentingDuration = rentingDuration;

        await videos.updateVideo(videoId, payload);
        res.status(200).send(videoId);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}

export async function deleteVideo(req, res)
{
    try{
        const {videoId} = req.params;
        await videos.deleteVideo(videoId);
        res.status(200).send(videoId);
    }
    catch(e)
    {
        res.status(500).send(e.message);
    }
}


export default {addVideo, getVideo, updateVideo, deleteVideo};