import { WeatherData } from '@/types/types';
import { AnimatePresence } from 'framer-motion';
import { CloudRain, CloudSunIcon, Compass, Droplet, Thermometer, Wind } from 'lucide-react'; // Importing Lucide icons
import { ReactNode } from 'react';
import MotionDiv from './framer-motion/MotionDiv';

const WeatherDetail = ({ icon, label, value }: { icon: ReactNode, label: string, value: ReactNode }) => (
    <div className="flex space-x-3 py-3">
        {icon}
        <div className="flex flex-col space-y-2">
            <span>{label}</span>
            <p className="font-medium text-slate-800">{value}</p>
        </div>
    </div>
);

const WeatherComponent = ({ weatherData, showWeather }: { weatherData: WeatherData, showWeather: boolean }) => {

    return (
        <div className='flex items-center my-10 md:my-0 font-sans'>
            {showWeather ?
                <MotionDiv className="shadow-lg mx-auto border rounded-2xl w-11/12 md:w-5/12 h-max">
                    <div className='bg-gray-600 px-6 py-3 rounded-t-2xl text-white'>
                        <p className="mb-2 font-semibold text-lg tracking-wide">Live weather</p>
                        <p className="text-base">
                            {weatherData.area_name || "Area Name"}
                        </p>

                    </div>

                    <div className="px-6 py-2 divide-y">
                        <WeatherDetail
                            icon={<Thermometer className="text-blue-500 size-8" />}
                            label="Temperature"
                            value={`${weatherData.temperature ?? "--"}°C`}
                        />

                        <WeatherDetail
                            icon={<CloudRain className="text-blue-500 size-8" />}
                            label="Rain Intensity"
                            value={`${weatherData.rain_intensity ?? "--"} mm/min`}
                        />

                        <WeatherDetail
                            icon={<Droplet className="text-blue-500 size-8" />}
                            label="Total Rainfall"
                            value={`${weatherData.rain_accumulation ?? "--"} mm`}
                        />

                        <WeatherDetail
                            icon={<Droplet className="text-blue-500 size-8" />}
                            label="Humidity"
                            value={`${weatherData.humidity ?? "--"}%`}
                        />

                        <WeatherDetail
                            icon={<Wind className="text-blue-500 size-8" />}
                            label="Wind Speed & Direction"
                            value={
                                <div className='flex items-center'>
                                    {weatherData.wind_speed ?? "--"} km/h
                                    <Compass className="inline-block w-4 h-4 text-blue-500 me-1 ms-3" />
                                    {weatherData.wind_direction ?? "--"}
                                </div>
                            }
                        />
                    </div>
                </MotionDiv>
                :
                <AnimatePresence>
                    <MotionDiv className="flex flex-col items-center gap-4 shadow-xl mx-auto p-6 rounded-3xl w-11/12 max-w-md text-base text-center text-gray-800 tracking-wide primary-gradient">
                        <CloudSunIcon className="mb-1 text-blue-500 animate-pulse size-14" />
                        <p className="text-slate-800 md:text-lg tracking-wide">
                            Discover real-time weather updates in your area. Just type in your location and stay informed!
                        </p>
                    </MotionDiv>
                </AnimatePresence>
            }
        </div>

    );
};

export default WeatherComponent;
