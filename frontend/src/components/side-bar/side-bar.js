import './side-bar.scss'

import { Component } from 'react'

class SideBar extends Component {

    render() {
        const { active } = this.props

        return (
            <div id="side-bar" className={active ? 'active' : ''}>
                <ul className="side-bar-links">
                    <li><a href="#home">Contacts</a></li>
                    <li><a href="#about">Instruction</a></li>
                    <li><a href="#contact">Socials</a></li>
                </ul>
                <div id="developer">Andrew Muryn©</div>
            </div>
        )
    }
}

export default SideBar