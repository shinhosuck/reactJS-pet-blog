import { useEffect} from 'react'



function ScrollToTop() {

    useEffect(()=> {
        window.scrollTo({top:0})
    }, [])

    return ''
}

export default ScrollToTop