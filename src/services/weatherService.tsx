import axios from 'axios';

export const fetchWeatherData = async (localityId: string) => {
    const options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_WEATHER_API_URL,
        params: { locality_id: localityId },
        headers: { 'X-Zomato-Api-Key': process.env.NEXT_PUBLIC_ZOMATO_API_KEY }
    };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
};
