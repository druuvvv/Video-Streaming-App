import videos from '../data/videos.json'
const YOUTUBE_APIKEY = process.env.YOUTUBE_APIKEY

const getVideos = async (searchQuery) => {
    try{
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${YOUTUBE_APIKEY}`)
    const data = await response.json()
    
    if(data?.error){
        console.error("Youtube API error" , error)
        return [];
    }
    
    return data?.items.map(video => {
        return ({
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

export {getVideos}