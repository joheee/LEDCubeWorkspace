import { useContext } from 'react';
import ReactLoading from 'react-loading';
import { IndexContext } from '../config/Context';

export function LoadingAnimation(){
    const indexContext = useContext(IndexContext)
    return (
        <ReactLoading type='spin' color={indexContext.ColorBackground} height={'20%'} width={'20%'} />        
    )
}