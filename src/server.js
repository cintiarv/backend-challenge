import express from 'express'
import cors from 'cors'
import authorsRouter from '../src/routers/authors.router.js'
import postsRouter from '../src/routers/posts.router.js'
import commentsRouter from './routers/comments.router.js'
import reactionsRouter from './routers/reactions.router.js'
import handleErrors from './middlewares/handleError.js'
import authRouter from './routers/auth.router.js'
const server = express()
// middlewares
server.use(express.json())
server.use(cors())

// routes
server.use('/authors', authorsRouter)
server.use('/posts', postsRouter)
server.use('/auth', authRouter)
server.use('/comments', commentsRouter)
server.use('/reactions', reactionsRouter)

// middleware - handleErrors
server.use(handleErrors)

export { server }
