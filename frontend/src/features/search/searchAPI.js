// const fetchSearchSuggestions = async (searchQuery) => {
//   const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
//   const baseURL = 'https://www.googleapis.com/youtube/v3/search';

//   const url = `${baseURL}?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(searchQuery)}&key=${API_KEY}`;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`YouTube API error ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();

//     return data.items.map(item => ({
//       title: item.snippet.title,
//       channelTitle: item.snippet.channelTitle,
//     }));
//   } catch (error) {
//     console.error('Error fetching search suggestions:', error);
//     return [];
//   }
// };

// export default fetchSearchSuggestions;
