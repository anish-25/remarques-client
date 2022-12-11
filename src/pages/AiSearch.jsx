import { Configuration, OpenAIApi } from 'openai'
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const AiSearch = () => {
    const [loader, setLoader] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const apiKey = "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"
    const configuration = new Configuration({
      apiKey
    })
    const openAi = new OpenAIApi(configuration)
    const handleSearch = async () => {
        if(keyword.length){
            console.log('called')
            setImageUrl("")
            const response = await openAi.createImage({
                prompt: keyword,
                n:1,
                size: "256x256",
              })
              setImageUrl(response?.data?.data[0].url)
        }
    }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
        <div className="w-3/4 flex relative">
  <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => {if(e.key==='Enter'){handleSearch()}}} placeholder='Search for an Image' className='border border-blue-200 p-2 px-6 w-full outline-none mb-6 transition-all duration-200 hover:border-blue-500 focus:border-blue-500' />
        <img src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png"
        className='absolute w-8 h-8 mt-1.5 cursor-pointer opacity-60 right-6 transition-all duration-200 hover:mt-0 hover:w-10 hover:h-10 hover:opacity-100'  alt="" onClick={handleSearch} />
        </div>
  <div className="image min-h-[400px] w-[400px]">
    {!imageUrl.length?
    <div className="h-[400px] w-full">
        <Skeleton className='h-[400px] w-full'/>
<svg>hidden</svg>
    </div>
    :
<img src={imageUrl}  alt="result-image" 
  className='h-[400px] rounded w-[400px]'/>
}
  </div>
    </div>
  )
}

export default AiSearch