import type { BtwPage } from '../types'
import { flow, opener, p, section, subsection } from '../../built-to-work/helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'The format library',
    subtitle: 'Procedures, videos, podcasts, infographics, quizzes, and when in-person still earns its place.',
  }),
  flow(
    ...p(
      'This is the chapter to come back to, and it is the one that shows just how far the shift this book opened with has gone. Once you have captured the knowledge, you can now turn it into almost any format, and because different people genuinely learn in different ways, being able to serve the same knowledge in many shapes is a real advantage, not a gimmick. Each format here gets the same honest treatment as every catalogue in this series: what it is, what it is good for, and when it earns its place, because a business does not need every format for everything, it needs the right format for the right knowledge and the right people. Take what fits, and remember they are all made from the one source.',
    ),
    {
      type: 'diagram',
      id: 'bte-ch05-format-library',
      caption: 'The format library. Written procedures, screen videos, avatar presenters, podcasts, infographics, slide decks, quizzes, memorable extras, in-person. Each with a one-line best for. All made from the one source. Match the format to the knowledge and the people, not everything to everything.',
    },
    ...subsection(
      'PROCEDURES',
      'Written procedures and checklists',
      ...p('The foundation: the step-by-step written guide, and the one-page checklist for things done often. Plain, clear, findable, the written procedure is the reference people return to when they know roughly what to do but need to confirm the steps, and the checklist is what stops steps being missed on routine work. What it is good for: reference, precision, the things where getting the order and the details exactly right matters. When it earns its place: almost always, as the backbone, because even people who learned from a video want a written reference to check against later. It is the least glamorous format and often the most used.'),
    ),
    ...subsection(
      'SCREEN VIDEO',
      'Screen-recorded videos',
      ...p('For anything done on a screen, the software, the systems, the digital work, a screen recording with a voice explaining it is often the best possible training, because the person sees exactly what to click and hears exactly why. What it is good for: showing digital tasks, which are almost impossible to convey well in writing and obvious in a video. When it earns its place: for any system or software task, which in a modern business is most of them, and it is exactly what the capture method from chapter four produces most easily. Show the screen, explain as you go, and the training makes itself.'),
    ),
    ...subsection(
      'AVATAR',
      'Avatar presenter videos',
      ...p('Where a presented, on-camera style helps but filming a real person every time is impractical, an AI avatar can present the training, a consistent, professional presenter delivering the material without anyone needing to be filmed. What it is good for: putting a human face and voice on training at scale, for concepts and explanations that land better when presented than when read. When it earns its place: when you want the warmth and clarity of a presenter but cannot film one for every piece, or when training changes often enough that re-filming a person would be impractical. It is a newer format, and used well it makes presented training practical where it never was before.'),
    ),
  ),
  flow(
    ...subsection(
      'PODCASTS',
      'Podcasts from your own knowledge',
      ...p('This is the format that shows how far things have come, and it is a genuinely premium way to train. Your own written knowledge, a procedure, a guide, an update, can now be turned into an audio conversation, a podcast episode, that people listen to on the drive to work, at the gym, away from a screen. What it is good for: concepts, context, the why behind things, the material that suits being listened to rather than watched or read, and reaching people in the time they cannot spend at a screen. When it earns its place: for onboarding context, for change explanations, for the understanding-level knowledge that benefits from being absorbed passively over time, and as a genuinely impressive signal that the business takes bringing people along seriously. Telling a team here is a short podcast on what changed and why is a premium touch that also happens to work, because it meets people where their attention actually is.'),
      {
        type: 'diagram',
        id: 'bte-ch05-podcasts',
        caption: 'Podcasts from your own knowledge. A written procedure turning into an audio conversation, a person listening on the drive to work. Reaches people in the time they cannot spend at a screen. We changed this, here is a short podcast on what and why, a premium touch that also works.',
      },
    ),
    ...subsection(
      'INFOGRAPHICS',
      'Infographics and visual one-pagers',
      ...p('For knowledge that is easier to grasp as a picture than as prose, a process, a structure, a decision path, a visual one-pager or infographic makes it clear at a glance. What it is good for: overviews, processes, anything spatial or structural, and the quick-reference things people pin up and glance at. When it earns its place: for the knowledge where a diagram genuinely beats paragraphs, which is more knowledge than businesses realise, and as the scannable summary that sits alongside a deeper format.'),
    ),
    ...subsection(
      'SLIDES',
      'Slide decks for the group session',
      ...p('When there is a genuine reason to bring people together, a real rollout, a session that benefits from discussion, a clear slide deck structures the session and gives people something to follow and keep. What it is good for: group settings, the material that benefits from being presented and discussed live, the moments where gathering people is actually worth it. When it earns its place: for the genuine group moments, not as a default, because a slide deck delivered once to a room is exactly the one-format one-session training this book warns against unless it is paired with materials people can revisit.'),
    ),
    ...subsection(
      'QUIZZES',
      'Quizzes that confirm it landed',
      ...p('The format that does the checking from chapter three: a short quiz that confirms the person understood, turning training from delivered-and-hoped into delivered-and-confirmed. What it is good for: confirming knowledge landed, revealing exactly what needs re-teaching, and giving both sides confidence the training worked. When it earns its place: after anything that matters, as the check that closes the loop, and it is easy to generate from the same source as the training itself. It is not about catching people out, it is about knowing, which is worth far more than hoping.'),
    ),
    ...subsection(
      'EXTRAS',
      'The memorable extras',
      ...p('And because memorable beats formal, there is room for the format that makes the thing impossible to forget, the jingle, the mnemonic, the catchy device for the thing everyone always gets wrong. It sounds like too much, and used sparingly for the genuinely sticky things, it works, because a memorable device can lodge a critical step in someone\'s head where a paragraph never could. What it is good for: the one or two things that must not be forgotten and always are. When it earns its place: rarely and deliberately, for the critical, forgettable details, as a spice rather than a staple. Why not, if it makes the thing stick.'),
    ),
  ),
  flow(
    ...subsection(
      'IN PERSON',
      'In-person, for what only it can do',
      ...p('Last, the format the tools do not replace, and knowing what it is uniquely for is the point. In-person training is best kept for what only it can do: judgment that needs discussion, culture that has to be felt, hands-on practice with real feedback, the sensitive conversation, the genuinely complex thing that benefits from a real human in the room. What it is good for: the human, the nuanced, the practised-with-feedback. When it earns its place: for the knowledge that genuinely needs a person, and not for the things a video, a procedure, or an agent now does better, faster, and without a senior person\'s time, which is most of the routine training that used to eat that time. Reserve your people\'s in-person teaching for where their presence actually adds something, and let the system carry the rest.'),
      {
        type: 'diagram',
        id: 'bte-ch05-in-person',
        caption: 'What in-person is uniquely for. LET THE SYSTEM CARRY (grey): routine procedures, software walkthroughs, standard context, a video does it better, faster, without senior time. RESERVE FOR IN-PERSON (gold): judgment that needs discussion, culture that must be felt, hands-on practice with feedback, the sensitive conversation. Reserve your people\'s teaching for where their presence actually adds something.',
      },
    ),
    ...section(
      'CHOOSING',
      'Choosing the format for the knowledge',
      ...p('That is the library, and the skill is matching the format to the knowledge and the people, not making everything in every format. A screen task wants a screen recording. A process wants an infographic. Context for the drive home wants a podcast. A critical detail wants a memorable device and a checklist. And confirmation always wants a quiz. Serve the same captured knowledge in the shapes that suit it, and you reach every person the way they actually learn, which is the whole advantage the shift has handed you. With the formats understood, the next chapter is the one that turns training from a set of materials into something alive in the daily work, and it introduces the format that changes the game most, the training agent.'),
    ),
  ),
]
