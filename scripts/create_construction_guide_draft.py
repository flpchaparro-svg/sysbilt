#!/usr/bin/env python3
"""Create the construction ecosystem guide as a Sanity draft."""

from __future__ import annotations

import json
import os
import re
import uuid
from pathlib import Path
from urllib import error, request

PROJECT_ID = "wdlc9pg8"
DATASET = "production"
API_VERSION = "2024-02-20"
BASE = f"https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}"

ASSETS_DIR = Path(
    "/Users/felipechaparro/.cursor/projects/Users-felipechaparro-SYSBILT-COM/assets"
)

IMAGES = {
    "img-01": {
        "file": "the_disconnected_builder-elementor-io-optimized-c01f378c-a62d-4868-9794-6700e3ce3238.png",
        "ratio": "16:9",
        "alt": "Diagram showing disconnected construction software tools causing administrative bottlenecks.",
        "caption": "Buying software does not help if the platforms refuse to talk to each other.",
    },
    "img-02": {
        "file": "the_unified_digital_ecosystem-elementor-io-optimized-8ac0acec-e40e-40c2-bc90-4ed7905a9ce3.png",
        "ratio": "16:9",
        "alt": "Data flowing perfectly from a website through to estimating and accounting software.",
        "caption": "A connected ecosystem removes manual data entry entirely.",
    },
    "img-03": {
        "file": "the_client_journey-elementor-io-optimized-dea912ca-e12c-4252-b1a0-bf0d192ca888.png",
        "ratio": "4:3",
        "alt": "A process flow showing how content and automation qualify construction leads.",
        "caption": "Your systems should educate and qualify clients before you ever meet them.",
    },
    "img-04": {
        "file": "centralising_knowledge-elementor-io-optimized-ce7e4cf5-795c-4f13-8559-6b314288feec.png",
        "ratio": "16:9",
        "alt": "Diagram showing physical construction manuals being converted into a digital library.",
        "caption": "Your team needs a central brain they can access from the job site.",
    },
    "img-05": {
        "file": "how_we_build_it-elementor-io-optimized-602adb3e-9bbb-4a9b-aca8-d2aa72b2d71e.png",
        "ratio": "9:16",
        "alt": "Five vertical steps outlining the digital transformation process for builders.",
        "caption": "The systematic approach to building a connected construction business.",
    },
}

PERSONA_REFS = [
    {"_type": "reference", "_ref": "d2bf12d0-136d-4fdc-8649-e760da5739e7", "_key": "persona-builder"},
    {"_type": "reference", "_ref": "9b0487c5-8a4d-4465-b79c-11b129d560a8", "_key": "persona-controller"},
]


def load_token() -> str:
    token = os.environ.get("SANITY_WRITE_TOKEN", "").strip()
    if token:
        return token
    env_path = Path(__file__).resolve().parents[1] / ".env.local"
    if env_path.exists():
        text = env_path.read_text()
        match = re.search(r"^n8n-news-writer=(.+)$", text, re.MULTILINE)
        if match:
            return match.group(1).strip()
    raise SystemExit("Set SANITY_WRITE_TOKEN or add n8n-news-writer to .env.local")


def key() -> str:
    return uuid.uuid4().hex[:12]


def span(text: str, marks: list[str] | None = None) -> dict:
    return {"_type": "span", "_key": key(), "text": text, "marks": marks or []}


def block(text: str, style: str = "normal", marks: list[str] | None = None) -> dict:
    return {
        "_type": "block",
        "_key": key(),
        "style": style,
        "markDefs": [],
        "children": [span(text, marks)],
    }


def spacer() -> dict:
    return block("")


def para(text: str, marks: list[str] | None = None) -> dict:
    return block(text, "normal", marks)


def h3(text: str) -> dict:
    return block(text, "h3")


def section_cover(number: str, title: str, intro: str) -> dict:
    return {
        "_type": "sectionCover",
        "_key": key(),
        "sectionNumber": number,
        "sectionTitle": title,
        "sectionIntro": intro,
    }


