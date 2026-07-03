import type { BtwPage } from '../types'
import { closing, flow, opener, p, realPicture, section } from '../helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'Getting found',
    subtitle: 'A great website is worth nothing if nobody sees it. This is how the right people arrive.',
  }),

  flow(
    ...p(
      'A beautiful, fast, well-built website is worth very little if nobody ever sees it. Getting found is how the right people arrive in the first place, and it is the part of the web that owners find most mysterious and most full of noise. This chapter cuts through it. We will explain how being found actually works, lay out the three stages of the work in plain terms, cover how to be found by AI assistants as well as search engines, and end with a simple monthly checklist. None of it is magic. It is a process, and it never quite finishes, which is the first thing worth understanding.',
    ),
    ...section(
      'HOW IT WORKS',
      'How getting found actually works',
      ...p(
        'At its simplest, search engines and AI assistants are trying to do one thing. When someone asks a question or searches for a service, they want to show that person the most relevant, trustworthy answer. Everything about getting found comes down to becoming, in their eyes, that answer.',
        'That means three things have to be true. Your site has to be readable by these systems, so they can understand what you offer. Your content has to genuinely match what people are searching for, so you are relevant. And your business has to appear trustworthy and established, so you are chosen over the alternatives. Readable, relevant, trusted. The work of getting found is the steady work of becoming all three, and the three stages that follow each build one of them.',
      ),
      {
        type: 'diagram',
        id: 'three-stages-getting-found',
        caption: 'The three stages of getting found.',
      },
    ),
  ),

  flow(
    ...section(
      'STAGE ONE',
      'Foundation',
      ...p(
        'The first stage is the groundwork, and it is mostly done once and done right. This is what makes your site readable and eligible to be found at all.',
        'It covers the essentials. The site must be open to search engines rather than accidentally hidden from them. It must be fast, because speed counts here as well. Every page needs a clear title and a short description that tells both people and search engines what the page is about. The structure needs to be clean, with sensible headings, and images need text descriptions so they can be understood. Behind the scenes, structured data, the labelling we covered in the features chapter, helps these systems read your information precisely. And the tools that let you see how you are doing, a search console and analytics, need to be connected from the start. None of this is visible to your visitors, and all of it determines whether you can be found. Get the foundation right and everything built on top of it works harder. Get it wrong and the best content in the world struggles to surface.',
      ),
    ),
  ),

  flow(
    ...section(
      'STAGE TWO',
      'Content and relevance',
      ...p(
        'The second stage is where getting found becomes ongoing, and it is the steady, rewarding work of becoming relevant. If the foundation makes you readable, content makes you the answer.',
        'It works like this. People search using words and questions, and the site that has useful pages and articles addressing those exact questions is the site that gets shown. So you build a page for each core thing you offer, written in the language your clients actually use, and you publish articles on a regular rhythm that answer the real questions they ask. There is a way of writing these that matters more now than it used to. Answer the question directly and plainly near the top of the page, in a sentence or two, before you elaborate, because that is what both a search engine and an AI assistant will lift and show. You link related pages together so a visitor, and a search engine, can move naturally between them. And you keep older content fresh rather than letting it age. This is the monthly rhythm we keep returning to. It is not dramatic, and it compounds. Each useful page is a new way to be found, and they accumulate, so a business that publishes steadily for a year has many more doors open than one that built a site and walked away. This is real, continuing work, and it is the engine of being found over the long term.',
      ),
    ),
  ),

  flow(
    ...section(
      'STAGE THREE',
      'Authority and links',
      ...p(
        'The third stage is the hardest and the most powerful, and it is about becoming trusted. Search engines and AI assistants judge trust partly by who else vouches for you, and the main way the web vouches for a business is through links and mentions from other reputable sites, and through genuine reviews.',
        'In practice this means a few things. It means earning a steady flow of real reviews, gathered on a system as we discussed, so your reputation is visible and growing. It means making sure your business is listed accurately and consistently across the directories and platforms that matter. And it means earning links and mentions from other credible sites, which is the most demanding part. A worked example: a respected organisation you belong to lists you on its members page, a supplier you work with features you as a partner, you contribute a useful article to a publication your clients read, or you support a community event that mentions you online. Each of these is a real vote of confidence that lifts how trusted you appear, to search engines and to AI assistants alike.',
        'This is where the honest truth sits. Stage three is slow, ongoing, and labour-intensive. It cannot be rushed or bought cheaply without doing more harm than good, and it is the work most businesses underestimate. It is also where the compounding pays off most, because trust, once built, is hard for a competitor to overtake. Many owners read this stage, recognise the time it takes, and decide it is the part worth handing to people who do it every day. Whether you build it yourself or not, understanding what it involves tells you what good work looks like and what it is worth.',
      ),
    ),
  ),

  flow(
    ...section(
      'FOUND BY AI',
      'Getting found by AI, not just search engines',
      ...p(
        'Increasingly, people do not search and click through a list of links. They ask an assistant a question and get a direct answer, and that answer often recommends specific businesses. This shift is large and still accelerating, and being the business an assistant names is becoming as important as ranking in a traditional search. There is even a name for the work of positioning yourself for it, generative engine optimisation, or GEO, which means making your content easy for AI assistants to read, trust, and cite.',
        'The encouraging part is that this is not a separate dark art. It is mostly good fundamentals done well. Assistants favour businesses whose information is clear, well-structured, and factually plain, so they can extract and trust it. That means writing in direct, useful answers rather than vague marketing language, labelling your information clearly with structured data, having genuine reviews and consistent details across the web, and being mentioned by other credible sources. A business that is readable, relevant and trusted to a search engine is, by and large, readable, relevant and trusted to an AI assistant too. The detail of how these systems work shifts quickly, but the principle is steady. Make it easy for a machine to understand exactly what you do, who you serve, and why you can be trusted, and you give yourself the best chance of being the answer it gives.',
      ),
    ),
  ),

  flow(
    ...realPicture({
      title: 'From ranked to cited',
      paragraphs: [
        'There is a shift underneath all this that is worth understanding plainly, because it changes what "getting found" even means, and it is where a lot of businesses are about to be caught out.',
        'For two decades, getting found meant ranking on a page of links and earning the click. That is no longer the whole game. More and more, the answer is assembled and delivered by an AI assistant, and the person never visits a list of links at all. They ask, they get an answer, and that answer either mentions you or it does not. Being mentioned, even when it does not produce a click, is now valuable in itself, because it puts your name in front of someone at the moment they are deciding who to consider. The work has quietly moved from being ranked to being cited.',
        'This creates a new difficulty, and it is honest to name it. You can largely see your standing in traditional search, in the tools that report your rankings and traffic. You cannot see, in those same tools, whether an AI assistant is recommending you, because no one clicked, so nothing was recorded. A business can be the answer an assistant gives a hundred times a day and have its ordinary dashboards show nothing at all. Knowing where you actually stand now means deliberately checking what the assistants say about you and your competitors, which is a new kind of monitoring most businesses are not yet doing.',
        'And none of it is a one-time fix. The systems that decide who gets cited change constantly, the way you are described can drift, and a presence that was strong a year ago can fade if it is not maintained. This is exactly the kind of ongoing, moving-target work the opening of this book warned about, and it is a real part of why getting found is no longer something you set up once and forget. We name all this not to alarm you but to be straight about the ground as it actually is, so that being found tomorrow is something you are building toward on purpose, rather than something you assume is still working the way it did.',
      ],
    }),
    {
      type: 'diagram',
      id: 'ranked-to-cited',
      caption: 'From ranked to cited.',
    },
  ),

  flow(
    ...section(
      'YOUR PROFILE',
      'Your business profile, often your biggest source',
      ...p(
        'For a great many businesses, especially those serving a local area, there is one source of enquiries that often outperforms the website itself. It is your business profile, the listing that appears on the map and to the side when someone searches for what you do nearby.',
        'This is too important to treat as an afterthought. A complete, active, well-tended profile, with accurate details, real photos, a steady flow of reviews, and regular updates, can put you in front of people at the precise moment they are looking to buy, often above the regular results. For a local business, time spent here frequently returns more than time spent almost anywhere else online. The website and the profile work together, the profile catching people as they search nearby, the website giving them the depth and proof to choose you. We treat the profile as a core part of being found, not a box ticked once and forgotten, because for many businesses it is the hardest-working asset they have.',
      ),
    ),
  ),

  flow(
    ...section(
      'CONSISTENCY',
      'Keep your details consistent everywhere',
      ...p(
        'One small, unglamorous thing underpins much of being found locally, and it is worth its own mention because it is so often overlooked. Your business name, address and phone number need to be identical everywhere they appear online, on your site, your business profile, and every directory that lists you.',
        'The reason is that search engines build confidence in a business partly by cross-checking these details. When they match perfectly everywhere, the business looks settled and legitimate. When they conflict, an old address here, a different phone number there, it introduces doubt, and doubt costs you visibility. Keeping these details consistent is tedious and entirely within your control, and it strengthens everything else you do to be found. It is the kind of small discipline that separates a business that takes its presence seriously from one that leaves it to chance.',
      ),
    ),
    ...section(
      'EVERY MONTH',
      'The monthly checklist',
      ...p(
        'To make all of this manageable, here is the work of being found reduced to a simple monthly rhythm. None of it takes long on its own. Done consistently, it is what keeps you visible and steadily growing.',
      ),
    ),
  ),

  flow(
    {
      type: 'checklist',
      title: 'Monthly checklist',
      items: [
        'Publish one useful article, answering a real question your clients ask.',
        'Review your existing pages and refresh anything that has gone out of date.',
        'Ask one or two recent, happy clients for a review.',
        'Reply to every new review, positive or otherwise.',
        'Post an update to your business profile, an offer, a photo, a piece of news.',
        'Check that your name, address and phone number are still consistent everywhere.',
        'Look at your search console and analytics for what is bringing visitors and what is not.',
        'Ask the main AI assistants, the likes of ChatGPT, Perplexity, Claude and Google\'s AI Overviews, what they recommend for your kind of business, and note whether you are named.',
        'Find and fix any broken links or errors that have appeared.',
      ],
    },
    ...p(
      'That is the whole of it. A business that does these things every month, without fail, will be found more easily a year from now than it is today. It is not complicated. It simply has to be done, and kept up, which is the part that catches most people out, and the part most worth getting help with if doing it consistently on your own is not realistic.',
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Getting found brings the right people to your door. What happens once they arrive, and how your website connects to everything else in your business to turn those people into clients and keep them, is where the real power of a properly built system shows itself. That is the next chapter, and it is the one that ties the whole thing together.',
      ),
    ),
  ),
]
