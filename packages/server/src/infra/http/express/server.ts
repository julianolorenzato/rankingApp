import 'shared/events/subscriptions'
import { app } from './app'

const PORT = 3333

app.listen(PORT, () => console.log(`Server executando na porta ${PORT}`))
