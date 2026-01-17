import * as Sentry from '@sentry/react'

const BookmarkPage = () => {
  return (
    <button
      onClick={() => {
        Sentry.captureException(new Error('GlitchTip test error'), {
          tags: { source: 'bookmark-test' },
          level: 'error',
        })
      }}
    >
      Send test error
    </button>
  )
}

export default BookmarkPage
