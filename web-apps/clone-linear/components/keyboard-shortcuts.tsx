'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button, { Highlight } from './button'
import { KeyboardIllustration } from './illustrations/keyboard'

const shortcuts = [
  { text: 'Opens command line', keys: '⌘k' },
  { text: 'Assign issue to me', keys: 'i' },
  { text: 'Assign issue to', keys: 'a' },
  { text: 'Change issue status', keys: 's' },
  { text: 'Set issue priority', keys: 'p' },
  { text: 'Add issue labels', keys: 'l' },
  { text: 'Set due date', keys: '⇧d' },
  { text: 'Set parent issue', keys: '⇧⌘p' },
  { text: 'Add sub-issue', keys: '⇧⌘o' },
  { text: 'Create new issue', keys: 'c' },
  { text: 'Create new issue from template', keys: '⌥c' },
  { text: 'Move to project', keys: '⇧p' },
]

const KeyboardShortcuts = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const illustrationWrapperRef = useRef<HTMLDivElement>(null)
  const activeShortIndex = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const scheduleTimeout = () => {
    timeoutRef.current = setTimeout(() => {
      goToNextShortcut()
    }, 2500)
  }

  useEffect(() => {
    scheduleTimeout()
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const goToShortcut = (index: number) => {
    clearTimeout(timeoutRef.current)

    if (!wrapperRef.current) return

    const shortcut = wrapperRef.current.querySelector<HTMLButtonElement>(
      `button:nth-child(${index + 1})`,
    )
    if (!shortcut) return

    wrapperRef.current.scrollTo({
      left: shortcut.offsetLeft - wrapperRef.current.clientWidth / 2,
      behavior: 'smooth',
    })

    if (!illustrationWrapperRef.current) return
    illustrationWrapperRef.current
      .querySelectorAll('.active')
      .forEach((el) => el.classList.remove('active'))

    const keys = shortcut.dataset.keys || ''
    const keyArray = keys.split('')
    const keyElements = keyArray.map((key) =>
      illustrationWrapperRef.current?.querySelector(`[data-key="${key}"]`),
    )
    keyElements.forEach((element) => element?.classList.add('active'))

    activeShortIndex.current = index
    scheduleTimeout()
  }

  const goToNextShortcut = () => {
    goToShortcut((activeShortIndex.current + 1) % shortcuts.length)
  }

  const onShortcutButtonClick = (
    ev: React.MouseEvent<HTMLButtonElement>,
    keys: string,
  ) => {
    ev.preventDefault()
    goToShortcut(Number(ev.currentTarget.dataset.index))
  }

  return (
    <>
      <div
        ref={illustrationWrapperRef}
        className="md:h-full md:w-full md:left-auto mask-keyboard w-[200%] translate-x-[30%] translate-y-[-20%] md:translate-x-0 md:translate-y-0"
      >
        <KeyboardIllustration />
      </div>
      <div className="my-7 overflow-hidden min-h-[4rem] w-full hidden md:block">
        <div
          ref={wrapperRef}
          className="snap-x snap-mandatory pb-8 flex max-w-full gap-2 overflow-auto min-h-[5rem] mask-shortcutkeys"
        >
          {shortcuts.map(({ text, keys }, index) => (
            <Button
              variant="secondary"
              onClick={onShortcutButtonClick}
              data-index={index}
              data-keys={keys}
              className="shrink-0 snap-center last:mr-[50vw] first:ml-[50vw]"
              key={keys}
            >
              <Highlight className="uppercase">{keys}</Highlight>
              <span>{text}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}

export default KeyboardShortcuts
