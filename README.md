# Dizplai Coding Challenge

## Requirements 

### Polls can haveween 2 and 7 options
- This is enforced using Zod on the API endpoint
- There was an attempt to enforce it at the database level, but I don't think you can do a CHECK that references other columns

### The website should be responsive
- Tailwind allows this, though I've not actually implemented multiple breakpoints

### Polls and votes should be stored in a database of some sort
- An sqlite database is being used, stored in `./.data/db.sqlite3`
- Migration scripts are in `./server/database/migrations`, generated via Drizzle (an ORM)

### New polls should be created through an API
- A RESTful API is available on `/api/polls`, for POSTing 

### An API should be available to view individual votes for a given poll and the time the vote was made
- An endpoint is available at `/api/polls/:pollId/votes`, it will give this 

### There should be an example of how you would test front and backend code.
- There are database tests in `./server/database/database.test.ts` 
- There is a frontend component test in `./components/SubmitButton.test.ts`
- There is a page test in `./pages/polls/[id].test.ts`, however it doesn't work yet.
- It would also be quite trivial to add tests to the frontend using Playwright/Cypress etc

### A README should be provided explaining how to run any code to allow us to test the solution
- You're looking at it! 