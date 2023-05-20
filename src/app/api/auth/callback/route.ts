import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  console.log(token)

  const redirectUrl = new URL('/', request.url)

  return NextResponse.redirect(redirectUrl, {
    headers: { 'Set-Cookie': `token=${token}; Path=/; max-age=2592000` },
  })
}
