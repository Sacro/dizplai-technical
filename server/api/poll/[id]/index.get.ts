const paramSchema = z.object({ id: z.string() })

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramSchema.parse)

  const poll = await useDrizzle().query.polls.findFirst({
    columns: {
      question: true,
    },
    where: eq(tables.polls.id, id),
    with: {
      responses: {
        columns: {
          id: true,
          response: true,
        },
      },
    },
  })

  if (poll === undefined) {
    throw createError({
      statusCode: StatusCodes.NOT_FOUND,
      statusMessage: 'No poll found',
    })
  }

  return poll
})
