import Link from "next/link"
import { Button } from "@/shared/components/ui/button"

export default function NotFound() {
	return (
		<div className='flex h-[calc(100vh_-_3rem)] items-center justify-center'>
			<div className='text-center'>
				<h1 className='text-6xl font-bold'>404</h1>

				<p className='mt-2 text-2xl'>Эту страницу не удалось найти.</p>

				<Link href='/'>
					<Button className='mt-6'>Вернуться домой</Button>
				</Link>
			</div>
		</div>
	)
}
