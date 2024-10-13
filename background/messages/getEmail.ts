import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    const message = await req.body;
    res.send(message);
    console.log(`Email arrivata da Content ${message}`)
}

export default handler