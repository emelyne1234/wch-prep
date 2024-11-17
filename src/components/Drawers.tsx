import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"

export function Drawers({onClickDrawer}: {onClickDrawer: React.ReactNode}) {
  const {data: session} = useSession();
  return (
    <Popover>
      <PopoverTrigger asChild>
        {onClickDrawer}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <h4 className="font-medium leading-none">Your Profile</h4>
            <div className="rounded-full w-10 h-10 overflow-hidden">
              <Image  src={session?.user?.image ?? '/default-avatar.png'} 
                alt="user image" 
                width={50} 
                height={50}  />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm"><span className="font-bold">Name:</span> {session?.user?.name}</h3>
              <p className="text-sm "><span className="font-bold">Email:</span> {session?.user?.email}</p>
            </div>
            <div className="flex justify-center">
              <button 
               onClick={() => {
                signOut();
              }}
              className="bg-emerald-800 text-white px-4 py-2 rounded-md">Logout</button>
            </div>
          </div>
      </PopoverContent>
    </Popover>
  )
}
