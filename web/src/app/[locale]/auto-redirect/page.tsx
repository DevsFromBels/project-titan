'use client'
import React, { useEffect, useState } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { GlobeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()
  const [ip, setIp] = useState('')
  const [countdown, setCountdown] = useState(2)
  const router = useRouter()

  const search = searchParams.get('user')
  const content_id = searchParams.get('content_id')
  const redirect_url = searchParams.get('redirect_url')

  if(!redirect_url) redirect('/') // https://titanproject.top/auto-redirect?user=sh1woo&content_id=bc85e7bd-a722-448d-a773-1e572f8c1c20&redirect_url=https://t.me/sh1woo

  useEffect(() => {
    const getUserIP = async () => {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      setIp(data.ip)

      // Отправка запроса на сервер после получения IP-адреса
      const response = await fetch(`https://market-api.titanproject.top/addShows?user_id=${search}&content_id=${content_id}&ip=${data.ip}`)
      if (!response.ok) {
        console.error("Failed to add shows:", response.statusText);
      }
    }

    getUserIP()

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    setTimeout(() => {
      router.push(redirect_url)
    }, 2000)

    return () => clearInterval(timer)
  }, [search, content_id, ip, router])

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
      <GlobeIcon width="120px" height="120px"/>
      <p>Вы будете автомотически перенаправленны на сайт через {countdown} секунд</p>
      <p>{content_id}</p>
      <p>Ваш IP адрес: {ip}</p>
    </div>
  )
}

export default Page
