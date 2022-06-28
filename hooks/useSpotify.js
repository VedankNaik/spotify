import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import spotifyApi from '../lib/spotify'

function useSpotify() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      if (session.error === 'RefreshAccessTokenError') {
        // if refresh token attempt failed, direct user to sign in
        signIn()
      }

      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])

  return spotifyApi
}

export default useSpotify
