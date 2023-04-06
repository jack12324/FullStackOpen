import React from "react";

export const Note = ({note}) => {
    return (
        <li>{note.content}</li>
    );
};

export default Note