"use client";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { fetchWeatherData } from "@/services/weatherService";
import { WeatherData } from "@/types/types";
import { AnimatePresence } from "framer-motion";
import { Cloud, CloudSun, CloudSunIcon, CoffeeIcon, Info, Loader, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { cityLocalityData } from "../data/cityLocalityData";
import MotionDiv from "./framer-motion/MotionDiv";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const SearchComponent = ({ setWeatherData, setShowWeather }: { setWeatherData: Dispatch<SetStateAction<WeatherData>>, setShowWeather: Dispatch<SetStateAction<boolean>> }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState<string>("");

    const InfoData = `For now, I have used data only from Mumbai, Pune, and Bangalore cities extracted from the PDF file (Live Weather - A Zomato Giveback - City, Locality List). I converted this data into a JSON format for the app with the help of AI. However if needed, I can include data from all cities in the app.`;

    const handleSelect = async (value: string): Promise<void> => {
        setSearchInput(value);

        const selectedLocality = cityLocalityData.find(
            (data) => `${data.cityName} : ${data.localityName}` === value
        );

        if (selectedLocality) {
            setLoading(true);

            setWeatherData(prevData => ({
                ...prevData,
                area_name: value
            }));

            try {
                const weatherData = await fetchWeatherData(selectedLocality.localityId);
                console.log(weatherData);
                if (weatherData.message === "") {
                    setWeatherData(prevData => ({
                        ...weatherData.locality_weather_data,
                        area_name: prevData.area_name
                    }));
                    setShowWeather(true);
                    if (window.innerWidth < 768) {
                        window.scrollBy({ top: 500, behavior: 'smooth' });
                    }
                } else {
                    console.log(weatherData);
                    setShowWeather(false);
                    toast.error("Data is not currently available for selected location. Please try again later.");
                }

            } catch (error) {
                toast.error("Oops! Something went wrong while fetching the weather data. Please try again later.");
                setShowWeather(false);
            } finally {
                setLoading(false);
            }
        }
    };

    const clearInput = () => {
        setSearchInput("");
        setShowWeather(false);
    }

    return (
        <MotionDiv className='pt-8 md:pt-16 md:min-h-screen font-sans'>
            <Command className="mx-auto w-11/12">
                <div className="flex flex-col">
                    <div className="flex flex-col items-start space-y-4 mb-5 ps-3">
                        <h1 className="font-bold text-3xl text-gray-700 md:text-4xl tracking-tight md:tracking-tighter">Weather Tracker</h1>
                        <div className="flex space-x-2">
                            <p className="text-slate-600 md:text-lg tracking-wider">Get real-time weather updates for any location.</p>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="md:block hidden">
                                        <span><Info className="opacity-50 hover:opacity-100 transition-opacity duration-75 cursor-pointer size-5" /></span>
                                    </TooltipTrigger>
                                    <TooltipContent >
                                        <div className="p-2 w-60">
                                            <p className="text-muted-foreground tracking-wide">{InfoData}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Dialog >
                            <DialogTrigger className="flex items-center md:hidden mt-3 px-2 py-1 border rounded-md"> <Info className="opacity-50 hover:opacity-100 transition-opacity duration-75 cursor-pointer me-2 size-4" />Info </DialogTrigger>
                            <DialogContent className="rounded-md w-11/12">
                                <DialogHeader>
                                    <DialogDescription>
                                        {InfoData}
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="relative">
                        <CommandInput
                            placeholder="Enter city or locality name..."
                            value={searchInput}
                            onValueChange={(search: string) => setSearchInput(search)}
                            onFocus={() => setIsFocused(true)}
                        />
                        {searchInput && <X onClick={clearInput} className="absolute inset-y-3 opacity-60 h-5 cursor-pointer end-4" />}
                    </div>

                    {!isFocused && <CloudSun className="opacity-60 mt-10 text-slate-600 animate-bounce ms-3 size-16" />}

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

export default SearchComponent;
