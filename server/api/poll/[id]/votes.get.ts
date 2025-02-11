const paramSchema = z.object({ id: z.string() })

// Get the number of votes for a given poll ID
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramSchema.parse)

  return useDrizzle()
    .select({
      response_id: tables.votes.response_id,
      response: tables.responses.response,
      votes: count(tables.votes.id),
    })
    .from(tables.polls)
    .innerJoin(tables.responses, eq(tables.polls.id, tables.responses.poll_id))
    .leftJoin(tables.votes, eq(tables.responses.id, tables.votes.response_id))
    .where(eq(tables.polls.id, id))
    .groupBy(tables.votes.response_id)
})
