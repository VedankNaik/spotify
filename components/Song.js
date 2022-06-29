import React from 'react'
import useSpotify from '../hooks/useSpotify'

function Song({ order, track }) {
  const spotifyApi = useSpotify()
  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4 ">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0]?.url}
          alt="Album"
        />
        <div>
          <p className="w-39 lg:w-64 text-white truncate">{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
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
