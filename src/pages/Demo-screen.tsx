import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux-store/store'
import { decrement, increment } from '../redux-store/demoSlice'
import { fetchClientList } from '../redux-store/client/fetchClientList'

const Demo = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchClientList());
    }, [dispatch])
    return (
        <>
            <h1>Lorem, ipsum dolor.</h1>
            <button onClick={() => dispatch(increment())} >Add</button>
            <button onClick={() => dispatch(decrement())} >Reduce</button>
        </>
    )
}

export default Demo