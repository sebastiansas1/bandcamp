// const baseUrl = 'https://bandcamp-api.herokuapp.com/api';
const baseUrl = 'http://192.168.1.224:4000/api';


export const endpoints = {
  search: `${baseUrl}/search`,
  albums: `${baseUrl}/albums`,
  tracks: `${baseUrl}/tracks`,
  collated: `${baseUrl}/collate`,
};
