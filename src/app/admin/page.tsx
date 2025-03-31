import { Button } from "@/elements/button"

import { ChevronsRight, X } from "lucide-react"

export default function InsertNewProjectForm() {
  return (
    <div className='h-screen inset-0 flex bg-zinc-900/50'>
        <form 
              action=""
              className='m-auto w-96 relative rounded-lg py-2 px-3 space-y-2 border border-zinc-500/50 bg-zinc-900'
            >
              <button className='absolute top-2 right-2'>
                <X/>
              </button>
              <h4 
                className='ml-0.5 text-lg text-center mt-1.5 tracking-wider'
              >
                Insert a new Project
              </h4>

              <div className='flex items-center'>
                <div className='w-full h-0.5 bg-zinc-700 rounded-xl'/>
                <ChevronsRight className='text-zinc-700'/>
              </div>
              
        
              <div className='flex flex-col gap-0.5'>
                <span className='ml-1.5'>Project Title:</span>
                <input 
                  type="text"
                  placeholder='ex: Title'
                  className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5' 
                  required/>
              </div>

              <div className='flex flex-col gap-0.5'>
                <span className='ml-1.5'>Project Description</span>
                <textarea  
                  required
                  placeholder='Type your message right here!'
                  rows={6}
                  className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5'
                />
              </div>
        
              <div className='flex flex-col gap-0.5'>
                <span className='ml-1.5'>Images</span>
                <input 
                  type="file"
                  placeholder='load your file'
                  className='border rounded-md border-zinc-700/35 bg-zinc-950/50 px-3 py-0.5' 
                  required/>
              </div>
        
              <Button
              type="submit"
              >
                Submit
              </Button>
            </form>
  
    </div>
  )
}