const paramSchema = z.object({ id: z.string() })

// Cast a vote against a given response-id
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramSchema.parse)

  const [vote] = await useDrizzle().transaction(async (tx) => {
    const response = await tx.query.responses.findFirst({
      where: eq(tables.responses.id, id),
    })

    if (response === undefined) {
      throw createError({
        statusCode: StatusCodes.NOT_FOUND,
        statusMessage: 'No response found',
      })
    }

    return tx.insert(tables.votes).values({
      response_id: response.id,
      poll_id: response.poll_id,
    }).returning()
  })

  setResponseStatus(event, StatusCodes.CREATED)
  return vote.id
})
