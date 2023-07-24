import Image from 'next/image'
import chrome from '../public/chrome.svg'
import safari from '../public/safari.svg'
import firefox from '../public/firefox.svg'

const Intro = () => {
  return (
    <div className="intro">
      <div className="intro__quote">
        “The modern struggle. Lone individuals summoning inhuman willpower,
        fasting, meditating, and exercising, up against armies of scientists &
        statisticians weaponizing abundant food, screens, & medicine into junk
        food, clickbait news, infinite porn, endless games & addictive drugs.”
      </div>
      <div className="intro__instruction">
        Use internet more responsibly by sharing your browser history with
        others.
      </div>
      <div className="intro__browsers">
        <Image width={45} height={45} src={chrome} alt="chrome" />
        <Image width={45} height={45} src={firefox} alt="firefox" />
        <Image width={45} height={45} src={safari} alt="safari" />
      </div>
    </div>
  )
}

export default Intro
