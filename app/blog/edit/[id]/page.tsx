"use client"

import { useRouter } from 'next/navigation'; 
import { Fragment, useEffect, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';


type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
}

const updateBlog = async(data: UpdateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    // @ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
}

// delete
const deleteBlog = async(id: string) => {
    const res = fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "DELETE",
      // @ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  }


// define a fun => get blogs by its id
const getBlogById = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`);
    const data = await res.json();
    return data.post; 
}



const EditBlog = ({ params }: { params: {id: string }}) => {
//   console.log(params.id);
  
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null); //usind usestate is rendered all page after one input
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1"});
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
           titleRef.current.value = data.title;
           descriptionRef.current.value = data.description;
           toast.success("Fetching Completed", {id: "1"});
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1"});
      });
  }, []);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault(); 
    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
    if (titleRef.current && descriptionRef.current) {

      toast.loading("Sending Request 🚀", { id: "1"});

      await updateBlog({ 
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });

      toast.success("Blog Posted Successfully", { id: "1"});
      router.push("/");
    }
  };

//   fn for deletion
const handleDelete = async () => {
    toast.loading("Deleting Blog", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Blog Deleted", { id: "2" });
    router.push("/");

}

  return (
    <Fragment>
      <Toaster />
       <div className='w-full m-auto flex my-4'>
         <div className='flex flex-col justify-center items-center m-auto'>
          <p className='text-2xl text-slate-200 font-bold p-3'>
            Edit a Wonderful Blog 🚀 
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder='Enter Title'
              type='text'
              className='rounded-md px-4 w-full py-2 my-2' 
            />

            <textarea
              ref={descriptionRef}  
              placeholder='Enter Description'
              className='rounded-md px-4 py-2 w-full my-2'
            />

            <div className='flex justify-between'>
            <button className='font-semibold px-4 py-2 shadow-xl bg-slate-200 my-2 rounded-lg m-auto hover:bg-slate-100'>
              Update
            </button>
            </div>

          </form>

          <button onClick={handleDelete} className='font-semibold px-4 py-2 my-2 mt-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-700'>
              Delete
           </button>
         </div> 
       </div>
    </Fragment>
  )
}

export default EditBlog