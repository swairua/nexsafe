import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const previousActiveElement = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    previousActiveElement.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
      }
      if (e.key === 'Tab') {
        trapFocus(e)
      }
    }

    const trapFocus = (e) => {
      const focusableElements = contentRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    contentRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousActiveElement.current?.focus()
    }
  }, [isOpen, closeOnEscape, onClose])

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className={`relative w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl transition-all duration-200 ${sizeClasses[size]} ${className}`}
        role="document"
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-shell-gray-200">
            <h2 id="modal-title" className="text-xl font-bold text-shell-gray-900">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-shell-gray-500 hover:text-shell-gray-900 hover:bg-shell-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
}

export function ModalTrigger({ children, modal }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {children(setIsOpen)}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...modal} />
    </>
  )
}

import { useState } from 'react'