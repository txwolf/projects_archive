import classNames from 'classnames'
import Container from './container'

type FeaturesProps = {
  text: string
  children: React.ReactNode
  color: string
}

export const Features = ({ text, children, color }: FeaturesProps) => {
  return (
    <section
      className="after:bg-[radial-gradient(ellipse_100%_40%_at_50%_60%,rgba(var(--feature-color),0.1),transparent) relative flex flex-col items-center overflow-x-clip before:pointer-events-none before:absolute before:h-[40rem] before:w-full"
      style={
        {
          '--feature-color': color,
        } as React.CSSProperties
      }
    >
      <div className="mt-[12.8rem] mb-16 w-full md:mt-[25.2rem] md:mb-[12.8rem]">
        {children}
      </div>
    </section>
  )
}

const FeaturesTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-6xl text-center mb-11 text-gradient md:text-8xl">
    {children}
  </h2>
)

type MainFeaturesProps = {
  image: string
  text: string
}

const MainFeature = ({ image, text }: MainFeaturesProps) => {
  return (
    <div className="w-[78rem] max-w-[90%]">
      <div className="relative z-10 rounded-[14px] backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(rgba(255,_255,_255,_0.3),_rgba(255,_255,_255,_0)_120%)] before:p-[1px] before:[mask:linear-gradient(black,_black)_content-box_content-box,_linear-gradient(black,_black)] before:[mask-composite:xor] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-[rgba(255,_255,_255,_0.15)] after:[mask:linear-gradient(black,transparent)]">
        <img className="w-full h-auto" src={image} alt="" />
      </div>
      <p className="leading-tight w-[80%] my-16 text-4xl mx-auto text-center text-white">
        {text}
      </p>
      <hr className="mb-[7.2rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)]" />
    </div>
  )
}

type FeatureGridProps = {
  features: {
    icon: React.FC
    title: string
    text: string
  }[]
}

const FeatureGrid = ({ features }: FeatureGridProps) => {
  return (
    <div className="grid w-full grid-cols-3 text-md text-primary-text gap-y-9 mb-[14rem]">
      {features.map(({ title, text, icon: Icon }) => (
        <div
          key={title}
          className="w-[25.6rem] [&_svg]:inline [&_svg]:fill-white [&_svg]:mr-[6px] [&_svg]:mb-[2px]"
        >
          <Icon />
          <span className="text-white">{title}</span> {text}
        </div>
      ))}
    </div>
  )
}

type FeatureCardsProps = {
  features: {
    image: string
    title: string
    text: string
    imageClassName: string
  }[]
}

const FeatureCards = ({ features }: FeatureCardsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {features.map(({ title, text, image, imageClassName }) => (
        <div
          key={title}
          className="relative aspect-[1.1/1] overflow-hidden rounded-[2.4rem] border border-transparent-white bg-[radial-gradient(ellipse_at_center,rgba(var(--feature-color),0.15),transparent)] py-6 px-8 before:pointer-events-none before:absolute before:inset-0 before:bg-glass-gradient md:rounded-[4.8rem] md:p-14"
        >
          <h3 className="mb-2 text-2xl text-white">{title}</h3>
          <p className="max-w-[31rem] text-md text-primary-text">{text}</p>
          <img
            className={classNames('absolute max-w-none', imageClassName)}
            src={image}
          />
        </div>
      ))}
    </div>
  )
}

Features.Main = MainFeature
Features.Title = FeaturesTitle
Features.Grid = FeatureGrid
Features.Cards = FeatureCards
