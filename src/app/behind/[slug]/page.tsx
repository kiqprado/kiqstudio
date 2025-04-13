import Link from "next/link"

interface IBehindThePixel {
  params: {
    slug: string
  }
}

export default function BehindThePixel({ params }: IBehindThePixel) {
  return(
    <div className='px-12 py-6 flex flex-col gap-6'>
      <h1 className='text-center tracking-widest font-bold text-6xl'>Behind the Pixel</h1>

      <p className='m-auto text-justify tracking-wide w-202'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque sapiente quisquam dolores similique reiciendis harum aut magni numquam illo ab placeat, explicabo exercitationem ut, odit doloribus officia fuga consequatur praesentium!
      Ad assumenda inventore animi quasi nobis soluta dolores impedit quam quos expedita enim ea doloribus sit ab, vel aut nihil perferendis debitis! Cumque modi reiciendis at inventore, provident sunt natus?
      Magni nihil nam veritatis reiciendis quos at, dolore ex nostrum eaque minima ut aliquid et libero. Reprehenderit tempora eligendi, tenetur asperiores cum beatae dolores possimus natus, est ut commodi aut?
      Quisquam nesciunt eos nobis, quia saepe cum numquam, quis reiciendis odit voluptas, perspiciatis mollitia harum inventore illum ea praesentium id tempora ab sapiente beatae nostrum porro dignissimos quae? Magni, explicabo.
      Quisquam dolore ipsa dolorem quo exercitationem a sapiente inventore placeat facere deleniti sit, ad consectetur molestiae architecto, eveniet reiciendis ab ipsam. Distinctio similique sunt ex eaque sapiente magni voluptate ea?</p>

      <Link
        href={'/'}
        className='text-center text-zinc-300 text-lg mt-36 hover:font-bold  hover:text-zinc-200/70'
      >
        ...Home
      </Link>
    </div>
  )
}