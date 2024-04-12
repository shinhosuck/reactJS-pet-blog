import { NavLink } from "react-router-dom"


function NavbarTopics(props) {
    const { topics, setShowNavLinks } = props

    return (
        <>
            <div className='navbar-topics lg-navbar-topics'>
                {topics && topics.map((topic)=> {
                    return (
                        <NavLink 
                            onClick={()=> {
                                setShowNavLinks && setShowNavLinks(false)
                                document.querySelector('.bg-overlay').classList.add('hide-bg-overlay')
                                document.body.style.overflow = 'auto'
                            }}
                            className={({isActive})=>isActive?'active-navbar-topic-link navbar-topic-link':'navbar-topic-link'}
                            to={`/topic/${topic.name}/posts/?filter=${topic.name}`} state={{topic:topic.name}} key={topic.id}
                        >
                            {topic.name}
                        </NavLink>
                    )
                })}
            </div>
        </>
    )
}

export default NavbarTopics