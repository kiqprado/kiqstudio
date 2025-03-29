
interface IPageNotFound {
  children: string
}

export default function PageNotFound({ children }: IPageNotFound) {
  return (
    <div className='fixed inset-0 flex'>
      <div className='m-auto flex items-center justify-center'>
        <span>{children}</span>
      </div>
    </div>
  )
}