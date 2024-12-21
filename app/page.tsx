// All of the files inside the App folder is bydefault server component so they are render on the server side no on the client side
// once we make request to specific page so this page gets converted into html file and that html file is be then published & visible to ur page
//  So that is server component

import Link from "next/link";


async function fetchBlogs() {
  // fetch => with Next.js it has extended capablity like of the Caches and revalidate features as well
  // So we can re-validate hte data after a couple of second

  const res = await fetch("http://localhost:3000/api/blog", { 
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.posts;
}


export default async function Home() {
  const posts = await fetchBlogs();
  // console.log(posts);
  
  return <main className="w-full h-full">

    <div className="md: w-2/4 sm: 3/4 m-auto p-4 my-5 rounded-lg relative h-24 border bg-slate-800 drop-shadow-xl">
      <div className="text-lg">
      <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">
        My FULL STACK Blog App With Next.Js
      </h1>
      </div>
      <div className="bg-slate-100 absolute bottom-4 right-4 p-2 rounded-md ">
        <p>Akki Pandey 😊</p>
      </div>

    </div>

    {/* Link  */}
    <div className="flex my-5">
      <Link 
        href={"/blog/add"} className="md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold">
          Add Your New Blog 🚀
      </Link>
    </div>

    {/* Blogs */}
    <div className="w-fill flex flex-col justify-center items-center">
      {posts?.map( (posts: any ) => (
        <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
          {/* Title and Action */}
          <div className="flex items-center my-3">
            {/* title */}
            <div className="mr-auto">
              <h2 className="mr-auto font-semibold">
                {posts.title}
              </h2>
            </div>
            {/* Link */}
            <Link href={`/blog/edit/${posts.id}`}
              className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
            >
              Edit
            </Link>
          </div>
          {/* Date and Description */}
          <div className="mr-auto my-1">
            <blockquote className="font-bold text-slate-700">
              {new Date(posts.date).toDateString()} 
            </blockquote>

          </div>
          {/* description */}
          <div className="mr-auto my-1">
            <h2>{posts.description}</h2>
          </div>
        </div>
      ))}

    </div>

  </main>
}
