
const submitReqData = (formdata)=>{
    let req ={}
    // console.log('form data', formdata)
    for (let i in formdata){
        // let ing = `${formdata[i].label} : ${formdata[i].value}`
        req[formdata[i].label ] = formdata[i].value
        // console.log(req)
        // console.log('submit' ,formdata[i].label)
      
      }

      // console.log('Req data',req)
    return req
}

export default submitReqData;