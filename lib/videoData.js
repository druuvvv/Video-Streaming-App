import videos from '../data/videos.json'
const YOUTUBE_APIKEY = "AIzaSyBRXZrZVLDtzMIAu_oxBpRwlBFySgKaag0"

const getVideos = async (searchQuery) => {
    try{
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_APIKEY}`)
        const data = await response.json()
    if(data?.error){
        console.error("Youtube API error" , error)
        return [];
    }
    
    return data?.items.map((video,idx) => {
        const videoId = video.id.videoId || idx;
        console.log(videoId , video.snippet.thumbnails.high);
        return ({
            videoId, 
            index : idx,
            title: video.snippet.title,
            description : video.snippet.description,
            publishedAt : video.snippet.publishedAt,
            thumbnail : video.snippet.thumbnails.high,
            channel : video.snippet.channelTitle,
        })
    })}
    catch(error){
        console.error("Something went wrong :(", error);
        return [];
    }
}

const getVideoById = async (id) => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${YOUTUBE_APIKEY}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.items[0].snippet);
    if(data?.error){
        console.error("Youtube API error" , error)
        return {};
    }

    return data.items[0];
}

export {getVideos , getVideoById}