import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app
    .get('/hello', (c) => {
        return c.json({
            message: 'Hello Next.js!',
        })
    })
    .get('/hello/:id',
        zValidator(
            'param',
            z.object({
              id: z.string(),
            })
        ),
        async (c) => {
        const {id} = c.req.valid('param')
        return c.json({
            message: 'hello subscribers',
            id: id,
        })
    })
    .post('/create/:postId',
        zValidator(
            'json',
            z.object({
              title: z.string(),
              summary: z.string(),
            })
        ),
        zValidator(
            'param',
            z.object({
              postId: z.string(),
            })
        ),
        async (c) => {
            const { title, summary } = c.req.valid('json')
            const { postId } = c.req.valid('param')
            return c.json({
                title,
                summary,
                postId
            })
        }
    )

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)