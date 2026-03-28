import Peer from "peerjs"
import { useEffect, useRef, useState } from "react"

function App() {
  const [id , setId] = useState("")
  const peerref = useRef()
  const myvideo = useRef()
  const recivedvideo = useRef()
  const [peerid,setpeerid] =  useState("") 
   useEffect(() => {
    const peer = new Peer()
    peer.on('open',(id) => {
      setpeerid(id)
      console.log(id)
    })
    peer.on('call' , (call) => {
      navigator.mediaDevices
        .getUserMedia({video: true , audio : true})
        .then((stream) => {
          call.answer(stream)
          myvideo.current.srcObject = stream
          call.on('stream',(remotestream) =>{
          recivedvideo.current.srcObject = remotestream
        })
        })
    })
    peerref.current = peer
  },[])

  function callid(){
    navigator.mediaDevices
          .getUserMedia({video : true , audio : true})
          .then((stream) => {
            myvideo.current.srcObject = stream
            const call = peerref.current.call(id, stream)

            call.on('stream' , (remotestream) => {
              recivedvideo.current.srcObject = remotestream
            })
          })
  }

  return (
    <>
      <h1>peer js</h1>
      <h2>enter id to connect</h2>
      <h2>my id: {peerid}</h2>
      <input type="text" value={id} onChange={(e) => {setId(e.target.value)}}></input>
      <button onClick={callid}>Call</button>
      <h2>my video</h2>
      <video ref={myvideo} autoPlay muted playsInline></video>
      <h2>you</h2>
      <video ref={recivedvideo} autoPlay playsInline></video>
    </>
  )
}
export default App
