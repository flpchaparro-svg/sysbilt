import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'The training agent: a teacher that never sleeps',
    subtitle: 'A number you can ring, learning by asking, and why the agent is only as good as the knowledge behind it.',
  }),
  flow(
    ...p(
      'This is the flagship chapter, the format that changes what training can be, and it is a direct application of what this series builds. Imagine your team could ask a question about how the business works, out loud, at any hour, and get an accurate answer instantly, without interrupting a busy expert, without waiting, without embarrassment. That is a training agent, and it is now genuinely achievable, because it is the same capability our AI book describes, pointed at the knowledge base this book builds. This chapter is what it is, why it works where documents do not, and the one truth that decides whether it is brilliant or useless.',
    ),
    ...section(
      'ON CALL',
      'A number you can ring, a teacher who never tires',
      ...p('The training agent, at its most powerful, is something a person on your team can contact, a number they can ring, a chat they can message, and ask a question about how to do the work, and get an accurate, patient answer drawn from your business\'s own knowledge. It is built by taking the knowledge base from chapter two and putting an AI voice or chat interface on top of it, so that instead of reading through procedures, a person can simply ask, and instead of interrupting the senior operator, they get the answer from the agent. It is available at any hour, it never gets impatient, it never makes the person feel stupid for asking, and it answers the same question the hundredth time exactly as willingly as the first.'),
      ...p('The practical shapes are real and available now. A voice agent with a phone number, loaded with the business\'s knowledge, that a team member can call and ask questions, and that answers in a natural conversation. A chat version they can message. Either way, the effect is the same, the knowledge of the business, on call, around the clock, answering whoever asks, which is a form of training that simply did not exist before and that removes the expert-as-bottleneck problem almost entirely.'),
      {
        type: 'diagram',
        id: 'bte-ch07-teacher-on-call',
        caption: 'A teacher on call. A team member with a question rings or messages the training agent, which answers instantly from the knowledge base, never impatient, never making them feel stupid. Beside it, faded: the old way, interrupting a busy expert or waiting. The knowledge of the business, on call, around the clock.',
      },
    ),
    ...section(
      'LEARNING BY ASKING',
      'Learning by asking',
      ...p('There is a subtle but powerful point here about how the agent trains, and it reframes what training even is. When a person burns time asking the agent questions, working through a task by asking how do I do this, and then what, and what about this situation, they are not just getting answers, they are being trained, in the most effective way there is, one specific question at the moment of need, answered immediately. This is chapter three\'s anatomy in its purest form: the shortest possible lesson, delivered at the exact moment of the question, one skill at a time, with the person actively doing rather than passively receiving. Spending time in conversation with the training agent is itself the training, and it is better training than most formal courses, because it is entirely driven by what the person actually needs to know right now.'),
      {
        type: 'diagram',
        id: 'bte-ch07-learning-by-asking',
        caption: 'Learning by asking. A person working through a task by asking the agent a chain of questions, each answered at the moment of need. The shortest possible lesson, one skill at a time, actively doing. Spending time asking the agent is itself the training, and better than most courses.',
      },
    ),
  ),
  flow(
    ...section(
      'WHERE DOCS FAIL',
      'Why it works where documents do not',
      ...p('The training agent succeeds precisely where written documentation fails, and it is worth seeing why. People do not read the manual, everyone knows this, because finding the right procedure and reading through it is friction, and asking a question is easy, so people ask the person instead of reading the document, which puts the load back on the expert. The agent removes that friction entirely: asking it is as easy as asking a colleague, so people actually use it, which means the knowledge actually gets to them. And there is no embarrassment, which matters more than businesses admit, because people will ask an agent the basic question they would be too proud to ask a person for the third time, so the agent gets the questions that would otherwise go unasked and the mistakes that would otherwise get made. The agent works because it makes getting the knowledge easier than not getting it, which no document has ever managed.'),
    ),
    ...realPicture({
      leadIn: 'It is worth being completely honest about what makes a training agent brilliant or useless, because the technology is the easy part and businesses get this exactly backwards, spending their energy on the wrong half.',
      title: 'The real picture',
      paragraphs: [
        'The agent is the interface. The knowledge is the product. An agent answers from what it has been given, your procedures, your standards, your actual answers to how the work is done, and every quality it shows is a reflection of that knowledge base. Give it a complete, current, well-organised knowledge base and the agent is genuinely excellent, and, this surprises people, genuinely straightforward to build, because the tools to put a voice or chat interface on a body of knowledge are mature and the wiring is a matter of days, not months. The impressive-seeming agent is the easy part.',
        'Which means the real work is not the agent at all, it is the knowledge behind it, and this is the same truth our AI book tells about every agent: the interface is the easy fortnight at the end, and the knowledge is the actual project. For a training agent, that project is everything the earlier chapters described, capturing what is in the experts\' heads, writing down the actual procedures and standards, organising it into a single source of truth, and keeping it current. An agent built on a thin, patchy, or outdated knowledge base is not a good agent with a knowledge problem, it is a confident machine giving wrong and incomplete answers, at scale, to the exact people who trusted it because it sounded authoritative, which is worse than no agent at all, because a team that gets burned by a confidently wrong agent stops trusting the whole system.',
        'So the honest sequence for a training agent is the sequence of this whole book: capture the knowledge first, organise it into a real source of truth, keep it current, and then, and only then, put the agent on top, where it becomes the effortless interface to knowledge that actually exists. Businesses that fall for the demo and try to stand up an agent without doing the knowledge work get a fluent disappointment. Businesses that do the knowledge work get an agent that genuinely answers, and they get something more valuable besides, because the knowledge base they built to feed the agent is the asset, and the agent is only its most convenient front door. Build the knowledge, and the agent is easy. Skip the knowledge, and the agent is a liability that talks.',
      ],
    }),
    {
      type: 'diagram',
      id: 'bte-ch07-agent-interface',
      caption: 'The agent is the interface, the knowledge is the product. Above water, small: the agent, the easy days at the end. Below water, large: the knowledge, captured, organised into a source of truth, kept current, the actual project. Build the knowledge, and the agent is easy. Skip the knowledge, and the agent is a liability that talks.',
    },
  ),
  flow(
    ...section(
      'WHO OWNS IT',
      'Whose job is the knowledge',
      ...p('Because the agent is only as good as its knowledge, someone has to own that knowledge staying true, which is the update ritual from chapter six with a name attached. An unowned knowledge base drifts out of date, and an agent answering from a drifting knowledge base slowly becomes a source of confident misinformation, so a named person keeps it current, and every question the agent could not answer well, or answered wrongly, is a flag to fix the knowledge, the listening loop again. Run this way, knowledge-first and owned, the training agent becomes what it should be, the business\'s own knowledge on call around the clock, training the team one real question at a time, and freeing the experts to lead instead of answer. The next chapter applies all of this to the moment it matters most, bringing a new person into the business.'),
    ),
  ),
]
