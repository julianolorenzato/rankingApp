import express from 'express'
import { router } from 'infra/http/routes'
import 'modules/social/subscriptions'

const PORT = 3333

const app = express()

app.use(express.json())

app.use(router)

app.listen(PORT, () => console.log(`Server executando na porta ${PORT}`))
