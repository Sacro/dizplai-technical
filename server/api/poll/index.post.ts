const bodySchema = z.object({
  question: z.string(),
  responses: z.array(z.string()).min(2).max(7),
})

export default defineEventHandler(async (event) => {
  const { question, responses } = await readValidatedBody(event, bodySchema.parse)

  const poll = await useDrizzle().transaction(async (tx) => {
    const [poll] = await tx.insert(tables.polls).values({
      question,
    }).returning()

    await tx.insert(tables.responses).values(responses.map((response, index) => ({
      response: response,
      poll_id: poll.id,
      order: index,
    })))

    return poll
  })

  setResponseStatus(event, StatusCodes.CREATED)
  return poll.id
})
