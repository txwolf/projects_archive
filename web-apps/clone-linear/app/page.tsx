import React from 'react'
import Container from '../components/container'
import Clients from '../components/sections/clients'
import { StarsIllustration } from '../components/icons/stars'
import classNames from 'classnames'
import UnlikeAnyTool from '../components/sections/unlike-any-tool'
import HomepageHero from '../components/sections/homepage-hero'
import EnjoyIssueTracking from '../components/sections/enjoy-issue-tracking'

const Homepage = () => {
  return (
    <>
      <div className="overflow-hidden pb-[16.4rem] md:pb-[25.6rem]">
        <Container className="pt-[6.4rem]">
          <HomepageHero />
        </Container>
      </div>
      <Container>
        <Clients />
      </Container>
      <div
        className={classNames(
          'z-[-1] pointer-events-none mask-radial-faded h-[60rem] my-[-12rem] overflow-hidden relative',
          'before:absolute before:opacity-[0.4] before:bg-radial-faded [--color:#7877C6] before:inset-0',
          'after:absolute after:bg-background after:rounded-[50%] after:border-t after:border-[rgba(120,_119,_198,_0.4)] after:top-1/2 after:-left-1/2 after:w-[200%] after:h-[142.8%]',
        )}
      >
        <StarsIllustration />
      </div>
      <UnlikeAnyTool />
      <EnjoyIssueTracking />
    </>
  )
}

export default Homepage
