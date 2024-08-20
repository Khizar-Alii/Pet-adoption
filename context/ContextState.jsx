import { useState } from "react";
import { createContext } from "react";
export const nameContext = createContext()
const NameState = (props) =>{

const[name,setName] = useState("")
const[profileImg,setprofileImg] = useState(null)
return(
    <nameContext.Provider value={{name,setName,profileImg,setprofileImg}}>
        {props.children}
    </nameContext.Provider>
)
}
export default NameState;