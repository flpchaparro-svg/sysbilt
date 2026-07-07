import type { BtwPage } from '../types'
import { flow, opener, p, section, subsection } from '../../built-to-work/helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'The dashboard library',
    subtitle: 'Daily glance, pipeline, marketing, money, operations, and content views.',
  }),
  flow(
    ...p(
      'This is the chapter to come back to, a library of the actual dashboards most businesses need, each built to answer one clear question from the right numbers. Rather than one overwhelming everything-screen, which chapter three warned against, a business is better served by a few focused views, each answering a question that matters, glanced at on its own rhythm. Each entry here gets the same honest treatment as every catalogue in this series: what it is, the question it answers, who looks at it and how often, and when it earns its place, because a business does not need every dashboard, it needs the few that match its priorities. Take what fits, and remember each is built on owned data and shared definitions from chapter two.',
    ),
    {
      type: 'diagram',
      id: 'bse-ch05-dashboard-library',
      caption: 'The dashboard library. Daily glance, pipeline and sales, marketing, money, operations, content. Each answers one question, glanced on its own rhythm. A few focused views, not one everything-screen.',
    },
    ...subsection(
      'DAILY',
      'The daily glance',
      ...p('What it is: a single, simple view answering the question is everything okay right now, checked in seconds at the start of the day. It shows the handful of things that would need immediate attention, yesterday\'s leads and sales, anything that went wrong overnight, the cash position, today\'s key commitments. The question it answers: is there anything I need to deal with today. Who looks at it and how often: the owner or manager, daily, briefly. When it earns its place: for almost any business, because a quick daily read is what catches problems while they are small, and it is the view that turns seeing clearly into a habit rather than an occasional exercise. This is the most-used dashboard a business has, precisely because it is the quickest.'),
      {
        type: 'diagram',
        id: 'bse-ch05-daily-glance',
        caption: 'The daily glance. One simple view at the start of the day: is everything okay right now? Yesterday\'s leads and sales, anything wrong overnight, cash, today\'s commitments. Two minutes, daily, the view that turns seeing clearly into a habit.',
      },
    ),
    ...subsection(
      'PIPELINE',
      'The pipeline and sales view',
      ...p('What it is: the view answering how is the work coming in and converting, showing the leading numbers from chapter four, leads by source, quotes out, the pipeline value and health, conversion rate. The question it answers: where is the business heading, based on the work in progress now. Who looks at it and how often: the owner and anyone in sales, weekly, as the basis of the sales rhythm this series\' CRM book described. When it earns its place: for any business that wins work through a pipeline, which is most, because these are the leading indicators that predict revenue, and watching them is how you see a good or bad patch coming rather than discovering it in the results. This is the windscreen to the daily glance\'s mirror.'),
    ),
    ...subsection(
      'MARKETING',
      'The marketing view',
      ...p('What it is: the view answering which marketing actually works, showing where leads and customers come from and, crucially, which sources produce real business rather than just traffic. The question it answers: where should the marketing effort and money go. Who looks at it and how often: the owner, monthly, as the basis of the content and marketing loop this series built. When it earns its place: as soon as a business is spending real effort or money on getting found, because it is the difference between investing in what works and guessing, and it closes the loop the CRM and content books opened by connecting a source all the way to real business. This is where flying blind about marketing ends.'),
    ),
  ),
  flow(
    ...subsection(
      'MONEY',
      'The money view',
      ...p('What it is: the view answering how is the business doing financially, right now, not last quarter, showing revenue, margin, the cash position, and what is owed, pulled from the accounting rather than waiting for the report. The question it answers: is the business actually healthy and can it pay its way. Who looks at it and how often: the owner, weekly or monthly depending on how tight cash is. When it earns its place: for every business, because the money numbers are the ones that determine survival, and the rear-view problem from chapter one hurts most here, where finding out late that margin is shrinking or cash is tight can be fatal. A current money view is the antidote to the accountant\'s-report-only way of knowing.'),
    ),
    ...subsection(
      'OPERATIONS',
      'The operations view',
      ...p('What it is: the view answering can we actually deliver what we are winning, showing capacity, workload, and whatever measures tell you the work is getting done well and on time. The question it answers: is the business able to keep its promises. Who looks at it and how often: whoever runs delivery, on whatever rhythm the work moves. When it earns its place: for businesses where delivery capacity is a real constraint, which is any business that can win more than it can do, because winning work you cannot deliver damages the reputation everything else was built to earn. Not every business needs this as a formal view early on, and the ones whose constraint is delivery need it badly.'),
    ),
    ...subsection(
      'CONTENT',
      'The content and social view',
      ...p('What it is: the view answering is the content earning attention that turns into business, showing the numbers that matter per the content book, reach and engagement that lead somewhere, and the leads content actually produced. The question it answers: is the content system working, and which content works. Who looks at it and how often: whoever runs content, monthly, as the content book\'s measuring loop. When it earns its place: for businesses running a content system, because it is what keeps content honest and pointed at business rather than vanity, and it connects the content effort to the leads it produces. It is the content book\'s monthly loop given a home.'),
    ),
    ...section(
      'CHOOSING',
      'Choosing the views you need',
      ...p('That is the library, and the skill is the same as everywhere in this series: build the few views that answer the questions that matter for your business right now, not all of them, and not one giant screen that answers none of them well. Most businesses are well served by a daily glance, a pipeline view, a money view, and a marketing view, adding the operations and content views as those areas become priorities. Start with the daily glance, because it is the quickest to use and the fastest to earn its keep, and build the others as the questions they answer become the questions you are actually asking. A few focused, glanceable views genuinely used beats one overwhelming dashboard admired once, exactly as it does with every catalogue in this series. With the views chosen, the next chapter is how you run them day to day and keep them honest, because a dashboard is only worth building if it gets used and only worth trusting if the data behind it is clean.'),
      {
        type: 'diagram',
        id: 'bse-ch05-start-with-glance',
        caption: 'Start with the daily glance. Most businesses: daily glance, pipeline, money, marketing. Add operations and content as priorities emerge. Start with the quickest view, build the others when the questions become real.',
      },
    ),
  ),
]
