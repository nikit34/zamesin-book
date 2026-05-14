---
title: "Introduction to Advanced Jobs To Be Done"
slug: introduction-to-advanced-jobs-to-be-done
book: Advanced Jobs To Be Done
bookSlug: advanced-jobs-to-be-done
part: 1
partTitle: "Foundations"
chapterNumber: 1
author:
  name: "Ivan Zamesin"
  avatar: "/avatars/ivan.jpg"
contributors:
  - "Anna K."
  - "Daniel L."
  - "Mark Reeves"
  - "Sarah Chen"
  - "Tomás Reyes"
status: published
publishedAt: 2026-05-14
---

Jobs To Be Done is a beautiful and powerful theory. But what is the point of theory if it does not let you make better decisions?

Five years ago I started a long, private investigation. How exactly does a product create value? How do practitioners decide what to build and what to drop? How do customers' needs become a graph of work — and how does that graph become a strategy you can defend in front of a board? The answers had to be operational, not philosophical. They had to survive contact with a Monday-morning roadmap.

This chapter introduces the result of that investigation. Advanced Jobs To Be Done — AJTBD — is the methodology I built from the field. It is JTBD's core plus the missing apparatus: principles of decision-making, tools for finding and ranking segments, a logic for qualitative and quantitative research, the **work graph** as a unit of analysis, an algorithm for creating value, an algorithm for solving business problems, and an algorithm for communicating the product.

> **Who this chapter is for**
>
> - You know JTBD and you are looking for a way to apply it to your day-to-day product decisions.
> - You want to understand how to create value, not just talk about it.
> - You have heard of AJTBD and want to see what it actually contains.

## Everyone says "create value" — nobody explains how

Walk into any startup meetup in San Francisco, Lisbon, or Berlin and you will hear the same advice. *Create more value. Find your unfair advantage. Articulate your UVP.* The advice is correct. The instructions are missing.

Founders and PMs rarely understand the causal chain that runs underneath those phrases. Needs become work. Work becomes a choice of solution. The chosen solution becomes — or fails to become — value. Skip a link and the rest of the chain breaks.

<!-- gallery -->
::: gallery [layout="row" caption="The chain everybody talks about, almost nobody can draw"]

