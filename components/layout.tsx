import { User, Upload, AlignJustify } from 'react-feather'
import Link from 'next/link'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-12 grid-cols-12">
      <div className="max-sm:hidden row-span-4 row-start-1 bg-blue-900 overflow-y-auto col-span-2 py-3 text-slate-300">
        <ul className="w-full">
          <li className="py-2 mx-2 font-semibold text-center">
            <Link className="px-4 text-xl hover:text-slate-50" href="/">
              Joko Security
            </Link>
          </li>
          <Link href="#" passHref>
            <li className="hover:cursor-pointer px-2 py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-50 flex items-center">
              <User className="inline-block" />
              <div className="px-4 text-lg">Item 1</div>
            </li>
          </Link>
          <Link href="#" passHref>
            <li className="hover:cursor-pointer px-2 py-2 mx-2 rounded-md hover:bg-blue-500 hover:text-slate-50 flex items-center">
              <Upload className="inline-block" />
              <div className="px-4 text-lg">Item 2</div>
            </li>
          </Link>
        </ul>
      </div>
      <div className="max-sm:col-span-12 col-span-10 px-4 py-4">
        <AlignJustify className="inline-block" />
      </div>
      <div className="row-span-3 max-sm:col-span-12 col-span-10 bg-neutral-100">
        <div className="m-4 p-4 h-screen bg-white">
          { children }
        </div>
      </div>
    </div>
  )
}