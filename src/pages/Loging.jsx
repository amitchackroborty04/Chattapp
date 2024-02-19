import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Dna } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { userLoginInfro } from './slice/userslice';
import { Result } from 'postcss';
import { getDatabase, ref, set } from "firebase/database";

const Loging = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const db = getDatabase();
    let dispatch= useDispatch()
    let [email, setEmail] = useState('')
    let [password, setPassord] = useState('')
    let [error, setEror] = useState('')
    let [passwordshow, setPassoreshow] = useState(false)
    let [forgetpass, setForgetpass] = useState(false)
    let [restpass, setRestpass] = useState('')
    let [resterror, setRseterror] = useState('')
    let navigate = useNavigate('')
    let [lodder, setLodder] = useState(false)





    let handleEmail = (e) => {
        setEmail(e.target.value)
        setEror('')


    }
    let handlepassword = (e) => {
        setPassord(e.target.value)
        setEror('')

    }
    let handlelogin = () => {
        if (!email) {
            setEror('somthig is wrong')
        }
        if (!password) {
            setEror('somthing is wrong')
        }
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    setLodder(true)
                    navigate('/home')
                    localStorage.setItem("name","amit")
                    dispatch(userLoginInfro(user.user))
                    localStorage.setItem('userinfo',JSON.stringify(user.user))
                })
                .catch((error) => {
                    if (error.code.includes('auth/invalid-credential')) {
                        setEror('Something is worng')
                    }

                }),

                toast('🦄 Login successfully!', {
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
    let handleforgetpass = () => {
        setForgetpass(true)
        setLodder(false)
    }
    let handlerestpass = (e) => {
        setRestpass(e.target.value)
        setRseterror('')
    }
    let handlerestbtn = () => {

        sendPasswordResetEmail(auth, restpass)
            .then((user) => {
                console.log('bro rest done');
                alert('Rest Done')
            })
            .catch((error) => {
                if (error.code.includes('auth/missing-email')) {
                    setRseterror('Missing Email')
                }

            });
    }
    let handleGoole = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                dispatch(userLoginInfro(result.user))
                localStorage.setItem('userinfo',JSON.stringify(result.user))
                set(ref(db, 'users/' + result.user.uid), {
                    fullname: result.user.displayName,
                    email: result.user.email,
                    images: result.user.photoURL,               
                  });
                navigate('/home')
                console.log(result);
            }).catch((error) => {
                console.log(error.code);
            });
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

            <div className='w-full md:w-2/4 flex justify-center  md:justify-end'>
                <div className=' mr-0 md:mr-[69px]'>
                    <h4 className='font-nunito w-full md:w-[368px] text-primari font-bold pt-2 md:pt-[80px] text-[25px] '>Login to your account!</h4>
                    <Link onClick={handleGoole} className='flex border border-solid p-[23px] w-[220px] rounded-[10px] mt-[15px]'>
                        <img src="goole.png" alt="goole" />
                        <span className='font-nunito text-[13px] font-semibold ml-[9px] text-[#03014C]'>Login with Google </span>
                    </Link>

                    <div className='relative mt-[15px]'>
                        <p className='font-nunito text-[13px] text-primari tracking-[7.5%] absolute top-[27px] left-[0px] bg-[#fff] '>Email Addres</p>
                        <input onChange={handleEmail}
                            className=' w-full md:w-[368px] h-[50px] px-4  border-b border-1 border-solid border-primari mt-[37px]  outline-none' type="email" />
                    </div>


                    <div className='relative mt-[20px]'>
                        <p className='font-nunito text-[13px] text-primari tracking-[7.5%] absolute top-[27px] left-[0px] bg-[#fff] '>Password</p>
                        <input onChange={handlepassword}
                            className='w-full md:w-[368px] h-[50px] px-4  border-b border-1 border-solid border-primari mt-[37px] outline-none	' type={passwordshow ? "text" : "password"} />
                        {passwordshow ?
                            <FaEye onClick={() => setPassoreshow(false)} className='absolute top-[50px] right-8 text-2xl ' />
                            :
                            <FaEyeSlash onClick={() => setPassoreshow(true)} className='absolute top-[50px] right-8 text-2xl ' />
                        }
                    </div>
                    {error && <p className='text-[red] mt-3 ml-2'>{error}</p>}

                    {lodder ?
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
                        <Link onClick={handlelogin}
                            className='w-full md:w-[368px] inline-block bg-[#5F35F5] text-center py-[19px] rounded-[8px] mt-[30px] text-[#fff] font-nunito font-semibold text-[20px]' href="">Login to Continue
                        </Link>
                    }

                    <Link to='/signup'>
                        <p className='w-full md:w-[368px] text-center text-[#03014C] text-[13px] font-nunito    mt-[15px]'>Don’t have an account? <span className='text-[#EA6C00] font-bold'>Sign Up</span></p>
                    </Link>
                    <div>
                        <button onClick={handleforgetpass} className='w-full md:w-[368px] text-center text-[#03014C] text-[13px] font-nunito    mt-[10px]'>Forget password ?</button>
                    </div>

                </div>
            </div>
            <div className='hidden md:block w-2/4'>
                <img className='w-full h-screen object-cover' src="loging.png" alt="signup" />
            </div>
            {forgetpass && <div className=' w-full h-screen absolute top-0 left-0 bg-[rgba(0,0,0,.5)] flex justify-center items-center'>
                <div className='w-[500px]  bg-[#cfe9e9] rounded-xl  p-[70px]'>
                    <p className='font-nunito text-samibold text-[20px] text-primari '>Reset Your Password</p>
                    <input onChange={handlerestpass}
                        className='w-[368px] h-[60px] px-[20px] outline-none  rounded-[8px] mt-3 ' type="text" placeholder='Enter Your Email' />
                    {resterror && <p className='font-nunito text-[red] mt-2'>{resterror}</p>}
                    <button onClick={handlerestbtn} className='px-[10px] py-[10px] mt-5 font-nunito text-[white] bg-[green] rounded-[8px] w-[70px]'>Send</button>
                    <button onClick={() => setForgetpass(false)} className='px-[10px] py-[10px] mt-5 font-nunito text-[white] bg-[red] rounded-[8px] ml-[220px] w-[70px]'>Cancle</button>

                </div>
            </div>}
        </div>
    )
}

export default Loging