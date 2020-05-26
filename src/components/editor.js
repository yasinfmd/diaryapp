import React from "react";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const MyEditor = (props) => <SimpleMDEReact label={props.label} value={props.value}
                                            onChange={props.onChange}
                                            options={{autofocus: false, spellChecker: true,}}/>
export default MyEditor
