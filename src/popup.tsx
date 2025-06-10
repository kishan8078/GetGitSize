import "./style.css"
import { useState } from "react"
import axios from "axios"
import {PacmanLoader} from "react-spinners"
import MoreInfo from "~components/MoreInfo"
type responseData={
  language:string;
  created_at:string;
  updated_at:string;
open_issues:number;
  watchers_count:number;
}
function IndexPopup() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const [responseData, setResponseData] = useState<responseData>(null)
  const [repoLink, setRepoLink] = useState<string>("")
  const [repoSize, setRepoSize] = useState<string>("")
  const [errMsg, setErrMsg] = useState("")
  const handleChange = (e)=> {
    console.log('input', repoLink);
    setRepoLink(e.target.value)
  }
  const getSize = async(repoLink: string):Promise<string> => {
  // const getSize = async({repoURL}: repoURLType):Promise<string> => {
    // https://api.github.com/repos/jhaddix/SecLists
    if (repoLink == ""){
      setTimeout(()=>{
        setErrMsg("")
      }, 4000)
      setErrMsg("*provide Git Repo Link")
      return ""
    }

    if(!repoLink.match(/^https:\/\/github\.com\/[a-zA-Z0-9\_\-\#\$\@]+\/[a-zA-Z0-9\_\-\$\-\.\#]+\.git$/)){
      setTimeout(()=>{
        setErrMsg("")
      }, 4000)
      setErrMsg("*provide Valid Git Repo Link") 
      return 
    }

    if(!validRepoURL(repoLink)){
      setTimeout(()=>{
        setErrMsg("")
      }, 4000)
      setErrMsg("Invalid Repo URL")
      return "Invalid Repo Link!"
    }

    const validURL = new URL(repoLink)
    
    console.log('path name', validURL.pathname);
    
    const username = validURL?.pathname?.split('/')[1]
    const repoName = validURL?.pathname?.split('/')[2].split('.git')[0]
    console.log('username, repoName', username, repoName);
    
    setLoading(true)
    // https://github.com/swisskyrepo/PayloadsAllTheThings.git
    try {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`, {})
      if(response){
        console.log('response', response);
        setRepoSize((((response?.data?.size/1024)).toFixed(2)).toString() + " Mb" || "0.00 Mb")
        setResponseData(response?.data || null)
      setLoading(false)
      
      }
      return `${response}`
    } catch (error) {
      setTimeout(() => {
      setErrMsg("")
      }, 4000)
      setErrMsg(error.message)
      console.log('error', error);
      return "Failed to fetch!!"
    }finally{
      setLoading(false)
    }
  }

  const validRepoURL = (testURL: string):boolean => {
    try {
      const repoURL = new URL(testURL)
      console.log('valid test URL', repoURL);
      return true
    } catch (error) {
      console.log('invalid test URL', error);
      return false
    }
  }

  return (
    <div className="border border-purple-950 min-h-[380px] min-w-[300px] flex flex-col gap-2 bg-blue-950 text-white" >
      <div className="h-10 flex flex-row justify-start p-2 items-center bg-white mb-6 text-blue-950">
        <h1 className="text-xl font-bold ">Get Repo Size</h1>
      </div>
      <div className="p-1">
      <input type="text" onChange={handleChange} value={repoLink} className="p-2 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 text-md h-8 w-full text-md mb-3 rounded-sm bg-blue-950" disabled={loading?true:false} placeholder="https://github.com/username/repo-name.git"/>
      </div>
      {/* <button onClick={() => getSize(repoLink)} className="border bg-gray-300 border-black text-md hover:bg-purple-500">Get Size</button> */}
      <div className="flex flex-col items-end p-1">
        <button onClick={() => getSize(repoLink)}
          className="group relative inline-block overflow-hidden border border-green-500 px-7 py-1 focus:ring-3 focus:outline-hidden"
        >
          <span
            className="absolute inset-x-0 bottom-0 h-[2px] bg-green-500 transition-all group-hover:h-full"
          >
          </span>
          <span
            className="relative text-sm font-medium text-white transition-colors group-hover:text-white grid place-items-center"
          >
            Get
          </span>
        </button>
      </div>
      <div className="flex flex-row justify-end items-center p-1 h-5">
        <div className="px-7 py-1">
        {loading ? (<PacmanLoader color="#43d843" size={8}/>) : (<span className="">{" "}</span>)}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-lg font-bold p-1">Size: {"   "}
          {
            repoSize!="" ? (<span className="text-md text-green-500">{repoSize}</span>) : errMsg!="" ? (<span className="text-sm text-red-600">{errMsg}</span>) : (<span className="text-sm">*search for any git repo...</span>)
          }
        </p>
        <div className="p-1">
          <p className="flex flex-row justify-between gap-2 items-center w-40">
            <p className="flex justify-start">Language</p>
            <span className="text-green-500">{
              responseData != null ? (<span>{responseData?.language}</span>) : (<span>....</span>)
            }</span>
          </p>
          <p className="flex flex-row justify-between gap-2 items-center w-40">
            <p className="flex justify-start">Created at</p>
            <span className="text-green-500">{
              responseData != null ? (<span>{new Date(responseData?.created_at).toLocaleDateString("en-IN", {day: "2-digit", month: "long", year: "numeric"})}</span>) : (<span>....</span>)
            }</span>
          </p>
          <p className="flex flex-row justify-between gap-2 items-center w-40">
            <p className="flex justify-start">Updated at</p>
            <span className="text-green-500">{
              responseData != null ? (<span>{new Date(responseData?.updated_at).toLocaleDateString("en-IN", {})}</span>) : (<span>....</span>)
            }</span>
          </p>
        
          <p className="flex flex-row justify-between gap-2 items-center w-40">
            <p className="flex justify-start">Open issues</p>
            <span className="text-green-500">{
              responseData != null ? (<span>{responseData?.open_issues}</span>) : (<span>....</span>)
            }</span>
          </p>
          <p className="flex flex-row justify-between gap-2 items-center w-40">
            <p className="flex justify-start">Watchers count</p>
            <span className="text-green-500">{
              responseData != null ? (<span>{responseData?.watchers_count}</span>) : (<span>....</span>)
            }</span>
          </p>
      
        </div>
      </div>

      <p>
        {/* <MoreInfo /> */}
      </p>
    </div>
  )
}

export default IndexPopup