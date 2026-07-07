import type { BtwPage } from '../types'
import { flow, opener, p, subsection } from '../../built-to-work/helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'The content toolkit',
    subtitle: 'Each tool is a worker with a job. Take what fits, leave the rest.',
  }),
  flow(
    ...p(
      'This is the chapter to come back to. A content system is built from tools, and each one is a worker with a job: make the thing faster, make it better, or get it out and measured. The making of content has collapsed in cost precisely because these tools got good, but good does not mean necessary, and a business your size can easily drown in tools it does not need. So each entry here gets the same honest treatment as every catalogue in this series: what it is, what it does for you, and, crucially, when it earns its place and when it is overkill. Take what fits your system and your channels, and leave the rest.',
    ),
    {
      type: 'diagram',
      id: 'btm-ch05-toolkit-map',
      caption: 'The toolkit, mapped to the line. DRAFT → MAKE → SHARPEN → PUBLISH → CAPTURE → LEARN. Choose the few that make your system run. Ignore the rest.',
    },
    ...subsection(
      'WRITING',
      'AI for writing',
      ...p('AI is the fastest way from blank page to first draft, and drafting is where content most often stalls. It writes the article outline, the caption options, the post variations chapter three demanded, the email, the script, in your voice once briefed properly. What it does for you is turn the slowest part of content, starting, into minutes, so the source piece and its many children get made instead of postponed. When it earns its place: almost always, because every content system runs on words and AI drafts them cheaply. Where the discipline sits: it drafts, you edit, and nothing goes out sounding like a machine, which chapter seven treats as a brand rule, not a preference, because AI-flavoured content reads as cheap to exactly the clients a premium business wants.'),
    ),
    ...subsection(
      'IMAGES',
      'Image generation',
      ...p('AI image tools now produce genuinely useful visuals in seconds, and they have a clear place and a clear line. The place: concepts, backgrounds, illustrations, graphics, the visual raw material of posts and carousels, made fast and on brand. The line, which this series draws in ink: fine for the made and the illustrative, dangerous for anything presenting as real, your actual products, your actual people, your actual work, because audiences increasingly tell, and a premium business caught using a fake photo of real things pays more in trust than it saved in time. When it earns its place: for the illustrative and conceptual, readily. Where it does not: as a substitute for real photography of your real work, ever.'),
      {
        type: 'diagram',
        id: 'btm-ch05-image-line',
        caption: 'The image line, drawn in ink. LEFT (safe): concepts, backgrounds, illustrations, graphics, the made and the illustrative. RIGHT (crossed): fake photos of your real products, people, work. Fine for the illustrative. Never a substitute for real photography.',
      },
    ),
    ...subsection(
      'VIDEO',
      'AI video',
      ...p('Video is what the platforms reward most, and it used to be the most expensive thing to make, which is exactly what AI video is changing. It can generate clips, animate stills, produce near-real footage, and turn a script into something watchable without a crew. What it does for you is put the highest-reach format within reach of a business that could never have filmed it. The honest part, and it is the "ten videos" question again: near-real AI video can be impressive and it can be worth it, but whether it is depends on the job from chapter two. For awareness, a pile of quick, simple, cheap videos usually beats one elaborate generated production, because you are learning what lands. For converting warm interest, the investment in something genuinely good can pay. When it earns its place: matched to the job, not to the novelty of the tool. Where the money burns: making elaborate video because the tool makes it possible, before you know whether that idea deserves the production.'),
    ),
  ),
  flow(
    ...subsection(
      'DESIGN',
      'AI-assisted design tools',
      ...p('The design tools a business uses to actually assemble posts, carousels, graphics, and videos have absorbed AI throughout, resizing, removing backgrounds, generating layouts, filling templates, so that assembling a professional-looking piece no longer needs a trained designer. What they do for you is make the making fast and keep it on brand through templates. When they earn their place: essentially always, because this is where the assets get built, and the template feature is what makes chapter four\'s consistency-at-speed real. The one caution: the tool makes it easy to produce a lot, which is only a good thing inside the system from this book, and just a faster flood without it.'),
    ),
    ...subsection(
      'SCHEDULING',
      'Scheduling',
      ...p('A scheduling tool lets you plan, prepare, and queue content across your channels in advance, rather than posting by hand in the moment, and it is what turns content from a daily scramble into a batched, calm rhythm. What it does for you is let you make in batches and publish on a schedule, which is how a busy business stays consistent, the thing the platforms reward most, without living inside the apps. When it earns its place: as soon as you are posting to more than one channel with any regularity. On cost, the same honest note this series makes about tools that charge per seat or per channel: the convenient hosted options are fine to start, and there is a self-hosted path that becomes cheaper at volume, worth knowing about when the subscriptions start to sting, and worth a conversation rather than a rushed switch.'),
    ),
    ...subsection(
      'CAPTIONS',
      'Caption and hashtag help',
      ...p('Small tools and AI features that help with the caption, the search terms, the hashtags, the words that carry the piece and increasingly determine whether it is found. What they do for you is sharpen the part of the piece that does the persuading and the discovering, which chapter three flagged as more important than it looks. When they earn its place: as a light assist inside your writing, not as a separate discipline to obsess over. Captions matter, but they are one part of a piece, not a project.'),
    ),
    ...subsection(
      'CAPTURE',
      'Comment-to-DM capture',
      ...p('This is where content stops being content and starts being a lead machine, and it deserves attention because it is the bridge to everything else in this series. The tool watches for a comment, a keyword, an interaction on your post, and automatically sends that person a direct message, the promised link, the guide, the next step, turning public attention into a private conversation and a captured contact. What it does for you is solve chapter one\'s core problem, attention that goes nowhere, by carrying the person from the post to the ground you own. When it earns its place: the moment your content is earning attention worth capturing, which is the whole point of making it. This one is not a nice-to-have, it is the pipe, and chapter nine builds it out fully.'),
      {
        type: 'diagram',
        id: 'btm-ch05-capture-pipe',
        caption: 'The capture pipe. Public post with comment → automatic DM with promised link → captured contact in your system. The pipe, not a nice-to-have. Public attention becomes a private conversation on ground you own.',
      },
    ),
  ),
  flow(
    ...subsection(
      'LINK IN BIO',
      'Link in bio',
      ...p('The single link most platforms allow is more valuable than businesses treat it, because it is the one sanctioned road from the platform to your own ground. Done properly, it points not to a generic homepage but to the specific next step your content is driving toward, the guide, the offer, the enquiry. What it does for you is make sure the attention that does try to reach you lands somewhere that converts rather than somewhere that shrugs. When it earns its place: always, because it costs nothing and it is the difference between a curious person finding your enquiry form and a curious person giving up.'),
    ),
    ...subsection(
      'ANALYTICS',
      'Analytics',
      ...p('The tools that tell you what actually happened: which pieces were seen, watched, saved, clicked, and which led to something real. What they do for you is turn content from guessing into learning, which is chapter eight\'s entire subject and the thing that separates a system that improves from a flood that repeats its misses forever. When they earn its place: from the very beginning, because content you do not measure is content you cannot improve, and the platforms\' own built-in numbers are enough to start. The discipline, which chapter eight sharpens: measure the few numbers that match your job from chapter two, not the vanity numbers that flatter and pay nothing.'),
    ),
    ...subsection(
      'CHOOSING',
      'Choosing what you actually need',
      ...p('That is the toolkit. The skill is not owning all of it, it is choosing the few tools that make your system run for your channels and your jobs, and ignoring the rest, because a business your size can spend more time managing tools than making content if it collects them. Start with the essentials, something to draft, something to design, something to schedule, something to capture, something to measure, and add only when a real need appears. A lean set of tools genuinely used beats a full shelf half-learned, exactly as it does everywhere in this series. With the toolkit chosen, the next chapter is how it all runs day to day, the production line that turns the source into the many, on a rhythm you can actually keep.'),
    ),
  ),
]
