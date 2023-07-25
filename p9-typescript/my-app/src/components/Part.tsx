import {assertNever, CoursePart} from "../types";
import {JSX} from "react";
import GenericPart from "./GenericPart";

interface PartProps{
    part: CoursePart
}
const Part = (props: PartProps): JSX.Element => {
    switch (props.part.kind){
        case "background": return <GenericPart part={props.part} description={props.part.description} additional={props.part.backgroundMaterial}/>
        case "basic": return <GenericPart part={props.part} description={props.part.description} />
        case "group": return <GenericPart part={props.part} additional={`project exercises: ${props.part.groupProjectCount}`}/>
        case "special": return <GenericPart part={props.part} description={props.part.description} additional={`required skills: [${props.part.requirements.join(", ")}]`}/>
        default: return assertNever(props.part)
    }
}
export default Part