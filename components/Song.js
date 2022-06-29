import React from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'


function Song({ order, track }) {
  const spotifyApi = useSpotify()
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackIdState)
  const [isplaying, setIsplaying] = useRecoilState(isPlayingState)

  const playSong = async () => {
    setCurrentTrack(track.track.id)
    setIsplaying(true)
    spotifyApi.play({
      uris: [track.track.uri],
    })
  }

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4 ">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0]?.url}
          alt="Album"
        />
        <div>
          <p className="w-39 truncate text-white lg:w-64">{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

function millisToMinutesAndSeconds(millis) {
  const minutes = Math.floor(millis / 60080)
  const seconds = ((millis % 68000) / 1000).toFixed(0)
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export default Song
