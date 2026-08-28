import React, {useEffect, useState} from 'react'
import {learnGet, learnSend, lessonQuery} from '../lib/api'
import {useLearnPreview} from '../previewData'

type Comment = {id: string; body: string; createdAt: string; author: string; mine: boolean}

export function CommentThread({courseSlug, lessonSlug}: {courseSlug: string; lessonSlug: string}) {
  const preview = useLearnPreview()
  const [comments, setComments] = useState<Comment[] | null>(preview ? [] : null)
  const [enabled, setEnabled] = useState(preview)
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  const q = lessonQuery(courseSlug, lessonSlug)

  useEffect(() => {
    if (preview) return
    learnGet<{enabled: boolean; comments: Comment[]}>(`/api/learn/comments?${q}`)
      .then((data) => {
        setEnabled(data.enabled)
        setComments(data.comments)
      })
      .catch(() => setComments([]))
  }, [q, preview])

  if (!enabled) return null

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (preview) {
      setComments((prev) => [
        ...(prev || []),
        {
          id: String(Date.now()),
          body,
          createdAt: new Date().toISOString(),
          author: 'You',
          mine: true,
        },
      ])
      setBody('')
      return
    }
    try {
      const data = await learnSend<{comment: Comment}>(`/api/learn/comments?${q}`, {body})
      setComments((prev) => [...(prev || []), data.comment])
      setBody('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not post')
    }
  }

  return (
    <section className="mt-12 border-t border-dark/10 pt-10">
      <h2 className="font-serif text-2xl">Questions</h2>
      <ul className="mt-6 space-y-4">
        {(comments || []).map((c) => (
          <li key={c.id} className="border-l-2 border-gold pl-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">{c.author}</p>
            <p className="mt-1 text-sm leading-relaxed">{c.body}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="w-full border border-dark/15 bg-white px-4 py-3 text-sm outline-none focus:border-dark"
          placeholder="Ask about this lesson"
        />
        <button
          type="submit"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark underline-offset-4 hover:underline"
        >
          Post
        </button>
        {error ? <p className="text-sm text-red">{error}</p> : null}
      </form>
    </section>
  )
}
