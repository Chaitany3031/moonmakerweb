
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { BsPostcardHeartFill } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { GrProjects } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Aside({ asideOpen, handleAsideOpen }) {
        const router = useRouter()
        const [clicked, setClicked] = useState(false)
        const [activeLink, setActiveLink] = useState('/')
        const handleClicked = () => {
                setClicked(!clicked)
        }
        const handleLinkClicked = (link) => {
                setActiveLink(prevActive => (prevActive === link ? null : link))
                setClicked(false)
        }
        useEffect(() => {
                setActiveLink(router.pathname)
        }, [router.pathname])

        return <>
                <aside className={asideOpen?"asideleft active":'asideleft'}>
                        <ul>
                                <Link href='/'>
                                        <li className="navactive">
                                                <IoHomeSharp />
                                                <span>Dashboard</span>
                                        </li>
                                </Link>
                                <li className={activeLink === '/blogs' ? "navactive flex-col flex-left" : 'flex-col flex-left'} onClick={() => handleLinkClicked('/blogs')}>
                                        <div className="flex gap-1">
                                                <BsPostcardHeartFill />
                                                <span>Blogs</span>
                                        </div>
                                        {activeLink === '/blogs' && (<ul>
                                                <Link href='/blogs'><li>All Blogs</li></Link>
                                                <Link href='/blogs/draft'><li>Draft Blogs</li></Link>
                                                <Link href='/blogs/addblog'><li>Add Blogs</li></Link>
                                        </ul>)}
                                </li>
                                <li className={activeLink === '/projects' ? "navactive flex-col flex-left" : 'flex-col flex-left'} onClick={() => handleLinkClicked('/projects')}>
                                        <div className="flex gap-1">
                                                <GrProjects />
                                                <span>Projects</span>
                                        </div>
                                        {activeLink === '/projects' && (<ul>
                                                <Link href='/projects'><li>All Projects</li></Link>
                                                <Link href='/projects/draftprojects'><li>Draft Projects</li></Link>
                                                <Link href='/projects/addproject'><li>Add Projects</li></Link>
                                        </ul>)}
                                </li>
                                <li className={activeLink === '/shops' ? "navactive flex-col flex-left" : 'flex-col flex-left'} onClick={() => handleLinkClicked('/shops')}>
                                        <div className="flex gap-1">
                                                <FaShoppingBag />
                                                <span>Shop</span>
                                        </div>
                                        {activeLink === '/shops' && (<ul>
                                                <Link href='/shops'><li>All Products</li></Link>
                                                <Link href='/shops/draftshop'><li>Draft Products</li></Link>
                                                <Link href='/shops/addproduct'><li>Add Products</li></Link>
                                        </ul>)}
                                </li>
                                <li className={activeLink === '/gallery' ? "navactive flex-col flex-left" : 'flex-col flex-left'} onClick={() => handleLinkClicked('/gallery')}>
                                        <div className="flex gap-1">
                                                <GrProjects />
                                                <span>Gallery</span>
                                        </div>
                                        {activeLink === '/gallery' && (<ul>
                                                <Link href='/gallery'><li>All Photos</li></Link>
                                                <Link href='/gallery/addphoto'><li>Add Photos</li></Link>
                                        </ul>)}
                                </li>
                                <Link href='/contacts'>
                                        <li className={activeLink === '/contacts' ? "navactive" : ''} onClick={() => handleLinkClicked('/contacts')}>
                                                <IoMdContact />
                                                <span>Contacts</span>
                                        </li>
                                </Link>
                                <Link href='/setting'>
                                        <li className={activeLink === '/setting' ? "navactive" : ''} onClick={() => handleLinkClicked('/setting')}>
                                                <IoSettingsSharp />
                                                <span>Settings</span>
                                        </li>
                                </Link>
                        </ul>
                        <button className="logoutbtn">Logout</button>
                </aside>

        </>


}