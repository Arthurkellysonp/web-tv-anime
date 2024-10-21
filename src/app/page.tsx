'use client'

import { useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay } from "react-icons/fa";
import videos, { Video } from './data/video';
import { convertTimeToString } from "./utils/Utils";

export default function Home() {
    const {
        videoURL,
        playing,
        totalTime,
        currentTime,
        videoRef,
        playPause,
        configCurrentTime,
        configVideo,
        setVolume,
        volume
    } = useContext(HomeContext);

    // Ajuste o volume do vídeo quando o volume mudar
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume; // Atualiza o volume do vídeo
        }
    };

    return (
        <main className="mx-auto w-[80%] mt-2 flex">
            {/* Player de Vídeo */}
            <div className="w-[65%] mr-1">
                <video className="w-full rounded-lg shadow-lg" ref={videoRef} src={videoURL}></video>

                <div className="bg-black p-4 mt-2 rounded-lg flex items-center space-x-4">
                    {/* Barra de Progresso */}
                    <input 
                        className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        type="range"
                        min={0}
                        max={totalTime}
                        value={currentTime}
                        onChange={(e) => configCurrentTime(Number(e.target.value))}
                    />
                    
                    {/* Play/Pause */}
                    <button className="text-white p-2 hover:bg-gray-700 rounded-full" onClick={playPause}>
                        {playing ? <FaPause /> : <FaPlay />}
                    </button>

                    {/* Controles de Volume */}
                    <input 
                        type="range" 
                        min={0} 
                        max={1} 
                        step={0.1} 
                        value={volume} 
                        onChange={handleVolumeChange} // Atualiza o volume ao mudar
                        className="bg-gray-800 rounded-lg cursor-pointer"
                    />

                    {/* Tempo Atual / Total */}
                    <span className="text-white">
                        {convertTimeToString(currentTime)} / {convertTimeToString(totalTime)}
                    </span>
                </div>
            </div>

            {/* Lista de Vídeos */}
            <div className="w-[35%] h-[100vh] overflow-y-scroll">
                {videos.map((video: Video, index) => (
                    <button 
                        key={index} 
                        className="w-full p-2 hover:bg-gray-200 transition"
                        onClick={() => configVideo(index)}
                    >
                        <img className="w-full h-[200px] object-contain rounded-lg shadow-md" src={video.imageURL} alt={`Thumbnail ${video.description}`} />
                        <p className="text-center text-gray-700 mt-1">{video.description}</p>
                    </button>
                ))}
            </div>
        </main>
    );
}
