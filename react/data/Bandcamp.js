import axios from 'axios';

import { endpoints } from '../utils/ApiUtility';

const getArtistData = async (artistUrl) => {
  try {
    const { data } = await axios.get(endpoints.albums, { params: { artistUrl } });
    const albums = data.results.filter((item) => item.raw["item_type"] === "album");
    const tracks = data.results.filter((item) => item.raw["item_type"] === "track");
    const playables = tracks.map((track) => transformToPlayable(track));
    return { albums, tracks, playables };
  } catch (error) {
    alert(error);
  }
};

const transformToPlayable = (track) => {
  return {
    id: `${track.raw.artist}---${track.title}`,
    url: track.raw.trackinfo[0].file["mp3-128"],
    title: track.title,
    artist: track.raw.artist,
    artwork: track.imageUrl,
  };
};

export default { getArtistData };