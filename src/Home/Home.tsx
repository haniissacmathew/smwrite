// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Smwrite from '../assets/smwrite.svg'
import './Home.css'

function Home() {
  return (
    <div className='home'>
      <div>
        <a href="#" target="_blank">
          <img src={Smwrite} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Welcome to Smwrite!</h1>
    </div>
  )
}

export default Home
