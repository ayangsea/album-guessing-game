import { React } from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {

    return (
        <nav className="navbar">
            <Link to="/" className="siteTitle">Album Ranking Game</Link>
            <ul>
                <CustomLink to="/lobby">Lobby</CustomLink>
                <CustomLink to="/about">About</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props} ) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname,})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}