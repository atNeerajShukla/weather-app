"use client"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { WeatherData } from "@/interfaces";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { cityLocalityData } from "../../public/cityLocalityData";
import { ClockArrowDownIcon, Info, Loader, X } from "lucide-react";
import MotionDiv from "./framer-motion/MotionDiv";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


const SearchComponent = ({ setWeatherData, setShowWeather }: { setWeatherData: Dispatch<SetStateAction<WeatherData>>, setShowWeather: Dispatch<SetStateAction<boolean>> }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState<string>("");

    const fetchWeatherData = async (localityId: string): Promise<void> => {
        setLoading(true);
        const options = {
            method: 'GET',
            url: 'https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data',
            params: { locality_id: localityId },
            headers: { 'X-Zomato-Api-Key': '5d479c00ceaaf092f74d1dac5ad1281b' }
        };

        try {
            const { data } = await axios.request(options);
            console.log('Weather Data:', data);
            if (data.message === "") {
                setWeatherData(prevData => ({
                    ...data.locality_weather_data,
                    area_name: prevData.area_name
                }));
                setShowWeather(true);
            } else {
                toast.error("Oops! Data is not available for the selected location. Please check another location or try again later.")
                setShowWeather(false);
            }
            setLoading(false);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            toast.error("Oops! Something went wrong while fetching the weather data. Please try again later.")
            setLoading(false);
        }
    };


    const handleSelect = (value: string): void => {
        setSearchInput(value);
        console.log(value);

        const selectedLocality = cityLocalityData.find(
            (data) => `${data.cityName} : ${data.localityName}` === value
        );

        if (selectedLocality) {
            setWeatherData(prevData => ({
                ...prevData,
                area_name: value
            }));

            console.log('Selected Locality ID:', selectedLocality.localityId);
            fetchWeatherData(selectedLocality.localityId);
        }
    };


    const clearInput = () => {
        setSearchInput("");
        setShowWeather(false);
    }


    return (
        <MotionDiv className='pt-8 md:pt-16 font-sans'>
            <Command className="mx-auto rounded-lg w-11/12 h-max">
                <div className="flex flex-col space-y-5">
                    <div className="ps-3">
                        <h1 className="mb-2 font-bold text-4xl text-gray-700 tracking-tighter">Weather Tracker</h1>
                        <div className="flex md:flex-row flex-col md:items-center md:space-x-2 space-y-2">
                            <p className="text-lg text-slate-600 tracking-wider">Get real-time weather updates for any location.</p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <span><Info className="opacity-50 hover:opacity-100 transition-opacity duration-75 cursor-pointer size-5" /></span>
                                    </TooltipTrigger>
                                    <TooltipContent >
                                        <div className="w-52">
                                            <p>For now, Only data from Mumbai, Pune, and Bangalore cities has been used in App. The information for all cities was initially available in a PDF file (Live Weather - A Zomato Giveback - City, Locality List). To use this data in the app, I decided to extract and convert it into a JSON format (Thanks to AI). However, if needed I can include data from all cities in the app.</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="relative">
                        <CommandInput
                            placeholder="Enter city or locality name..."
                            value={searchInput}
                            onValueChange={(search: string) => setSearchInput(search)}
                            onFocus={() => setIsFocused(true)}
                        // onBlur={() => setIsFocused(false)}
                        />
                        {searchInput && <X onClick={clearInput} className="absolute inset-y-3 opacity-60 h-5 cursor-pointer end-4" />}
                    </div>
                </div>

                {isFocused && (
                    <AnimatePresence>
                        <MotionDiv>
                            <CommandList className="mx-2 mt-1 border rounded-md max-h-72" >
                                <CommandEmpty>No results found.</CommandEmpty>
                                {cityLocalityData.map((item) => {
                                    const label = `${item.cityName} : ${item.localityName}`;
                                    return (
                                        <CommandItem
                                            key={item.localityId}
                                            className="cursor-pointer"
                                            value={label}
                                            onSelect={handleSelect}
                                        >{label}
                                        </CommandItem>
                                    );
                                })}
                            </CommandList>
                        </MotionDiv>
                    </AnimatePresence>
                )}

                {loading && <div className="flex m-4"><span> <Loader className="animate-spin me-2" /></span> Loading...</div>}

            </Command>

        </MotionDiv>
    )
}

export default SearchComponent