import Aside from "./Aside";
import Header from "./Header";


function ParentComponent(props) {
    return (
        <div>
         <Header handleAsideOpen={props.asideOpen} />
         <Aside asideOpen={props.appOpen} handleAsideOpen={props.asideOpen}/>
        </div>
    );
}

export default ParentComponent;
