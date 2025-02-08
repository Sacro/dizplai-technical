const paramSchema = z.object({ id: z.string() })

// Get the number of votes for a given poll ID
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramSchema.parse)

  return useDrizzle().query.votes.findMany({
    columns: {
      id: true,
      timestamp: true,
    },
    where: eq(tables.votes.poll_id, id),
  })
})
