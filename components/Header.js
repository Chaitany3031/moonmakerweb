import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";

export default function Header({handleAsideOpen}) {
  const [isFullScreen, setisFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setisFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setisFullScreen(false);
      });
    }
  };
  return (
    <>
      <header className="header flex flex-sb">
        <div className="logo flex gap-2">
          <h1>ADMIN</h1>
          <div className="headerham flex flex-center" onClick={handleAsideOpen}>
            <GiHamburgerMenu />
          </div>
        </div>
        <div className="rightnav flex gap-2">
          <div onClick={toggleFullScreen}>
            {isFullScreen ? <MdFullscreen /> : <MdFullscreenExit />}
          </div>
          {/* <div className="notification">
          <img src="/img/notification.png" alt="notification"/>
          </div>
          <div className="profilenav">
          <img src="/img/user.png" alt="user"/>
          </div> */}
        </div>
      </header>
    </>
  );
}
