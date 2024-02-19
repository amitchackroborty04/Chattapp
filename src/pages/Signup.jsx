import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile } from "firebase/auth";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { Navigate } from 'react-router-dom';
  import { getDatabase, ref, set } from "firebase/database";

const signup = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate=useNavigate('')
  let [email, setEmail] = useState('')
  let [name, setName] = useState('')
  let [password, setPassord] = useState('')
  let [emailerr, setEmailerr] = useState('')
  let [nameerr, setNameerr] = useState('')
  let [passworderr, setPassorderr] = useState('')
  let [loder, setLoder] = useState(false)
  let [passwordshow, setPassoreshow] = useState(false)


  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }
  let handleName = (e) => {
    setName(e.target.value)
    setNameerr('')
  }
  let handlePasword = (e) => {
    setPassord(e.target.value)
    setPassorderr('')
  }


  let handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      setEmailerr('Emil is requrid')
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr('Invalid Email')
    }
    if (!name) {
      setNameerr('Name is requrid')
    }
    if (!password) {
      setPassorderr('Password is requrid')
    }
    if (email && name && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          set(ref(db, 'users/' + user.user.uid), {
            fullname: name,
            email: email,
            images: "amit.png"
           
          });
        
          sendEmailVerification(auth.currentUser)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName:name,
              photoURL: "profile.png"
            }).then(() => {

              setTimeout(() => {
                navigate('/')
              }, 2000);
              console.log('hoice vai');

            }).catch((error) => {
              console.log(error.code);
            });
          });
        })
        .catch((error) => {
          if (error.code.includes('auth/email-already-in-use')) {
            setEmailerr('Email alredy in use')
          }

        });
      setLoder(true)
      toast('🦄 Signup successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

  }

  return (
    <div className='flex'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className='w-full md:w-2/4 px-5 md:px-0 flex justify-normal sm:justify-center md:justify-end  '>
        <div className=' mr-0 md:mr-[69px]'>
          <h4 className='text-center md:left-0 font-nunito text-[25px] md:text-[34px] text-primari font-bold pt-0 md:pt-[80px] '>Get started with easily register</h4>
          <p className=' text-center md:left-0 font-nunito text-[20px] text-primari font-regular mt-[0px]'>Free register and you can enjoy it</p>
          <div className='relative'>
            <p className='font-nunito text-[13px] text-primari tracking-[7.5%] absolute top-[27px] left-[27px] bg-[#fff] px-[20px]'>Email Address</p>
            <input onChange={handleEmail}
              className='w-full md:w-[368px] h-[60px] px-4 rounded-lg border border-1 border-solid border-primari mt-[20px] md:mt-[37px]' type="email" />
          </div>
          {emailerr && <p className='text-[red] mt-3 ml-2'>{emailerr}</p>}
          <div className='relative'>
            <p className='font-nunito text-[13px] text-primari tracking-[7.5%] absolute top-[27px] left-[27px] bg-[#fff] px-[20px]'>Full name</p>
            <input onChange={handleName}
              className='w-full md:w-[368px] h-[60px] px-4 rounded-lg border border-1 border-solid border-primari mt-[20px] md:mt-[37px]' type="text" />
          </div>
          {nameerr && <p className='text-[red]  mt-3 ml-2'>{nameerr}</p>}
          <div className='relative w-full md:w-[368px]'>
            <p className='font-nunito text-[13px] text-primari tracking-[7.5%] absolute top-[27px] left-[27px] bg-[#fff] px-[20px]'>Password</p>

            <input onChange={handlePasword}
              className='w-full md:w-[368px] h-[60px] px-4 rounded-lg border border-1 border-solid border-primari mt-[35px] md:mt-[37px]]' type={passwordshow ? 'text' : 'password'} />
             {passwordshow ?
              <FaEye onClick={() => setPassoreshow(false)} className='absolute top-[38px] md:top-[42px] right-8 text-2xl ' />
              :
              <FaEyeSlash onClick={() => setPassoreshow(true)} className='absolute  top-[38px] md:top-[42px] right-8 text-2xl ' />
            }

          </div>
          {passworderr && <p className='text-[red]  mt-3 ml-2'>{passworderr}</p>}
          {loder ?
            <div className='w-full md:w-[368px] flex justify-center'>
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
            :
            <Link
              onClick={handleSubmit}
              className='w-full md:w-[368px] inline-block bg-[#5F35F5] text-center py-[10px] md:py-[19px] rounded-[86px] mt-[20px] md:mt-[50px] text-[#fff] font-nunito font-semibold text-[20px]' href="">Sign up
            </Link>
          }

          <Link to = '/'>
          <p className='w-full md:w-[368px] text-center text-[#03014C] text-[13px] font-nunito  mt-[20px]  md:mt-[10px]'>Already  have an account ? <span className='text-[#EA6C00] font-bold'>Sign In</span></p>
          </Link>
         
        </div>

      </div>
      <div className='hidden md:block w-2/4'>
        <img className='w-full h-screen object-cover' src="signup.png" alt="signup" />
      </div>
    </div>
  )
}

export default signup