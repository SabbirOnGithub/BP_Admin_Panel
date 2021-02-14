import React from 'react'
import { Editor } from 'react-draft-wysiwyg';


export default function RichTextEditor(props) {

    const { editorState, name, onEditorStateChange, placeholder, ...other } = props;
    return (

        <div style={{ maxWidth: '90%', border: '1px solid lightGrey', padding: 5, borderRadius: 5 }} className='MuiFormControl-root'>
            <Editor
                wrapperClassName="rich-editor demo-wrapper"
                editorClassName="demo-editor"
                placeholder={placeholder ? placeholder : "The message goes here..."}
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
                {...other}
                editorStyle={{ minHeight:'10em' }}
            />
        </div>
    )
}