def callout(body: str, label: str = "How we do it") -> dict:
    return {"_type": "calloutBox", "_key": key(), "label": label, "body": body}


def dark_quote(body: str) -> dict:
    return {"_type": "darkQuote", "_key": key(), "body": body}


def bullet_card(items: list[str]) -> dict:
    return {"_type": "bulletCard", "_key": key(), "items": items}


def checklist_group(title: str, colour: str, items: list[str]) -> dict:
    return {
        "_type": "checklistGroup",
        "_key": key(),
        "categoryTitle": title,
        "categoryColour": colour,
        "items": items,
    }


def contrast_demo(fail_label: str, fail_text: str, convert_label: str, convert_text: str) -> dict:
    return {
        "_type": "contrastDemo",
        "_key": key(),
        "failLabel": fail_label,
        "failText": fail_text,
        "convertLabel": convert_label,
        "convertText": convert_text,
    }


def image_block(image_id: str, asset_ref: str | None) -> dict:
    meta = IMAGES[image_id]
    block = {
        "_type": "imagePlaceholder",
        "_key": key(),
        "ratio": meta["ratio"],
        "caption": meta["caption"],
    }
    if asset_ref and not asset_ref.startswith("PLACEHOLDER_"):
        block["image"] = {
            "_type": "image",
            "alt": meta["alt"],
            "asset": {"_type": "reference", "_ref": asset_ref},
        }
    return block


def page(content: list[dict]) -> dict:
    return {"_type": "guidePage", "_key": key(), "content": content}


def paragraphs(*texts: str) -> list[dict]:
    blocks: list[dict] = []
    for text in texts:
        blocks.append(para(text))
        blocks.append(spacer())
    if blocks:
        blocks.pop()
    return blocks


def api_request(url: str, token: str, data: bytes | None = None, method: str = "GET", content_type: str | None = None) -> dict:
    headers = {"Authorization": f"Bearer {token}"}
    if content_type:
        headers["Content-Type"] = content_type
    req = request.Request(url, data=data, headers=headers, method=method)
    try:
        with request.urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except error.HTTPError as exc:
        body = exc.read().decode()
        raise SystemExit(f"HTTP {exc.code} for {url}: {body}") from exc


def upload_image(token: str, path: Path) -> str:
    data = path.read_bytes()
    url = f"{BASE}/assets/images/{DATASET}"
    result = api_request(url, token, data=data, method="POST", content_type="image/png")
    doc = result["document"]
    print(f"  uploaded {path.name} -> {doc['_id']}")
    return doc["_id"]


