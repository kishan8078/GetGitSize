import { useState } from "react"
import axios from "axios"
type repoURLType{
  repoURL:string;
}
function IndexPopup() {
  const [data, setData] = useState("")
  const [repoLink, setRepoLink] = useState<string>("")
  const [repoSize, setRepoSize] = useState<string>("")
  const [errMsg, setErrMsg] = useState<string>("")
  const handeChange = (e)=> {
    setRepoLink(e.target.value)
  }
  const hand = async({repoURL}:repoURLType): Promise<string> => {
    return "clicked on this button"
  }
  return (
    <div>
      <h1>Know the Repo Size</h1>
      <h2>
        Enter valid github repo lin
      </h2>
      <input type="text" onChange={handeChange} value={repoLink}/>
      <h3>Size:</h3>
      {
        repoSize??errMsg!=""?errMsg:"????"
      }
    </div>
  )
}


