import { Game } from "./Game.jsx"
import { useState } from "react"

// importacion de musica y dependencias de musica 
import useSound from "use-sound"
import KahootSound from "../public/KahootSound.mp3"
import Sound from "../public/sound-off.svg"
import MutedSong from "../public/sound.svg"


export function App() { 

  const [play, { stop }] = useSound(KahootSound, {
    volume: 0.2,
    interrupt: true
  })

  const [isPlaying, setIsPlaying] = useState(false)


  const playFunction = () => {
    const newPlayingState = isPlaying

    newPlayingState ? stop() : play()
  
    setIsPlaying(!newPlayingState)
  }

  const PlayingButton = () => {

    return (
      <button
          onClick={playFunction}
          className="play-music-button"
      >
      
        <img src={isPlaying ? Sound : MutedSong} height={30}/>
          
      </button>
    )
  }



  return (
    <>
      <Game />
      <PlayingButton />  
    </>
  )
}


export default App