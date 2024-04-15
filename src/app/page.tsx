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
    canvasRef,
    playPause,
    configCurrentTime,
    configVideo,
    configFilter
  } = useContext(HomeContext);
  return (
    <main className="mx-auto w-[80%] mt-2 flex">
      <div className="w-[65%] mr-1">
        <video className="w-full" ref={videoRef} src={videoURL} hidden></video>
        <canvas className="w-full h-[380px]" ref={canvasRef}></canvas>

        <div className="bg-black">
          <input className="appearance-none
                            [&::-webkit-slider-runnable-track]:appearance-none
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-runnable-track]:bg-[tomato]
                            [&::-webkit-slider-runnable-track]:h-[10px]
                            [&::-webkit-slider-thumb]:h-[10px]
                            [&::-webkit-slider-thumb]:w-[10px]
                            [&::-webkit-slider-thumb]:bg-[green]"
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={(e) => configCurrentTime(Number(e.target.value))}
          >
          </input>
          <button className="text-white" onClick={playPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <select onChange={(e) => configFilter(Number(e.target.value))}>
            <option selected value={0}>Verde</option>
            <option value={1}>Azul</option>
            <option value={2}>Vermelho</option>
            <option value={3}>Preto e branco</option>
          </select>
          <span className="text-white">
          {convertTimeToString(currentTime)}:{convertTimeToString(totalTime)}
          </span>
        </div>
      </div>
      <div className="w-[35%] h-[100vh]">
        {
          videos.map((video:Video, index) => {
            return (
              <button className="w-full" onClick={(e) => configVideo(index)}>
                <img key={index} className="w-full h-[200px] mb-1" src={video.imageURL}></img>
              </button>
            )
          })
        }
      </div>
    </main>
  );
}
