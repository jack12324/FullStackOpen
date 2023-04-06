const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}
export const Course = ({course}) => (
    <section className='course'>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </section>
)
const Content = ({parts}) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </>
    );
};
const Part = ({part}) => (
    <p>
        {part.name} {part.exercises}
    </p>
)
const Total = ({parts}) => (
    <b>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</b>
)