def build_pages(image_refs: dict[str, str | None]) -> list[dict]:
    pages: list[dict] = []

    # --- Section 1 ---
    pages.append(
        page(
            [
                section_cover(
                    "1",
                    "Why this matters now",
                    "Construction companies are failing at record rates despite massive industry demand. The builders surviving this market are not just better at building. They are better at running their operations.",
                )
            ]
        )
    )
    pages.append(
        page(
            paragraphs(
                "The residential construction sector in New South Wales is operating in a deeply contradictory environment. On one hand, there is a massive pipeline of infrastructure and housing demand across the state. On the other hand, building companies are failing at an alarming rate. In a single financial year, nearly 3,000 construction businesses entered insolvency.",
                "The root cause of these failures is rarely a lack of building skill or a shortage of enquiries. The primary driver of collapse is a lack of operational control. Many building companies are running complex, multi-million dollar projects with admin methods that were never built for this level of complexity. With material costs moving constantly and compliance tightening, manual spreadsheets and a whiteboard in the site office leave too much room for mistakes.",
                "If you rely on your accountant to tell you whether a project made a profit weeks after handover, you are making decisions too late. By the time you realise the framing costs went over budget, the cash is already gone. You cannot negotiate a variation for a delay that happened a month ago. You absorb the loss and hope the next progress payment covers the shortfall.",
            )
        )
    )
    pages.append(page([image_block("img-01", image_refs["img-01"])]))
    pages.append(
        page(
            [
                h3("The trap of fragmented growth"),
                spacer(),
                para(
                    "When builders try to fix these operational leaks, they usually make a classic mistake. They buy a random piece of software to solve an immediate pain. They buy a CRM for the sales team, an estimating tool for the pre-construction team, and a scheduling app for the site supervisors. Because these tools were bought at different times and were never designed to talk to each other, the business becomes fragmented."
                ),
                spacer(),
                para(
                    "Instead of becoming more efficient, the administration team now has three different platforms to keep in sync. They copy client details out of an email, type them into the CRM, then type them again into the estimating software. That double handling guarantees errors. When one missed digit on an order can throw off a profitability forecast, the risk is not theoretical."
                ),
                spacer(),
                para(
                    "Internal Verification Note: The insolvency claims (~3,000 in one FY) and $1.14T pipeline stats are sourced from 2024 ASIC data and WT Partnership/CommBank market reports.",
                    marks=["em"],
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                dark_quote(
                    "Buying five different software subscriptions does not make you a digital business. If the tools do not talk to each other, you just created five new administration jobs."
                ),
                callout(
                    "We audited the operations of a Sydney custom builder who was drowning in paperwork despite spending heavily on software. By ripping out their redundant tools and connecting their core estimating platform directly to their accounting system, the team recovered 15 hours of administrative time per week, eliminating the data entry errors that were destroying their margins."
                ),
            ]
        )
    )

    # --- Section 2 ---
    pages.append(
        page(
            [
                section_cover(
                    "2",
                    "The front door to your business",
                    "A connected system starts before you even speak to the client. Your website and content must act as an automated sales representative that qualifies leads while you sleep.",
                )
            ]
        )
    )
    pages.append(
        page(
            paragraphs(
                "A truly connected digital ecosystem begins at the first touchpoint a homeowner has with your business. In the modern NSW market, that touchpoint is usually a digital search, not a phone call. Most buyers have hundreds of small research moments across a journey that can stretch over a year. They are looking for proof of competence, financial stability, and local expertise. If your website is a static brochure with a few photos and a contact form, you are invisible during the exact period when they are deciding who to trust.",
                "Your website must function as the highly intelligent front door to your business operations. It needs to proactively answer the questions your sales team fields every day. When a homeowner is considering a knockdown rebuild on a sloping block, they do not want to read generic marketing copy about building dreams. They want to read a detailed case study explaining exactly how you managed tight site access, navigated local council approvals, and delivered a similar project on budget.",
            )
        )
    )
    pages.append(page([image_block("img-03", image_refs["img-03"])]))
    pages.append(
        page(
            [
                h3("Capturing and routing the right data"),
                spacer(),
                para(
                    "When that educated prospect finally decides to submit an enquiry, the way your system handles their data dictates your conversion rate. The old method involves a prospect filling out a basic form, which sends an email to an unmonitored inbox. Two days later, an administrator forwards that email to a sales manager, who eventually calls the prospect back. By that time, the high-value client has already engaged a faster competitor."
                ),
                spacer(),
                para(
                    "In a connected ecosystem, the website form is highly strategic. It asks specific qualifying questions about land ownership, budget brackets, and project timelines. When the prospect hits submit, the website pushes that structured data directly into your CRM. The system automatically creates a client file, notifies the appropriate sales manager via SMS, and sends the prospect a branded guide detailing your building process."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                contrast_demo(
                    "Disconnected intake",
                    "A web form sends a basic email. A staff member manually copies the details into a spreadsheet three days later.",
                    "Connected intake",
                    "A web form instantly creates a CRM record, qualifies the budget, and sends the client a process guide automatically.",
                ),
                spacer(),
                para(
                    "This immediate, highly professional response sets the tone for the entire relationship. It proves to the client that you are organised and reliable before you even pick up the phone."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                callout(
                    "We rebuilt the digital front door for a luxury builder who was exhausted from dealing with underfunded enquiries. By implementing an automated qualification form that synced directly with their CRM, the total volume of their leads dropped slightly, but their lead-to-contract conversion rate doubled because every enquiry was financially qualified before the first meeting."
                )
            ]
        )
    )

    # --- Section 3 ---
    pages.append(
        page(
            [
                section_cover(
                    "3",
                    "The engine room of estimating and sales",
                    "The moment a prospect is ready for a quote is when most builders drop the ball. Handing over manual notes to your estimating team guarantees margin erosion.",
                )
            ]
        )
    )
    pages.append(
        page(
            paragraphs(
                "The handover from the sales pipeline into the estimating department is one of the highest-risk points in any construction business. This is where abstract client discussions turn into hard financial commitments. If your estimators are working from incomplete details, or trying to decipher muddy notes from a site visit, they will inevitably make assumptions. In construction, assumptions lead to inaccurate quotes, and inaccurate quotes lead to severe margin loss. A connected digital system ensures that this handover is rigorous, standardised, and entirely free from human transcription errors.",
                "When a sales representative marks a lead as ready for a quote in the CRM, the system should take over. The client name, contact details, site address, and initial budget parameters should flow straight into your estimating software, such as Buildxact or CostX. If an estimator has to retype this information, errors are inevitable, and they always show up later as margin loss.",
            )
        )
    )
    pages.append(page([image_block("img-02", image_refs["img-02"])]))
    pages.append(
        page(
            [
                h3("Standardising your scope and pricing"),
                spacer(),
                para(
                    "The most significant cause of budget blowouts on custom builds is a poorly defined initial scope. If your team manually builds every quote from a blank document, you are inviting inconsistency. Your connected system must utilise standardised templates linked directly to your supplier pricing databases. When a new custom home project is initiated in the software, it should automatically pull the most current material rates and standard labour allocations based on the specific design type."
                ),
                spacer(),
                para(
                    "Simultaneously, the system must maintain strict version control. If a client requests a major variation to the kitchen design, the automation must ensure that the new pricing overwrites the old data everywhere. It must update the central CRM, adjust the final contract document, and alter the projected timeline."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                bullet_card(
                    [
                        "Connect your CRM directly to your estimating software via secure APIs",
                        "Ensure approved quotes automatically generate draft budgets in accounting",
                        "Utilise standard estimating templates that pull live supplier pricing",
                        "Implement mandatory data fields so sales cannot hand over incomplete files",
                        "Automate client updates when a quote moves to the next approval stage",
                    ]
                )
            ]
        )
    )
    pages.append(
        page(
            [
                para(
                    "Every element of ambiguity you remove from this quoting process directly protects your company profit. When the estimating engine is connected to the rest of the business, you stop guessing and start engineering predictable returns."
                ),
                callout(
                    "We connected the sales and estimating platforms for a residential builder specialising in complex extensions. By forcing all sales data through an automated validation checklist before it reached the estimating team, we eliminated the constant back-and-forth emails that were previously delaying their quote delivery times by up to a week."
                ),
            ]
        )
    )

    # --- Section 4 ---
    pages.append(
        page(
            [
                section_cover(
                    "4",
                    "The control tower of financial visibility",
                    "A positive bank balance does not mean you are making a profit. You need a dashboard that shows your true margins while the project is still active.",
                )
            ]
        )
    )
    pages.append(
        page(
            paragraphs(
                "The ultimate goal of connecting your software tools is to gain absolute financial clarity. The most dangerous habit a construction business owner can develop is checking their bank account to determine the health of their company. Because of how progress payments are structured, a builder can receive a massive cash injection at the framing stage, making the bank balance look incredibly healthy. But if the costs to reach that stage were higher than estimated, or if there are massive upcoming expenses for the lock-up stage that have not yet been invoiced by suppliers, that cash does not actually belong to the builder. It is already spoken for.",
                "To survive and grow, you must transition from cash accounting to rigorous Work In Progress reporting. This requires a live dashboard that pulls data from your estimating software, your project management tools, and your accounting platform like Xero. A connected dashboard tells you the exact financial position of a project relative to its completion percentage. It is the only reliable way to know if you are actually making a profit while a build is still active.",
            )
        )
    )
    pages.append(
        page(
            [
                h3("Metrics that drive confident decisions"),
                spacer(),
                para(
                    "When builders finally get access to live data, the immediate temptation is to measure absolutely everything. They build massive screens displaying dozens of charts, which leads directly to analysis paralysis. A reporting system should not overwhelm your management team. To run a highly profitable construction firm, directors only need to review a few core metrics."
                ),
                spacer(),
                para(
                    "You must track your true cost of acquisition to ensure your marketing spend is sustainable. You must track your project margin variance to see if a job is slipping from a 15 percent margin down to 11 percent by the framing stage. Most importantly, you must track your cash flow runway."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                dark_quote(
                    "Your cash flow runway tells you exactly how many months your business can survive. When you have a solid runway, you stop taking desperate, low-margin jobs."
                ),
                para(
                    "When you can clearly see the margin variance across all your projects, distinct patterns emerge. You will quickly identify that the vast majority of your profit is likely generated by a specific type of build. Armed with this undeniable data, you can confidently turn down requests to quote on high-risk, low-margin work."
                ),
                callout(
                    "We designed a custom executive dashboard for a property developer, stripping away the visual clutter and highlighting only their acquisition costs, margin variance, and cash runway. By forcing the directors to focus on these indicators, they quickly identified that their marketing spend was skewed toward low-margin renovation leads, prompting an immediate strategic pivot."
                ),
            ]
        )
    )

    # --- Section 5 ---
    pages.append(
        page(
            [
                section_cover(
                    "5",
                    "The safety net of training and artificial intelligence",
                    "Buying an expensive system is useless if your team refuses to use it. You must digitise your operational knowledge and train your staff to follow the new rules.",
                )
            ]
        )
    )
    pages.append(
        page(
            paragraphs(
                "There is a dangerous misconception in the construction industry that deploying a new software ecosystem instantly solves all operational problems. You connect the tools, turn on the workflows, and expect the business to run flawlessly. This approach guarantees failure. A connected digital system is an operational asset that requires maintenance, discipline, and rigorous team training. The most advanced automation in the world cannot compensate for a project manager who refuses to enter data correctly in the first place. If the initial input is flawed, the automation will simply distribute that flawed data faster.",
                "The traditional method of training a new hire by telling them to shadow a senior site supervisor is deeply flawed. It passes on undocumented shortcuts and bad habits. To make a connected system work, you must extract the knowledge from your senior staff and digitise it. Your standard operating procedures must be highly visual, concise, and accessible from a mobile phone on site.",
            )
        )
    )
    pages.append(page([image_block("img-04", image_refs["img-04"])]))
    pages.append(
        page(
            [
                h3("Leveraging AI to protect your time"),
                spacer(),
                para(
                    "Once your data is clean and centralised, you can introduce artificial intelligence to act as a safety net and a productivity multiplier. AI should not be used to write fluffy marketing copy; it should be used to retrieve complex information instantly. When your business data is structured correctly within a central CRM or knowledge base, you can deploy internal AI assistants."
                ),
                spacer(),
                para(
                    "If a site supervisor needs to know the specific defect resolution protocol for a project, they can ask the internal AI rather than calling the director. If a sales manager needs to qualify a lead, an agentic AI workflow can handle the initial conversation, check the prospect against local council zoning maps, and book the calendar appointment without a human lifting a finger."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                checklist_group(
                    "System health and adoption",
                    "red",
                    [
                        "Do your staff have a digital learning path showing exactly how to use the CRM",
                        "Is your internal knowledge base accessible from a mobile phone on site",
                        "Are your standard operating procedures updated when the software is upgraded",
                        "Do you actively monitor if staff are reverting to manual spreadsheets",
                    ],
                ),
                para(
                    "However, you must maintain strict security boundaries. Feeding sensitive client financial data or proprietary floor plans into public AI tools is a massive regulatory breach. Your AI solutions must be private, enterprise-grade systems hosted onshore in Australia to comply with the Privacy Act."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                callout(
                    "We migrated a commercial contractor away from physical safety manuals into a secure, mobile-friendly digital library. By replacing pages of dense text with clear flowcharts and short video demonstrations on how to use their new project management software, the site teams achieved full system adoption within a month."
                )
            ]
        )
    )

    # --- Section 6 ---
    pages.append(
        page(
            [
                section_cover(
                    "6",
                    "The non-negotiables for handling client data in NSW",
                    "When you connect all your software platforms, you create a highly attractive target for cyber threats. Security is a board-level priority.",
                )
            ]
        )
    )
    pages.append(
        page(
            [
                para(
                    "Disclaimer: This is general information. Builders should verify their specific compliance obligations directly with NSW Fair Trading and the ACCC.",
                    marks=["em"],
                ),
                spacer(),
                para(
                    "The construction industry has become a primary target for sophisticated cyber attacks. Builders handle large amounts of money and maintain extensive databases containing sensitive client financial information, subcontractor bank details, and proprietary estimating formulas. When you architect a connected system that pulls data from a website, pushes it through a CRM, and feeds it into an accounting dashboard, you are building digital pipes across the internet. If your reporting infrastructure is insecure, you are exposing your business to devastating financial theft and severe regulatory penalties."
                ),
                spacer(),
                para(
                    "A secure digital environment begins with controlling exactly who has access to your data. You cannot provide every employee with universal administrative rights to your entire software stack. A junior estimator needs to see the material cost variance for their specific project; they do not need to see the overall net profit of the entire company or the director's dividend reports. Implementing strict, role-based access control is the absolute baseline of digital security."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                h3("Data sovereignty and encrypted connections"),
                spacer(),
                para(
                    "You need to understand the technical pathways your data takes when it moves between your systems. If you use cheap, unverified third-party integration tools to move financial data from your estimating platform to your reporting screen, you may be passing sensitive information through unsecured servers located overseas. That is a major compliance risk. Your architecture should rely on enterprise-grade, encrypted connections, and your data storage should ideally be located onshore within Australia to align with local privacy requirements."
                ),
                spacer(),
                para(
                    "Furthermore, every user accessing your connected system must be mandated to use Two-Factor Authentication. Passwords are routinely compromised in broader internet data breaches. If a hacker acquires a project manager's password, two-factor authentication ensures they still cannot access your financial dashboards without physical possession of the manager's mobile phone."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                callout(
                    "We audited the new software infrastructure of a residential developer and discovered they were sharing a single, unencrypted login credential across their entire management team. We immediately restructured their access protocols, implemented mandatory Two-Factor Authentication, and ensured their live financial data was strictly compartmentalised based on individual job roles."
                )
            ]
        )
    )

    # --- Section 7 ---
    pages.append(
        page(
            [
                section_cover(
                    "7",
                    "Why now",
                    "The NSW building sector is tightening. Running a multi-million dollar construction firm without connected operations is a luxury you can no longer afford.",
                )
            ]
        )
    )
    pages.append(
        page(
            paragraphs(
                "The construction industry in New South Wales is currently navigating a highly volatile period. While there is a documented housing shortage driving long-term demand, the immediate reality for builders is defined by tightened lending, cautious consumers, and intense competition for high-quality projects. The days of relying on a booming market and easy credit to hide administrative inefficiencies and margin erosion are ending. When economic pressure mounts, profit margins become razor-thin. You simply cannot afford to pay for the rework, the wasted administrative hours, and the unforeseen material cost spikes that stem from operating blindly across disconnected software.",
                "Your operational efficiency and your ability to forecast cash flow accurately are the battlegrounds for the coming years. If your business relies entirely on delayed accounting reports to tell you if you made money last month, your capacity to survive an economic shock is severely compromised. You become dependent on the next progress payment to stay afloat, which creates a cycle of high-stress survival.",
            )
        )
    )
    pages.append(
        page(
            [
                h3("The permanent competitive advantage"),
                spacer(),
                para(
                    "The cost of inaction is severe. As acquisition costs and material prices rise, the gap between builders with solid, connected reporting and those without it grows quickly. The builders who dominate the market in 2026 will treat their data architecture and digital ecosystems as critical infrastructure. With connected tracking, decisions are based on facts, not guesswork. You can spot margin slip on day three of a build, not day thirty. You can adjust marketing spend faster, and you can protect the margin you priced the job on."
                ),
                spacer(),
                para(
                    "If you keep running multi-million dollar projects using isolated spreadsheets, messy site notes, and gut instinct, you will end up competing on price and chasing low-margin work that better-run businesses avoid. Fixing your operational systems is no longer an optional admin upgrade. It is a requirement for survival."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                callout(
                    "We partner with NSW builders to extract their operational data and rebuild their digital architecture before the economic squeeze impacts their profitability. By deploying structured, real-time digital ecosystems, we ensure they remain highly efficient, highly profitable, and entirely scalable, regardless of broader market volatility."
                )
            ]
        )
    )

    # --- Section 8 ---
    pages.append(
        page(
            [
                section_cover(
                    "8",
                    "How we build it",
                    "We do not just sell software subscriptions. We engineer structured data pipelines that extract the truth from your operations and protect your profit margins.",
                )
            ]
        )
    )
    pages.append(
        page(
            [
                para(
                    "Our approach to building connected digital ecosystems for the construction sector is entirely driven by data accuracy and operational decision-making. We strip away the technical jargon and focus exclusively on the mechanics of connecting your specific tools so your management team has total clarity."
                )
            ]
        )
    )
    pages.append(page([image_block("img-05", image_refs["img-05"])]))
    pages.append(
        page(
            [
                h3("1. Operational bottleneck audit"),
                spacer(),
                para(
                    "Before we design a single integration, we map your business to identify where the data silos exist. We find the points where staff manually copy numbers between systems, then we prioritise automating those connections to protect data integrity."
                ),
                spacer(),
                h3("2. Architecture and integration"),
                spacer(),
                para(
                    "We do not ask your accountants to change how they work. We build secure digital pipelines via APIs to pull live data from your website, CRM, estimating software, and accounting platforms. This creates a clean flow of information across the entire business."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                h3("3. Front-end content structuring"),
                spacer(),
                para(
                    "We engineer your website and content to serve as an automated sales engine. We ensure it answers client questions, qualifies leads financially, and feeds structured data directly into your newly integrated CRM system."
                ),
                spacer(),
                h3("4. Secure central deployment"),
                spacer(),
                para(
                    "We refuse to let financial data sit exposed. We deploy dashboards and AI tools in secure onshore Australian cloud environments, with strict role-based access and two-factor authentication to support privacy compliance."
                ),
            ]
        )
    )
    pages.append(
        page(
            [
                h3("5. Management training and measurement"),
                spacer(),
                para(
                    "A live system is just the beginning. We help you design the weekly routines needed to use the data. We digitise your standard operating procedures and set the specific metrics directors review every Friday, refining the system as the business grows."
                ),
                callout(
                    "We execute this exact five-step process for every building client we take on. By controlling the data architecture, the visual formatting, and the secure deployment, we deliver a final product that stops the endless guesswork and turns your construction firm into a highly predictable financial machine."
                ),
            ]
        )
    )

    # --- Section 9 ---
    pages.append(
        page(
            [
                section_cover(
                    "9",
                    "Run this against your current setup",
                    "Run this brutally honest assessment of your current business systems to see exactly where you are losing operational visibility.",
                )
            ]
        )
    )
    pages.append(
        page(
            [
                para(
                    "Use this diagnostic tool to assess the real state of your reporting and data. If you fail these baseline checks, the lack of connected systems is already damaging your profitability."
                )
            ]
        )
    )
    pages.append(
        page(
            [
                checklist_group(
                    "Visibility and lead tracking",
                    "red",
                    [
                        "Does your website form automatically create a qualified record in your CRM",
                        "Do you rely on end-of-month accounting reports to know if a project is profitable",
                        "Can your directors instantly see the true cash runway for the business on their phones",
                        "Do you definitively know your true cost to acquire a signed building contract",
                    ],
                )
            ]
        )
    )
    pages.append(
        page(
            [
                checklist_group(
                    "Software and integration",
                    "gold",
                    [
                        "Does your estimating software push approved budgets directly into your accounting platform",
                        "Are staff manually exporting spreadsheets to move data between different departments",
                        "Is your project scheduling tool synced with your financial reporting system",
                        "Do you have a single source of truth for all project-related expenditures",
                    ],
                )
            ]
        )
    )
    pages.append(
        page(
            [
                checklist_group(
                    "Security and compliance",
                    "black",
                    [
                        "Is your financial reporting data stored securely on servers located within Australia",
                        "Do you enforce Two-Factor Authentication for all staff accessing business metrics",
                        "Is your system access strictly restricted based on employee job roles",
                        "Are you certain your data integration methods comply with the Privacy Act",
                    ],
                ),
                spacer(),
                para(
                    "Tally your unchecked boxes. Every missing element is a point where you are relying on manual effort to manage an operational risk that a connected system should handle automatically."
                ),
            ]
        )
    )

    return pages


def build_guide_doc(pages: list[dict], doc_id: str) -> dict:
    return {
        "_id": doc_id,
        "_type": "guide",
        "title": "How to stop running your building company on sticky notes and spreadsheets",
        "subtitle": "A practical guide to building a connected digital ecosystem that runs your NSW construction business for you.",
        "slug": {"_type": "slug", "current": "how-to-build-connected-construction-ecosystem"},
        "servicePillar": ["Automation"],
        "businessPhase": "All Phases",
        "coverLegend": "For NSW custom builders who are tired of disconnected software and manual admin",
        "targetPersonas": PERSONA_REFS,
        "includeCtaPage": True,
        "ctaTitle": "Ready to fix this?",
        "ctaDescription": "Book a call and we will walk you through how this applies to your building company.",
        "ctaButtonText": "Book a call",
        "ctaLink": "https://sysbilt.com/contact",
        "ctaLegend": "We do not upsell. We do not surprise you with hidden costs.",
        "seoTitle": "Construction Business System Automation NSW",
        "seoDescription": "Stop losing money to disconnected software. A practical guide for NSW builders to connect their website, CRM, estimating, and accounting into one system.",
        "focusKeyword": "construction business automation sydney",
        "pages": pages,
    }


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--json-out", help="Write guide document JSON to this path and exit")
    args = parser.parse_args()

    if args.json_out:
        pages = build_pages({image_id: None for image_id in IMAGES})
        guide_doc = build_guide_doc(pages, doc_id=f"drafts.{uuid.uuid4()}")
        Path(args.json_out).write_text(json.dumps(guide_doc, indent=2))
        print(f"Wrote {args.json_out} ({len(pages)} pages)")
        return

    token = load_token()
    doc_id = f"drafts.{uuid.uuid4()}"

    print("Uploading images...")
    image_refs: dict[str, str] = {}
    for image_id, meta in IMAGES.items():
        path = ASSETS_DIR / meta["file"]
        if not path.exists():
            raise SystemExit(f"Missing image: {path}")
        image_refs[image_id] = upload_image(token, path)

    pages = build_pages(image_refs)
    print(f"Built {len(pages)} A4 pages")

    guide_doc = build_guide_doc(pages, doc_id)

    mutation_url = f"{BASE}/data/mutate/{DATASET}"
    payload = json.dumps({"mutations": [{"create": guide_doc}]}).encode()
    result = api_request(
        mutation_url,
        token,
        data=payload,
        method="POST",
        content_type="application/json",
    )
    print(json.dumps(result, indent=2))
    print(f"\nDraft created: {doc_id}")
    print("Open Sanity Studio -> Guides -> filter drafts to review and publish.")


if __name__ == "__main__":
    main()
