import {JSX} from "react";
import {CoursePart} from "../types";
import Part from "./Part";

export interface ContentProps {
    courseParts: CoursePart[];
}
const Content = (props:ContentProps):JSX.Element => {
    return <section>
        {props.courseParts.map(cp => <Part key={cp.name} part={cp}/>)}
    </section>

}

export default Content