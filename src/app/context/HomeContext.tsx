'use client'

import { ReactNode, RefObject, createContext, useEffect, useRef, useState } from "react";
import videos, { Video } from "../data/video";

type HomeContextData = {
    videoURL: string;
    playing: boolean;
    totalTime: number;
    currentTime: number;
    volume: number;
    videoRef: RefObject<HTMLVideoElement>;
    playPause: () => void;
    configCurrentTime: (time:number) => void;
    configVideo: (index: number) => void;
    setVolume: (volume: number) => void;  // Nova função para definir volume
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;    
}

const HomeContextProvider = ({children}: ProviderProps) => {
    const [videoURL, setVideoURL] = useState("");
    const [videoIndex, setVideoIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1); // Volume inicial
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        configVideo(videoIndex);
    }, []);

    const configVideo = (index: number) => {
        const currentIndex = index % videos.length;
        const currentVideo: Video = videos[currentIndex];
        const currentVideoURL = currentVideo.videoURL;
        setVideoURL(currentVideoURL);
        setVideoIndex(currentIndex);
    }

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.onloadedmetadata = () => {
                setTotalTime(video.duration);
                setCurrentTime(video.currentTime);

                if (playing) {
                    video.play();
                }
            }

            video.ontimeupdate = () => {
                const video = videoRef.current;
                if (!video) return;
                setCurrentTime(video.currentTime);
            }

            video.onended = () => {
                configVideo(videoIndex + 1);
            }
        }
    }, [videoURL]);

    const configCurrentTime = (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = time;
        setCurrentTime(time);
    }

    const playPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (playing) {
            video.pause();     
        } else {
            video.play();
        }
        setPlaying(!playing);
    }

    const setVolumeLevel = (level: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.volume = level;  // Ajusta o volume do vídeo
        setVolume(level);  // Atualiza o estado de volume
    }

    return (
        <HomeContext.Provider value={{
            videoURL,
            playing,
            totalTime,
            currentTime,
            volume,
            videoRef,
            playPause,
            configCurrentTime,
            configVideo,
            setVolume: setVolumeLevel,  // Fornece a nova função
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
