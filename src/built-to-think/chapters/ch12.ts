import type { BtwPage } from '../types'
import { flow, opener, p, section, glossary } from '../../built-to-work/helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
  }),
  flow(
    ...p(
      'The last chapter is a reference rather than a read: the trade\'s terms in plain words, and the honest note on what comes next.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro: 'The terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'Agent',
          definition: 'AI that acts across steps rather than answering once: the chat or voice assistant on a defined patch, or software AI executing sequences. Its quality is set by its knowledge; its safety by its gates.',
        },
        {
          term: 'API',
          definition: 'The doorway a system offers so other software, including AI, can use it. Tier three lives here.',
        },
        {
          term: 'Cache',
          definition: 'Remembered recent work, so the same question is not paid for twice. The quiet saver of connected setups.',
        },
        {
          term: 'Circuit breaker',
          definition: 'The safety that halts an AI step after repeated failures, so a broken loop trips a flag instead of running a tab.',
        },
        {
          term: 'Context window',
          definition: 'How much the model can consider at once. Everything it should weigh must fit through it, and bigger costs more.',
        },
        {
          term: 'Fine-tuning',
          definition: 'Custom-training a model on your own examples. Real, specialised, and almost certainly not what a growing business needs; the prompt library and a good knowledge base get you there without it.',
        },
        {
          term: 'Hallucination',
          definition: 'The confident invention: the model producing plausible falsehood with the same fluency as truth, because plausible is what it is built to produce. Managed, never eliminated, which is why the gates exist.',
        },
        {
          term: 'Human in the loop',
          definition: 'The pattern this series runs on: the machine prepares, the human approves. Drafts, not sends.',
        },
        {
          term: 'Knowledge base',
          definition: 'Your business\'s answers, written down, current, and owned: what agents answer from, what training builds on, what the machines that read the web reward. The product behind every good agent.',
        },
        {
          term: 'LLM (language model)',
          definition: 'The engine behind modern AI: a prediction machine trained on vast text, producing the most plausible continuation of whatever it is given.',
        },
        {
          term: 'MCP',
          definition: 'The emerging standard plug that lets an AI connect safely to your tools with set permissions, making ask-your-business-a-question possible without custom plumbing per connection.',
        },
        {
          term: 'Prompt',
          definition: 'The briefing: context, precise ask, constraints, examples. The input that sets the output\'s quality almost entirely.',
        },
        {
          term: 'Prompt library',
          definition: 'The shared collection of briefings that work, refined and owned: one person\'s knack made the whole team\'s capability.',
        },
        {
          term: 'Reasoning model',
          definition: 'A model that works through steps before answering, priced for every step of the thinking. For genuinely hard problems, not the mail.',
        },
        {
          term: 'Token',
          definition: 'The unit AI is priced in, roughly a word-piece, counted in and out. The meter, and the reason design discipline is cost discipline.',
        },
        {
          term: 'Tier',
          definition: 'The three doors AI is bought at: the chat subscription, the features inside your tools, and the API inside your automations. Priced in that order; earned in that order.',
        },
      ],
    ),
  ),
  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p('The right AI in a business is never finished, because the models keep improving, the fit keeps shifting, and the assets underneath, the prompt library, the knowledge base, the gates and meters, stay exactly as good as they are kept. The businesses getting compound value from AI have someone who knows their particular setup standing behind it: sizing the new capability against the ladder, auditing the steps against the meter, and keeping the whole thing boring, which is the goal.'),
      ...p('So here is the honest invitation. You have just read the composed version of the loudest subject in business: what the machine actually is, where it genuinely pays, what it honestly costs, and the disciplines that separate the businesses winning quietly from the ones funding the statistics in chapter one. If, reading it, you recognised money already leaking, the oversized models, the ungated drafts, the tool bought before the problem, or you saw the rungs you want climbed without the tuition of climbing them alone, then it is worth a conversation.'),
      ...p('The place to start is an AI Systems Review. It is a straight, no-obligation look at where AI would genuinely pay in your business, and where it would not, measured against everything this book describes: your candidate tasks run through the anatomy, your current spend sized honestly, the ladder sequenced for your situation, and the guardrails specified before anything runs unattended. There is no pitch and no pressure in it, and no shortage of things we will tell you not to buy. Either way, you come away with a clear, honest map of the right AI for your business, which is a rarer document than it should be.'),
      ...p('If that would be useful, request your review at sysbilt.com. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. Tell us you read this, and we will show you the machinery from these pages working live, the enquiry briefed, the drafts gated, the meters read, so you can judge the composed version against the hype with your own eyes.'),
      ...p('Because the businesses that win with AI will not be the ones that believed the loudest promises. They will be the ones that put thinking exactly where thinking pays, and judgment exactly where it always belonged. When you are ready for that version, we are ready to build it with you.'),
    ),
  ),
]
