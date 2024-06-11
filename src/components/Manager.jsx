import React, { useRef } from 'react'
import postcss from 'postcss'
import { stringify } from 'postcss'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {

    const imgRef = useRef(null);
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const showPassword = () => {
        if (imgRef.current.src.includes("img/hide.png")) {
            imgRef.current.src = "img/view.png";
            setIsPasswordVisible(true);
        } else {
            imgRef.current.src = "img/hide.png";
            setIsPasswordVisible(false);
        }
    }


    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])


    const setPassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            console.log(form)
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('🦄 Password Saved', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('🦄 Password Not Saved', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }

    }
    const deletePassword = (id) => {
        let c = confirm('Do you really want to delete ?')
        if (c) {

            console.log("deleting password" + id)
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('🦄 Password Deleted', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        // console.log([...passwordArray, form])

    }
    const editPassword = (id) => {
        console.log("editing password" + id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
        // console.log([...passwordArray, form])

    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    const copytext = (text) => {
        toast('🦄 Copied text -' + text, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
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
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />


            <div className='bg-green-100 '>
                <h2 className='text-blue-400 text-center py-8 font-bold text-md font-serif'>Yours password manager</h2>
                <div className='container inputs flex  flex-col text-black px-8 mx-auto items-center  py-2' >
                    <input value={form.site} onChange={handleChange} name='site' type="text" className=" text  rounded-lg border-2 w-full px-auto m-4 text-center py-2 border-green-900 p-2 " placeholder='Enter Your Name' />
                    <div className='md:flex grid w-full justify-center py-2  gap-4 mb-4 '>
                        <input value={form.username} onChange={handleChange} name='username' type="text" className="text text rounded-lg border-2 w-full text-center py-2 border-green-900 p-2 " placeholder='Enter Your Username' />
                        <input value={form.password} onChange={handleChange} name='password' type="password" className="text text rounded-lg border-2 justify-center items-center w-full text-center py-2 border-green-900 p-2" placeholder='Enter Password' />
                    </div>
                    <div>
                        <button onClick={setPassword} className='flex justify-center py-2 items-center  bg-green-500 hover:bg-green-300 border-2 border-green-900 p-2 px-4 w-fit rounded-full'>
                            <lord-icon
                                src="https://cdn.lordicon.com/xtnsvhie.json"
                                trigger="hover"
                                colors="primary:#0a5c15"
                            >
                            </lord-icon>
                            Add Password
                        </button>
                    </div>
                    <div className='passwords'>
                        <h1 className='font-bold text-2xl pl-3  pt-10'>Your Paswords :</h1>
                        {passwordArray.length === 0 && <div className='my-24 font-semibold font-cursive'>No password to show</div>}
                        {passwordArray.length != 0 && <table className="table-auto mx-auto md:w-full overflow-hidden rounded-md  my-4 mb-16 ">
                            <thead className='bg-green-600 text-white w-fit px-4'>
                                <tr>
                                    <th className='py-2 px-2'>Site</th>
                                    <th className='py-2 px-2'>Username</th>
                                    <th className='py-2 px-2'>Password</th>
                                    <th className='py-2 px-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index} >
                                        <td className='border border-white text-center md:px-4 px-2 py-3  w-fit'><a target='_blank' href={item.site}>{item.site}</a>
                                            <span className='copyicon' onClick={() => { copytext(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="click">
                                                </lord-icon>
                                            </span>
                                        </td>
                                        <td className='border border-white  text-center w-fit md:px-6 px-2 py-3  '>{item.username}
                                            <span className='copyicon' onClick={() => { copytext(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}
                                                    src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                    trigger="click">
                                                </lord-icon>
                                            </span>
                                        </td>
                                        <td className='border border-white text-center w-fit md:px-6 px-1 flex-col  '>
                                            <div className='flex py-3'>
                                                <span className='py-0.5'>
                                                    {isPasswordVisible ? item.password : "*".repeat(item.password.length)}
                                                </span>
                                                <span>
                                                    <img ref={imgRef} onClick={showPassword} className='w-7 h-6 px-1 cursor-pointer pt-1' src="img/hide.png"  alt="Toggle visibility"/>
                                                </span>
                                            </div>
                                        </td>
                                        <td className='border border-white text-center w-fit md:px-8 px-4  py-3 '>
                                            <span className='curson-pointer' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/lsrcesku.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                            <span className='curson-pointer p' onClick={() => { deletePassword(item.id) }} >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xekbkxul.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#110a5c,secondary:#ffffff,tertiary:#646e78,quaternary:#ebe6ef">

                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Manager
