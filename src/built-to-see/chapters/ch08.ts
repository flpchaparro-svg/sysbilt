import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'Knowing where to look, and when',
    subtitle: 'Alerts and thresholds, anomaly flags, plain-language questions of your data, and forecasts as guidance.',
  }),
  flow(
    ...p(
      'The dashboards so far require you to look, and looking, even briefly, still depends on you remembering to and knowing what you are looking for. This chapter is about seeing further with less effort: having the business tell you when something needs attention rather than making you watch for it, and being able to ask your business questions in plain language and get answers from your own data. This is the more advanced layer, kept firmly on the ground, and it is where the shift this series keeps describing, capable tools becoming affordable, reaches even the way you know what is happening.',
    ),
    ...section(
      'TOLD NOT WATCHING',
      'You should not have to watch all day',
      ...p('The first idea reframes the whole point of dashboards: you should not have to stare at them, the system should watch for you and tell you when something needs your attention. Even a quick daily glance depends on you doing it and noticing the right thing, and a busy owner will miss things, not from carelessness but from having a business to run. The better model is to be alerted: the system watches the numbers continuously, and tells you when something crosses a line that matters, so instead of hoping you notice a problem on your daily look, you are told the moment it happens, and the rest of the time you are free to not think about it at all.'),
      ...p('This is a genuine shift in how knowing works. Rather than the burden being on you to watch, the burden is on the system to flag, and you only spend attention when there is something to spend it on. A number drops below a threshold you care about, you are told. A cost spikes, you are told. Something that should happen every day did not happen today, you are told. The rest of the time, silence, which now genuinely means things are fine because you would have been told if they were not. This is more restful and more reliable than watching, because it does not depend on your vigilance, and it catches things faster, because the system never gets busy or distracted the way a person does.'),
      {
        type: 'diagram',
        id: 'bse-ch08-told-not-watching',
        caption: 'Told, not watching. LEFT: an owner having to remember to check dashboards and notice the right thing, depends on your vigilance, and you are busy. RIGHT: the system watching continuously and tapping the owner on the shoulder only when something crosses a line, silence genuinely means fine. The burden moves from you watching to the system flagging.',
      },
    ),
    ...section(
      'THRESHOLDS',
      'Alerts when a number crosses a line',
      ...p('The practical version is threshold alerts: you decide the lines that matter, and the system tells you when a number crosses one. Leads this week drop below a level that means trouble is coming, alert. Cash owed to you climbs above a level that means you should chase, alert. A key number moves outside its normal range in either direction, alert. You set the lines once, based on what actually matters for your business, and then the watching is automatic, and you are pulled in only when there is a reason. The skill is choosing the right lines, the thresholds that genuinely warrant your attention, so the alerts mean something and you do not get so many that you start ignoring them, which is the alert version of the cluttered-dashboard problem. A few well-chosen alerts on the numbers that truly matter turn the business into something that taps you on the shoulder when it needs you, rather than something you have to keep checking on.'),
    ),
    ...section(
      'ANOMALIES',
      'The anomaly flag',
      ...p('Beyond the lines you set deliberately, there is a more advanced kind of watching: flagging things that are simply unusual, movements you did not think to set a threshold for but that stand out from the normal pattern. Sales suddenly halved for no obvious reason. A cost that is normally steady suddenly double. Enquiries that always come in every day suddenly stopped. You did not set a specific alert for these, but they are abnormal, and a system watching for anomalies can flag them, catching the things you would not have known to watch for. This is where the pattern-reading capability this series describes earns its place in dashboards, noticing the unusual and surfacing it, so that the broken form that silently stopped producing leads, exactly the silent failure this series keeps warning about, gets caught as an anomaly rather than discovered weeks later as a mysteriously quiet month. Anomaly flagging is the system watching not just the lines you drew but the shape of normal, and telling you when reality departs from it.'),
      {
        type: 'diagram',
        id: 'bse-ch08-thresholds-anomalies',
        caption: 'Thresholds and anomalies. THRESHOLD, lines you set: leads below a level, cash owed above a level, alert. ANOMALY, the shape of normal: sales suddenly halved, a steady cost suddenly doubled, daily enquiries suddenly stopped, flagged even though you set no line. The lines you drew, and the departures from normal you did not think to draw.',
      },
    ),
  ),
  flow(
    ...section(
      'ASK A QUESTION',
      'Ask your business a question',
      ...p('Here is the capability that changes the daily experience most, and it is the same one our AI book described arriving through the standard connection it called MCP: being able to ask your business a question in plain language and get an answer from your live data. Instead of finding the right dashboard or building a new view, you simply ask, which service made us the most margin this quarter, which clients have not ordered since March, how does this month\'s pipeline compare to the same time last year, and the answer comes back from your actual numbers.'),
      ...p('The plain explanation of how this works matters, because it will be sold confusingly. The AI is connected to your business systems through a secure, governed link, the standard plug our AI book described, which lets it read your data within set permissions and answer questions from it. It is not magic and it is not a new database, it is a way of asking your existing systems questions in plain English rather than having to build a report for every question. What it makes possible is enormous for a busy owner: the questions that would each have needed a new dashboard or a data person can now just be asked, and answered, in the moment, from the real data. The guardrails are exactly the ones that series prescribed: the link is read-only for questions like these, so asking can never change anything, the permissions govern what it can see, and the answers, like any AI output, are trusted most where you can sanity-check them, so the surprising number gets a second look before it drives a big decision. Asked this way, your business becomes something you can interrogate in plain language, which is a genuinely new thing for a growing business, and it means the answer to a one-off question is no longer a project, it is a sentence.'),
      {
        type: 'diagram',
        id: 'bse-ch08-ask-question',
        caption: 'Ask your business a question. A plain-language question going through a governed, read-only connection into the business systems, and an answer coming back with the figures behind it. Read-only for questions, permissions govern what it sees, sanity-check the surprising ones. A one-off question is no longer a project, it is a sentence.',
      },
    ),
    ...realPicture({
      leadIn: 'It is worth being honest about forecasting and prediction, because this is where dashboards and data most tempt a business into false confidence, and understanding the limit is what keeps the capability useful rather than dangerous.',
      title: 'The real picture',
      paragraphs: [
        'The leading numbers from chapter four let you see ahead a little: a healthy pipeline suggests healthy revenue to come, dropping leads suggest a dip approaching. This is genuinely useful, and it is where a lot of the value of seeing clearly lives, in catching what is coming while there is still time to act. But it is essential to understand what these forward-looking numbers actually are: they are informed estimates based on patterns, not predictions of the future, and treating them as certainty is a real mistake. A pipeline worth a certain amount does not mean that amount will close, it means that is the value of the work in progress, and how much becomes real depends on your conversion, on timing, on things that have not happened yet. A forecast is a weather report, useful and worth heeding, and sometimes wrong, and a business that treats its forecast as a promise will occasionally be badly surprised.',
        'This matters because dashboards and data can create a false sense of precision, presenting an estimate with the same clean, authoritative confidence as a fact, so a projected number sits on the screen looking exactly as solid as an actual number, and the business forgets that one is measured and the other is guessed. The projected revenue, the forecast pipeline, the predicted trend, are all estimates wearing the clothing of facts, and the danger is acting on them with a confidence they do not deserve, committing to spending based on revenue that is forecast rather than real, or treating a predicted trend as certain when it is a pattern that could easily break. The honest way to use forward-looking numbers is as informed guidance that shapes your thinking and earns a heightened alertness, not as certainty that justifies betting the business, and the more precise and confident a projection looks, the more worth remembering that precision is not the same as accuracy, and a very exact forecast is still a forecast.',
        'The same caution applies to any AI-driven prediction or plain-language answer about the future: it is a well-informed estimate from the patterns in your data, not a look through a window at what will happen, and it should inform your judgment rather than replace it. Used this way, forward-looking numbers are one of the most valuable things in this book, because they let you act early. Misused as certainties, they are one of the most dangerous, because they let you act boldly on things that were never sure. The discipline is to take the guidance seriously and hold the certainty loosely, which is the honest posture toward any attempt to see the future, however good the data behind it.',
      ],
    }),
    {
      type: 'diagram',
      id: 'bse-ch08-forecast-weather',
      caption: 'A forecast is a weather report. WRONG: sitting on screen looking exactly as solid as a measured fact, false precision, acted on as certainty. RIGHT: shown as a range or estimate, informed guidance, held loosely, earns alertness not a bet. Precision is not accuracy. A very exact forecast is still a forecast.',
    },
    ...section(
      'IN SHORT',
      'In short',
      ...p('Seeing further means being told rather than watching, through thresholds and anomaly flags, and being able to ask your business questions in plain language through the connected AI this series describes, all while holding forecasts as guidance rather than fact. It turns knowing what is happening from a thing you have to do into a thing the business does for you, surfacing what matters when it matters. The last chapter brings the whole series together, the dashboard as the single screen where the entire connected business finally becomes visible.'),
    ),
  ),
]
