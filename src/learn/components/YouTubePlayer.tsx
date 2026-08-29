import React from 'react'

function youtubeId(url: string): string | null {
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)
  return match && match[2] && match[2].length === 11 ? match[2] : null
}

export function YouTubePlayer({url}: {url: string}) {
  const id = youtubeId(url)
  if (!id) return null
  return (
    <div className="aspect-video w-full overflow-hidden bg-dark">
      <iframe
        title="Lesson video"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
