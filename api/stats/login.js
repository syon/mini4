import axios from 'axios'

const WEBHOOK_URL = process.env.LOGIN_WEBHOOK_URL

module.exports = async (req, res) => {
  console.log('WEBHOOK_URL is:', WEBHOOK_URL)
  if (WEBHOOK_URL) {
    const user = req.body
    const data = {
      embeds: [
        {
          title: user.displayName,
          thumbnail: {
            url: user.photoURL,
          },
          fields: [
            {
              name: 'Email',
              value: user.email,
            },
            {
              name: 'UID',
              value: user.uid,
            },
          ],
        },
      ],
    }
    await axios.post(WEBHOOK_URL, data)
  }
  res.send()
}
