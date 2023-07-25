import {CoursePart} from "../types";
import {JSX} from "react";

interface GenericPartProps {
    part: CoursePart;
    description?: string
    additional?: string
}
const GenericPart = (props: GenericPartProps): JSX.Element => {
    return <section>
        <h3>{props.part.name} {props.part.exerciseCount}</h3>
        {props.description ? <i>{props.description}</i>: null}
        {props.additional ? <p>{props.additional}</p>:null}
    </section>
}

export default GenericPart