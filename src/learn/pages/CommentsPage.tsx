import React, {useMemo, useState} from 'react'
import {Link} from 'react-router-dom'
import {DUMMY_COURSE, DUMMY_SEED_COMMENTS} from '../dummyCourse'
import {addLocalComment, readLocalComments, type LocalComment} from '../lib/profileStore'
import {useLearnSession} from '../lib/LearnSession'

export function CommentsPage() {
  const {profile, source} = useLearnSession()
  const [comments, setComments] = useState<LocalComment[]>(() => readLocalComments(DUMMY_SEED_COMMENTS))
  const [body, setBody] = useState('')

  const grouped = useMemo(() => {
    const map = new Map<string, LocalComment[]>()
    for (const c of comments) {
      const list = map.get(c.lessonSlug) || []
      list.push(c)
      map.set(c.lessonSlug, list)
    }
    return [...map.entries()]
  }, [comments])

  function post(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    const next: LocalComment = {
      id: String(Date.now()),
      lessonSlug: 'what-a-system-is',
      lessonTitle: 'What a system is',
      body: body.trim(),
      author: profile.displayName || 'You',
      createdAt: new Date().toISOString(),
      mine: true,
    }
    addLocalComment(next)
    setComments((prev) => [...prev, next])
    setBody('')
  }

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Discussion</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Comments</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-dark/70">
        Questions from lessons land here. This starter thread is on Start here, lesson one.
        {source === 'local' ? ' Saved on this browser until the live comments API is in play.' : ''}
      </p>

      {grouped.map(([slug, list]) => (
        <section key={slug} className="mt-10">
          <Link
            to={`/learn/${DUMMY_COURSE.slug}/${slug}`}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50 hover:text-dark"
          >
            {list[0]?.lessonTitle || slug}
          </Link>
          <ul className="mt-4 space-y-4">
            {list.map((c) => (
              <li key={c.id} className="border-l-2 border-gold pl-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">{c.author}</p>
                <p className="mt-1 text-sm leading-relaxed">{c.body}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <form onSubmit={post} className="mt-10 max-w-xl space-y-3">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50">Add a comment</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="mt-2 w-full border border-dark/15 bg-white px-4 py-3 text-sm outline-none focus:border-dark"
          />
        </label>
        <button
          type="submit"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark underline-offset-4 hover:underline"
        >
          Post
        </button>
      </form>
    </div>
  )
}
