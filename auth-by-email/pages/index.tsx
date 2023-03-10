import React, {Fragment, useEffect, useMemo, useState} from "react";

import {SignUp} from "../components/signUp/signUp";
import {SignIn} from "../components/signIn/signIn";
import {Account} from "../components/account/account"


export default function Home() {
    const [isSignIn, setSignIn] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    useMemo(() => {
        console.log(isAuth)
    }, [isAuth])
    const Logout = () => {
        localStorage.clear()
        setIsAuth(false)
    }

    return (
        <Fragment>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
            <div style={{paddingTop: "50px", display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <div style={{display: 'flex', gap: '20px'}}>
                    <button style={{fontSize: '18px', padding: '4px 10px', border: '2px solid gray'}}
                            onClick={() => setSignIn(true)}>SignIn
                    </button>
                    <button style={{fontSize: '18px', padding: '4px 10px', border: '2px solid gray'}}
                            onClick={() => setSignIn(false)}>SignUp
                    </button>
                    {
                        isAuth && <button style={{fontSize: '18px', padding: '4px 10px', border: '2px solid gray'}}
                                          onClick={Logout}>
                            LogOut
                        </button>
                    }

                </div>

                {
                    isSignIn ? <SignIn isAuth={isAuth} setIsAuth={setIsAuth}/> : <SignUp/>
                }
                {
                    isAuth && <Account email={String(localStorage.getItem("email"))}/>
                }
            </div>
        </Fragment>
    )
}
