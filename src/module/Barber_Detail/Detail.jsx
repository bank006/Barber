import Location from "./Location"
import CommentMain from "./CommentMain";
// import FieldMain from "./FieldMain";
// import Field  from "./Field";
import Info from "./info";
import { useLocation } from "react-router-dom";



export default function Detail(){
    const location = useLocation();
    const {data} =  location.state
    return(
        <>
        
        {/* <FieldMain/>
        <Field/> */}
        <Info data={data}/>
        <Location/>
        <CommentMain/>
        </>
    );
}
