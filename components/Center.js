import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'

const colors = [
  'from-red-500',
  'from-blue-500',
  'from-green-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
  'from-indigo-500',
]

function Center() {
  const { data: session } = useSession()
  const [color, setColor] = useState(null)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-80 hover:opacity-90">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt="profile"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`padding-8 flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black text-white`}
      ></section>
    </div>
  )
}

export default Center
