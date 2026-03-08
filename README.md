# Running the FloSports Event Explorer

## Run the following command from the root directory:
```
: npm run start
```
After that, navigate to http://localhost:4200 in a browser.


# Assumptions

## What wasn't explicit in this PRD that you had to decide on your own?

1. [backend] Searching for events by text input for title could use fuzzy logic.  It's more than likely a user wouldn't know the full exact title  or an event, and would more likely use keywords such as "football" or "NFL Bears".  With multiple search terms, it's reasonable to assume the user is looking for all within the same title.  The PRD does not explicitly state how the text search should be handled, but this sounds reasonable.
2. [frontend] The Sport dropdown allows the user to filter by sport, but does not specify real-time handling of new sports events.  For the purposes of this demo, I'll work with the static list of events provided, however in a real-world production environment, the "Select a sport" dropdown should display a dynamic list of sports based on all real-time events past, present, or future.


# API Design

## How did you design the API? What are the endpoints, and why did you structure them that way?

I decided to structure the endpoints as follows:

<code>/events</code> - Returns a list of aggregated events that fulfill the search criteria.  All query parameters are optional and include:
```
  live - Returns only the events whose status is "live".
  sport - Returns only the events that match the given sport.
  search - Text-based keyword search against the title of the event.
```

<code>/event/{:id}</code> - Returns an aggregated event given the event id, or 404 if not found.  Making the id part of the URL rather than a query parameter seemed either/or to me.

<code>/sports</code> - Returns a unique sorted list of sports given the static events catalog.

This made the most sense to me for separation of concerns and clear scope and responsibilities of each API.


# Data Loading & Merging

## How do you load the two data sources?

For the purposes of this project, I created a basic in-memory "database" of the two data source JSON files.  Each one is created as a singleton NestJS Injectable and added as a data provider to the dependent modules.  The data is read once from the file and a map of ID to data object is also created for quicker lookup of events and live stats.

## How and where does the merge happen?

My merging logic happens in the <code>EventsService</code>.  The <code>event</code> and <code>events</code> endpoints both leverage this service, and the service internally aggregates the live stats for events that are live.

## What would change if these were real upstream HTTP services instead of files?

Depending on the architecture, the backend would either fetch the latest events and live stats from an API, or access a true database like PostgreSQL or DynamoDB.  For the purposes of this project, I modeled the data after a database that was accessed directly.


# Backend Decisions

## How did you structure the NestJS service?

* I put the provided assets (i.e. events.json and live-stats.json) in the <code>assets</code> folder which is copied to the <code>dist</code> folder via the nest-cli.json config.

* I defined strong interface types for the event and live-stats objects as well as an aggregate event and in-memory database in the <code>data</code> folder.

* The three APIs I defined each have their own folders with associated controlers and modules.

## How does the filtering work?

The filtering works via the <code>Events</code> API.  The three filter choices (a boolean for considering live-only events, the selected sport, and search keywords) are passed as query parameters to the API.  The <code>findAll</code> method of the <code>EventsService</code> is responsible for filtering the events and merging the two data sources.

# Trade-offs

## What did you prioritize and what did you skip?

I prioritized the hard requirements, i.e. the Technical Expectations according to the document.  I wanted to use NX for the monorepo workspace, but I was having some technical issues adding an Angular project to it and decided to go the simple route just for the sake of completing the the project.  I have no prior NestJS or NX experience.

From there my approach was...

1. Get the basic backend APIs working first so I could test them in the browser.
2. Building out a frontend that matched the desired UI without any wiring.
3. Wire the frontend and backend.
4. Test an optimize where possible.

## What would you add with another 2 hours?

There are a lot of things I was thinking about while working on this.  Some things include:

* Pagination of results.  There are 5000 static events, but more than likely there would be a whole lot more in production across 25+ sports each with historical, present, and future events.  I believe a proper API would allow the client to paginate the results to only get so many events at a time.  That also leads into...
* Virtualization of results.  Even if we have 100 events in a single page of paginated results, the user won't be able to see details on all 100 events in the UI.  That's where it might be beneficial to add a virtual container that renders only the DOM elements needed to show a current "visual" page of data.  Rendering too many DOM elements can slow down the browser or lead to low resources.
* Add debouncing logic to the search text field so we don't execute a search for every keystroke.
* There is currently no way to clear the selected sport.  The requirements mentioned that the filter bar needs to be an exact match.  I would discuss this with the UX designer on how best to handle this scenario also considering a mobile-first UX.
* Flesh out unit tests and add E2E tests.  For the purposes of this project, I chose a few backend APIs to write unit tests for, but ideally all backend business logic and all frontend UI would have associated unit or E2E testing.  I skipped the unit tests for the <code>Events</code> API, but the ones I did add were done with the help of Copilot.
* Handle localization on the frontend.  Currently the text strings are hard-coded in English (US), but a production-quality UI would be able to handle localization (l10n) and internationalization (i18n).
* Ensure the UI is fully accessible with the appropriate ARIA labels and such.



# AI Tools

## Did you use AI assistants? What for?

I used Copilot extensively, including:

1. Helping me get a NestJS backend created and configured, as well as attempting an NX workspace (I have no prior experience with either technology).  It turns out I had some technical difficulties creating an Angular frontend project with NX due to some issue with Angular and Typescript, so in the interest of time I went with the <code>concurrently</code> route (which I also have never used before, but there's a first time for everything).
2. Helping me resolve CORS errors properly when making calls from my local frontend to my local backend.
3. Auto-completion of business logic and import statements.
4. Creation of the Angular UI to match the specified requirements.
5. Creation of unit tests.

## Was there anything they got wrong that you had to fix?

Yes, there were a few times when it generated code that caused build errors, or in one case the wrong status for an event "scheduled" instead of "upcoming".  But most of the things that needed to be fixed were minor compared to the advantages of leveraging the tool.  In some cases I was able to provide more detailed prompts about the errors and the AI was able to fix itself.
