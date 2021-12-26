import React, { ChangeEvent, KeyboardEventHandler } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type Props = {
    value: string
    placeholder: string
    onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onKeyPress: KeyboardEventHandler<HTMLTextAreaElement>
}

const AddComponent = ({
    value,
    placeholder,
    onInputChange,
    onKeyPress,
}: Props) => {
    return (
        <TextareaAutosize
            className="m-auto resize-none text-center rounded text-sm"
            value={value}
            placeholder={placeholder}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
        />
    )
}

export default AddComponent
