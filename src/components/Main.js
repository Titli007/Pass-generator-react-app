import { useState, useCallback, useEffect, useRef } from "react";
function Main(){
    const[length, setLength] = useState(8)
    const[number, setNumber] = useState(false)
    const[spchar, setSpchar] = useState(false)
    const[pass, setPass] = useState("")
    const passRef = useRef(null)
    const [reload, setReload] = useState(true)

    const passGenerator = useCallback( () =>{
        let getPass=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(number) str += "0123456789" ;
        if(spchar) str +="~!@#$%^&*_+-=:;><,.?/'"

        for(let i=1; i<= length; i++){
            let char = Math.floor(Math.random() * str.length + 1)
            getPass += str.charAt(char)
        }

        setPass(getPass)

    }, [length, number, spchar, setPass]) 
     
    useEffect(()=>{
        passGenerator()
    }, [length, number, spchar, reload])

    const copyPassword = useCallback( ()=>{
        passRef.current.select() //?, warnings? errors in page?
        window.navigator.clipboard.writeText(pass)
    },[pass])

    return(
        <div>
        <h1 className='text-4xl text-center'>password generator</h1>
        <div className="text-center m-10 ">
            <button className={`${reload? "bg-white":"bg-blue-500"} text-black m-4`} onClick={() => setReload(!reload)}>reload</button>
            <input className="text-black" type="text" value={pass} placeholder="password" ref={passRef}/>
            <button className="bg-white text-black m-4" onClick={copyPassword}>copy</button>
            <div>
            <input className="mr-2" type="range" min={3} max={50} value={length} onChange={(e) => setLength(e.target.value)}/>
            <label className="mr-2">length({length})</label>
            <input className="ml-5 mr-2" type="checkbox" onChange={() => setNumber(!number)}/><label className="mr-2">numbers</label>
            <input className="ml-5 mr-2" type="checkbox" onChange={() => setSpchar(!spchar)}/><label>special characters</label>
            </div>
        </div>
        </div>
    )
}

export default Main;