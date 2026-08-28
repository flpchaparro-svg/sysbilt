import React, {useEffect, useRef, useState} from 'react'
import {Send} from 'lucide-react'

type ChatMessage = {role: 'user' | 'model'; text: string}

type Props = {
  courseTitle: string
  lessonTitle: string
  lessonPlain: string
}

export function SybilInstructor({courseTitle, lessonTitle, lessonPlain}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `I'm Sybil. Ask me about this lesson and I will stay on the material.`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages, loading])

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    const next = [...messages, {role: 'user' as const, text: input.trim()}]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          messages: next,
          learn: {courseTitle, lessonTitle, lessonPlain: lessonPlain.slice(0, 4000)},
        }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, {role: 'model', text: data.reply || 'I could not answer that just now.'}])
    } catch {
      setMessages((prev) => [
        ...prev,
        {role: 'model', text: 'I could not reach the instructor chat just now. Try again in a moment.'},
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <aside className="flex h-[28rem] flex-col border border-dark/10 bg-white lg:sticky lg:top-8 lg:h-[calc(100vh-8rem)]">
      <div className="border-b border-dark/10 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Instructor</p>
        <p className="mt-1 font-serif text-lg">Sybil</p>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm leading-relaxed">
        {messages.map((m, i) => (
          <p key={i} className={m.role === 'user' ? 'text-dark' : 'text-dark/75'}>
            {m.text}
          </p>
        ))}
        {loading ? <p className="text-dark/40">Thinking</p> : null}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="flex border-t border-dark/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none"
          placeholder="Ask about this lesson"
        />
        <button type="submit" className="px-4 text-dark" aria-label="Send">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </aside>
  )
}
