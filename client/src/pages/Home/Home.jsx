import React from 'react'
import BgContainer from '../../shared-theme/BgContainer'
import { ColorModeSelect } from '../../components'

function Home() {
  return (
    <BgContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <div>Home</div>
    </BgContainer>
  )
}

export default Home