import React from 'react'
import Button, { Highlight } from '../button'
import Container from '../container'
import { LogoLightIllustration } from '../illustrations/logo-light'
import { ZapIllustration } from '../illustrations/zap'
import KeyboardShortcuts from '../keyboard-shortcuts'

const UnlikeAnyTool = () => {
  return (
    <div>
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl md:text-7xl md:mb-7">
            Unlike any tool
            <br /> you’ve used before
          </h2>
          <p className="text-primary-text text-lg md:text-xl max-w-[68rem] mx-auto mb-4 md:mb-7">
            Designed to the last pixel and engineered with unforgiving
            precision, Linear combines UI elegance with world-class performance.
          </p>
        </div>
      </Container>

      <div className="h-[48rem] overflow-hidden md:h-auto md:overflow-auto">
        <div className="flex gap-6 px-8 pb-12 overflow-x-auto snap-x snap-mandatory md:flex-wrap md:overflow-x-hidden">
          <div className="relative overflow-hidden shrink-0 snap-center min-h-[48rem] w-full items-center flex flex-col justify-end text-center md:max-w-[calc(66.66%-12px)] md:basis-[calc(66.66%-12px)] p-8 border bg-glass-gradient md:p-14 border-transparent-white rounded-[4.8rem]">
            <KeyboardShortcuts />

            <p className="mb-4 text-3xl">Built for your keyboard</p>
            <p className="max-w-[42rem] mx-auto text-md text-primary-text">
              Fly through your tasks with rapid-fire keyboard shortcuts for
              everything. Literally everything.
            </p>
          </div>

          <div className="shrink-0 snap-center min-h-[48rem] w-full flex flex-col items-center justify-end relative text-center md:max-w-[calc(66.66%-12px)] md:basis-[calc(33.33%-12px)] p-8 border bg-glass-gradient md:p-14 border-transparent-white rounded-[4.8rem]">
            <div className="absolute top-[-6.2rem] mask-linear-faded flex items-center">
              <ZapIllustration />
            </div>
            <p className="mb-4 text-3xl">Breathtakingly fast</p>
            <p className="max-w-[42rem] mx-auto text-md text-primary-text">
              Built for speed with 50ms interactions and real-time sync.
            </p>
          </div>

          <div className="shrink-0 group relative w-full snap-center min-h-[48rem] items-center flex flex-col justify-end text-center md:max-w-[calc(66.66%-12px)] md:basis-[calc(33.33%-12px)] p-8 border bg-glass-gradient md:p-14 border-transparent-white rounded-[4.8rem]">
            <div className="pointer-events-none absolute top-[-8rem] w-[130%]">
              <LogoLightIllustration />
            </div>

            <Button
              href="/"
              variant="secondary"
              size="small"
              className="transition-[transform,opacity] group-hover:opacity-100 group-hover:transform-none absolute bottom-[20rem] translate-y-[30%] scale-[0.8] opacity-0"
            >
              <Highlight>Linear Method</Highlight>Product Principles
              <svg
                className="ml-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#8A8F98"
              >
                <path d="M5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10.5303 8.53033C10.8207 8.23999 10.8236 7.77014 10.5368 7.47624L6.63419 3.47624C6.34492 3.17976 5.87009 3.17391 5.57361 3.46318C5.27713 3.75244 5.27128 4.22728 5.56054 4.52376L8.94583 7.99351L5.46967 11.4697Z"></path>
              </svg>
            </Button>

            <p className="mb-4 text-3xl">Design for modern software teams</p>
            <p className="max-w-[42rem] mx-auto text-md text-primary-text">
              Comes with built-in workflows that create focus and routine.
            </p>
          </div>

          <div className="shrink-0 snap-center min-h-[48rem] w-full items-center flex flex-col justify-end text-center md:max-w-[calc(66.66%-12px)] md:basis-[calc(66.66%-12px)] p-8 border bg-glass-gradient md:p-14 border-transparent-white rounded-[4.8rem]">
            <p className="mb-4 text-3xl">Meet your command line</p>
            <p className="max-w-[42rem] mx-auto text-md text-primary-text">
              Complete any action in seconds with the global command menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnlikeAnyTool
