import TextareaAutosize from 'react-textarea-autosize';
import React, { ChangeEventHandler, Ref } from 'react';

type Props = {
  placeholder: string
  ref?: Ref<HTMLTextAreaElement>
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
  value?: string | ReadonlyArray<string> | number | undefined
}

const PostTextarea = (props: Props) => {
  return (
      <TextareaAutosize
        placeholder={props.placeholder}
        ref={props.ref}
        onChange={props.onChange}
        value={props.value}
        // インラインスタイル許してくれ
        style={{
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: "24px",
          backgroundColor: "#FFFFFF00",
          resize: "none",
          outlineWidth: "0px"
        }}
      // variant='unstyled'
      // fontSize={"20px"}
      // resize={'none'}
      />
  );
};

export default PostTextarea;