![Need → Job → Solution → Value: the chain almost nobody can draw](https://zamesin.ru/producthowto/book/content/images/2025/01/1_1.png "An important causal chain that very few people understand")

![The fog that follows: most makers can't see how value is built](https://zamesin.ru/producthowto/book/content/images/2025/01/1_2.png "Most product builders have no clear model of how value is created — which is a source of permanent frustration")

![Why it matters: value isn't decoration, it's the product](https://zamesin.ru/producthowto/book/content/images/2025/01/1_3.png "Although it is one of the most important questions in the field")

:::

When the chain is invisible, the decision is a guess. When the chain is visible, the decision is a calculation.

> **Skeptic:** *Hold on. "An algorithm for value" sounds like a slogan, not a thing. Algorithms work for problems that are well-defined. Customer behavior is not well-defined. You're going to sell me a checklist and call it a method.*

The Skeptic is not wrong to be suspicious — there are a hundred frameworks out there and most of them collapse on first contact with a real customer. The question is not whether the algorithm is precise. The question is whether the algorithm narrows the search space enough that a small team can ship a defensible decision in two weeks instead of two quarters. By the end of this chapter, you can decide for yourself.

## The work graph

The first object you need is the **work graph**. Every other moving part of AJTBD attaches to it.

> The work graph is a hierarchy of jobs a person performs in order to satisfy their needs.

Take any non-trivial job and decompose it. *Buying an apartment* breaks down into *finding the apartment, securing financing, signing the contract, renovating, moving in.* Each of those breaks down again. *Renovating* contains *picking a contractor, choosing materials, surviving the contractor, surviving your partner, signing off on the final inspection.* The graph has many levels. Edges are many-to-many. A single lower-level job (*surviving the contractor*) can serve more than one higher-level job (*renovating*, *staying married*).[^math]

[^math]: I want to be precise — "graph" here is the mathematical term, not the British aristocracy.

The real graph that any customer is walking through has two parents. The first is the way the people who built the solutions in their world structured those paths. The second is the choices the customer makes inside that structure. Real graphs are messy. The job of an AJTBD practitioner is to look at the mess and identify the **critical sequence** — the small subgraph that decides whether the customer becomes a paying customer or walks away.

![A work graph has many nested levels. The interesting product decisions live two or three levels below where teams usually look.](https://zamesin.ru/producthowto/book/content/images/2025/01/3_3.png "A graph can have many nested levels — most teams stop one level above the action")

Out of the hundreds of jobs a person performs in a year, only a handful matter for any given product. A developer building an apartment complex does not need to understand the buyer's entire life. They need to understand the critical sequence around *buying → renovating → moving in*. That is the slice of the graph where value will be either created or destroyed.

![Even when the entire graph is enormous, only a critical sequence — buying, renovating, moving in — decides whether the developer wins this customer.](https://zamesin.ru/producthowto/book/content/images/2025/01/3_5.png "From the customer's entire work graph, only the critical sequence of buying, renovating, and moving in may be valuable for the focus segment")

## What is value

> "What is the value of a product and how do I create it?" is one of the questions any product builder has to be able to answer cold. Most can't.

The economist's answer is a clean equation:

```
value = benefit − investment
```

Pleasant, symmetric, and not yet enough. The equation tells you the *shape* of value but not the *substance*. Substance has to come from somewhere else — from how the brain actually decides what is worth doing.

For that we owe a debt to Lisa Feldman Barrett.

<aside class="scholar-quote">

<p>The brain's most important job is not thinking. It is managing the body's energy budget — water, oxygen, glucose, salt, dopamine, every resource it has on hand. The brain spends those resources like an investor: it puts X in now in order to harvest 3X later, when a predicted goal pays out.</p>

<cite>Lisa Feldman Barrett · <em>Seven and a Half Lessons About the Brain</em> · 2020</cite>

</aside>

Lay that idea over the work graph and the substance of value clicks into focus.

> **Value is performing the customer's jobs in a more energy-efficient way.**

"More energy-efficient" is shorthand for a longer claim. A solution creates value when, from the brain's perspective, the predicted return on investing time/money/attention/effort is higher with that solution than with any other available solution. When the brain's *prediction* of return is more reliable, even the same amount of work feels lighter, because uncertainty is itself an investment.

This is also where the word *problem* finally earns its definition.

> **A problem is a prediction error in the brain's model.** The customer expected the job to complete and it didn't, or completed worse than predicted, or cost more than predicted. The mismatch isn't merely annoying. It is, neurochemically, a tax — a small forced investment of extra resources the brain did not budget for.

Hold those two ideas next to each other — value as energy efficiency, problem as prediction error — and the next move is obvious.

## How value flows from the graph

If you overlay the brain's drive for energy-efficient job performance on the work graph, you get a small, surprising conclusion:

> Every successful product decision ever made can be explained as an optimization of a customer's work graph.

I know how that sounds. I would not have believed it before I sat with the work-graph drawings of about a hundred companies. So let me show you, with a concrete walk through one industry that you have used a thousand times: the gas station.

::: gallery [layout="strip" caption="How a roadside fuel pump became a small grocery store, in eight steps"]

![Cover: how a roadside fuel pump became a small grocery store](https://zamesin.ru/producthowto/book/content/images/2025/01/4_1.png "01 — From a fuel pump to a roadside supermarket: the whole story comes out of the customer's work graph")

![The driver: heading to Saint Petersburg, wants coffee and a full tank](https://zamesin.ru/producthowto/book/content/images/2025/01/4_2.png "02 — A driver heading from Moscow to Saint Petersburg with two jobs in mind: a full tank and a strong coffee")

![Predictions: brain forecasts the value, cost, and side-jobs at the favorite station](https://zamesin.ru/producthowto/book/content/images/2025/01/4_3.png "03 — The brain predicts value, costs, and the small sub-jobs the driver will perform at their favorite station")

![The shortfall: no fuel — prediction error + tax-jobs spike](https://zamesin.ru/producthowto/book/content/images/2025/01/4_4.png "04 — The station is out of the right fuel: unmet job + prediction error + tax-jobs the driver never wanted")

![Mechanic 1 — repair the problems](https://zamesin.ru/producthowto/book/content/images/2025/01/4_5.png "05 — Mechanic 1: repair the problems. Same job, fewer prediction errors")

![Two jobs, one stop: fuel and coffee](https://zamesin.ru/producthowto/book/content/images/2025/01/4_6.png "06 — The driver wants to refuel and grab coffee, two jobs that used to require two stops")

![Mechanic 2 — combine multiple jobs on the same solution](https://zamesin.ru/producthowto/book/content/images/2025/01/4_7.png "07 — Mechanic 2: serve more than one job with the same visit — total investment goes down")

![Mechanic 3 — simplification = killing sub-jobs = positive prediction error](https://zamesin.ru/producthowto/book/content/images/2025/01/4_8.png "08 — Mechanic 3: simplification = killing sub-jobs = positive prediction error = a small hit of dopamine on the way out")

:::

The progression looks small per step. The aggregate is the difference between a 1980s gas pump and a Wawa. None of the moves were invented by accident. Each one was a specific transformation of the customer's work graph.

Compress the gallery into three sentences and you have the kernel of the methodology:

> *Simpler, easier, more convenient — these are always, underneath, the killing of sub-jobs.*

This single sentence is the central mechanic of value creation. Almost every other mechanic — fixing problems, combining jobs, dropping costs, taking work off the customer's hands, stepping up to the next job, stepping back to the previous one — lives downstream of it.

### The mechanics of value, in two lists

Twenty-some named mechanics survived field testing. They split cleanly into a base layer and a combination layer.

**Base mechanics**

- Start performing a job that nobody currently performs.
- Fix the problems on jobs that are already being performed.
- Perform more jobs with one solution.
- Kill jobs outright — make them disappear from the graph.
- Compress the time between sequential jobs.
- Lower the cost of the job without removing any of its work.

**Combined mechanics**

- Step out to the next higher-level job.
- Take the job off the customer's hands entirely.
- Split the benefit and deliver part of it earlier.
- ...and at least a dozen more, each of which is a precise rearrangement of the graph.

### The three-step algorithm

Once you have the mechanics, value creation becomes a procedure rather than a guessing game:

1. Map the work graphs of your focus segments, including the problems they hit and the expectations they bring.
2. Generate hypotheses about which mechanics could plausibly apply to those graphs.
3. Rank the hypotheses by three filters:
   - jobs higher in the graph beat jobs lower;
   - jobs inside the critical sequence beat jobs outside it;
   - jobs inside the critical sequence that are performed worst — and where you see the biggest drop-off — beat the rest.

The output is a short, defensible list of value-creating moves. That list is what you take into your next planning session.

## Solving business problems with the graph

Value-creation algorithms are necessary but not sufficient. A business does not pay you to create value in the abstract; it pays you to move a number. Conversion. Retention. Average ticket. Win rate. AJTBD layers a second algorithm on top, for picking which graph moves will close a specific business problem.

The structure is similar — find the point of growth, hypothesize which segments and which mechanics, research what is actually true, then choose. The interesting part is the move-set. Four examples make it concrete.

::: gallery [layout="grid" columns="2" caption="Four moves on the work graph that solved a measurable business problem"]

![Aviasales — step back to the previous job](https://zamesin.ru/producthowto/book/content/images/2025/01/5_1.png "Aviasales — stepped back to the previous job: find the cheapest flight, then hand off to ticket sellers")

![Domklik / Sberbank — own the search to feed the loan](https://zamesin.ru/producthowto/book/content/images/2025/01/5_2.png "Domklik / Sberbank — solved calculate-the-loan-and-find-the-apartment, then fed qualified leads into the mortgage funnel")

![LiFT (Anastasia Gusentsova) — step up to the higher job](https://zamesin.ru/producthowto/book/content/images/2025/01/5_3.png "LiFT — took the higher-level job 'build my personal brand' entirely off the customer's hands")

![Yandex Taxi — shift to an adjacent segment](https://zamesin.ru/producthowto/book/content/images/2025/01/5_4.png "Yandex Taxi — laddered from economy to comfort to premium, each tier inheriting the graph of the one below")

:::

Read each card as: *here is the business problem, here is the work-graph move, here is the result.* The moves are not magic. They are repeatable instances of named mechanics. That is the whole point. **Innovation is the application of value-creation mechanics combined with product strategy — which is to say, innovation is an algorithm.**

## The bridge to the field: AJTBD interviews

Theory without a way to test it against the customer is a hobby, not a method. Classical JTBD has a famous gap right here: it gives a beautiful theoretical structure but not a reliable interview that produces actionable customer truth. AJTBD's contribution to closing this gap is a specific guide for **AJTBD interviews** — thirty to sixty minutes, learnable in roughly ten hours of practice, designed to surface the customer's actual jobs and prediction errors rather than their post-hoc rationalizations.

A typical interview opens with a recall move written as a code template the interviewer reads aloud and adapts to the customer's situation:

```
I want to {verb} {object} {qualifier}
        so that {higher-level outcome}.
```

For example:

```
I want to refuel my car on the way to Saint Petersburg
        so that I don't run out before the next station.

I want to grab a hot coffee while I'm at the pump
        so that I stay awake for the drive.
```

The verb-first phrasing forces the customer to describe work, not opinions. The qualifier and the *so-that* clause expose the higher-level job. Stack a dozen of these templates next to each other and the critical sequence appears.

::: callout [variant="operational"]

### Operational consequences

- Stop running `Why do you use our product?` interviews. They generate rationalizations, not jobs.
- Replace them with `I want to {verb}` templates that fix the grammar of the conversation.
- Bring a work-graph diagram into the interview. Update it live. The diagram is the artifact you ship to the team, not the transcript.
- Budget ten hours of practice before you trust the first set of interviews — the early ones are training data for the interviewer, not the customer.

:::

## How AJTBD relates to the rest of your toolkit

A short tour. None of this replaces what you already use; AJTBD plugs in.

- **CJM** becomes a projection of the work graph onto a timeline — a *Customer Journey on steroids*. The journey is the critical sequence drawn left-to-right.
- **ICP / persona** stays useful for sketching the customer at the table, but jobs and prediction errors give you the part the persona never could: what the customer is actually doing on Monday morning.
- **WTP** — *willingness to pay* — slots in cleanly. Once you can name the value you've created on a specific job, WTP is how the customer prices that value.
- **AAARRR funnel.** Each stage maps onto a job-level move: *Awareness* fights for the consideration set, *Acquisition* lives or dies on graph fit, *Activation* depends on resolving the critical sequence, *Retention* runs on continued value delivery and on viral side-jobs.
- **Unit economics** points you at the point of growth. AJTBD provides the move that closes it.
- **ABCDX segmentation** (and Sean Ellis–style segmentation) combine with job-based segmentation; the combination gives you both *who pays* and *what work they actually need done.*
- **UX** is, in this vocabulary, the surface application of three or four base mechanics — kill jobs, fix problems, take work off the customer, and step to the next job. Done well, UX is the visible end of the work-graph move.

## Boundaries: where AJTBD stops working

AJTBD is built on interviews and surveys. Interviews and surveys assume the customer can describe what drives their behavior. In the cases where they cannot, the method begins to lie — and an honest method should say so.

Cases where AJTBD weakens:

- **Addictive products** — social feeds, pornography, gambling, alcohol, narcotics. The customer's stated jobs and their actual reinforcement loops diverge.
- **Trauma-driven behavior** — irrational action downstream of psychological injury. Surveys cannot reach the cause.
- **Deep creative motivation** — the developmental phase in which a person needs to create something for its own sake. The "job" framing is too shallow.
- **Status, mate-seeking, and other strong, unconscious drives.** People rationalize these for the camera; the work graph the interview reveals will not be the real one.

Outside those zones, AJTBD is conservative on purpose. It tells you what it knows, and it tells you where it stops.

---

### Where the next chapter goes

We will spend Chapter 2 inside the work graph itself: types of jobs and their properties, frequency, sequences, viral side-jobs, the rules that govern how the graph is constructed, and the consideration set. By the end of Chapter 2 you will have the vocabulary to draw your own product's graph on the back of a napkin and find at least one mechanic worth a sprint.

If you want a place to start before then, pick a product you've used in the last week and try to write down its critical sequence as a list of three to five `I want to {verb}` templates. Notice which one you can't write cleanly — that is where the graph is hiding.
