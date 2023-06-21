import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    handleClick: () => void
}

export const Fab: FC<Props> = ({children, handleClick}) => {
  return (
    <button onClick={handleClick} className="rounded-full fixed bottom-0 right-0 transition ease-out text-white bg-secondary md:text-5xl text-2xl hover:scale-105 border-none p-4 mb-10 mr-5">
        {children}
    </button>
  )
}
