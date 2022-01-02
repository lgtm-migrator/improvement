import React, { ChangeEvent, KeyboardEventHandler } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type Props = {
    addRef: React.RefObject<HTMLTextAreaElement>
    name: string
    value: string
    placeholder: string
    onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onKeyPress: KeyboardEventHandler<HTMLTextAreaElement>
}

const AddComponent = ({
    addRef,
    name,
    value,
    placeholder,
    onInputChange,
    onKeyPress,
}: Props) => {
    return (
        <TextareaAutosize
            ref={addRef}
            name={name}
            className="resize-none text-center rounded text-sm"
            value={value}
            placeholder={placeholder}
            onChange={onInputChange}
            onKeyUp={(e) => e.key === 'Escape' && addRef.current?.blur()}
            onKeyPress={onKeyPress}
        />
    )
}

export default AddComponent
