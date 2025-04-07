interface IAnimatedUnderLine {
  active: boolean
}

export function AnimatedUnderLine({ active }: IAnimatedUnderLine) {
  return(
    <div 
      className={`absolute top-full w-full h-1 overflow-hidden transition-opacity duration-700 
        ${ active ? 'opacity-100' : 'opacity-0'}`}
    >
      <div 
        className="w-full h-full bg-[linear-gradient(to_right,transparent,rgba(161,161,170,0.8),transparent)] animate-loading" 
      />
    </div>
  )
}