import { Button } from "@/elements/button";

export default function ContactFormClient() {
  return (
    <form 
      action=""
      className='space-y-2'
    >
      <h4 
        className='ml-0.5 text-lg mt-1.5 tracking-wider'
      >
        Hey good to see you, let`s talk...
      </h4>

      <div className='flex flex-col gap-0.5'>
        <span className='ml-1.5'>Subject:</span>
        <input 
          type="text"
          placeholder='Tell me about it'
          className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5' 
          required/>
      </div>

      <div className='flex flex-col gap-0.5'>
        <span className='ml-1.5'>Email:</span>
        <input 
          type="email"
          placeholder='ex: john@acme.com'
          className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5' 
          required/>
      </div>

      <div className='flex flex-col gap-0.5'>
        <span className='ml-1.5'>Message:</span>
        <textarea  
          required
          placeholder='Type your message right here!'
          rows={8}
          className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5'
        />
      </div>

      <Button
      type="submit"
      >
        Enviar
      </Button>
    </form>
  )
}