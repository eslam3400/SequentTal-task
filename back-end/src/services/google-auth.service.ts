import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.FRONT_END_HOST}/auth/google`
)

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

export function getGoogleAuthUrl() {
  return oauth2Client.generateAuthUrl({ scope, include_granted_scopes: true })
}

export async function getGoogleTokens(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    return tokens
  } catch (error) {
    throw new Error('error getting google tokens')
  }
}

export async function getGoogleUserData(token: string) {
  try {
    const tokenInfo = await oauth2Client.getTokenInfo(token)
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
    const { data } = await oauth2.userinfo.get()
    return { tokenInfo, userInfo: data }
  } catch (error) {
    throw new Error('error getting user data from google')
  }
}
