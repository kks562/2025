import React, { useState } from 'react'

const Payment = () => {
    const [amount, setAmount] = useState('');
  
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(amount === ""){
        alert("Please enter amount");
      }else{
       var options ={
        key:"rzp_test_4hlUjhjcvWV9yq",
        key_secret:"BNK1J4bpTtkFKGOsJobO6qsu",
        amount: amount *100,
        currency: "INR",
        name: "Test User",
        description: "Test Transaction",
        handler: function(response){
          alert(response.razorpy_payment_id);
        },
        prefill:{
          name:"mithilesh",
          email:"kmithilesh5669@gmail.com",
          contact:"8778855348"
        },
        note:{
          address:"Razorpay Corporate office"
        },
        theme:{
          color:"#1487c4"
        }
       };
       var pay = new window.Razorpay(options);
       pay.open();
      }
    }
    return (
      <div>
        <h2>Razor pay gateway</h2>
        <br/>
        <input type="text" placeholder='enter amount'value={amount}onChange={(e)=>setAmount(e.target.value)}/>
        <br></br>
        <button onClick={handleSubmit}>Pay</button>
        
      </div>
    )
  }


export default Payment