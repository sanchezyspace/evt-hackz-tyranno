import { Box, HStack, Image, Spacer, VStack } from '@chakra-ui/react';
import PostTextarea from '@/app/_components/ui/PostTextarea';
import { ChangeEventHandler, MouseEventHandler, Ref } from 'react';
import PostingButton from './PostingButton';

type Props = {
    userAvatarUrl: string
    placeholder: string
    formRef?: Ref<HTMLTextAreaElement>
    formValue?: string | ReadonlyArray<string> | number | undefined
    onPostButtonClick?: MouseEventHandler<HTMLButtonElement>
    onFormChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined

}

const PostingForm = (props: Props) => {
    return (
        <Box alignContent='center' width={'100%'} padding={4}>
            <HStack
                alignItems={'flex-start'}
                gridGap={'1'}
                justifyContent={'stretch'}
                flexGrow={1}
            >
                <Image
                    borderRadius='full'
                    boxSize='48px'
                    src={props.userAvatarUrl}
                    alt='User Icon'
                    marginRight={2}
                />
                <VStack
                    flexGrow={'1'}
                    gridGap={'1'}
                    alignItems={'stretch'}
                    justifyContent={'stretch'}
                >
                    <PostTextarea
                        placeholder={props.placeholder}
                        ref={props.formRef}
                        onChange={props.onFormChange}
                        value={props.formValue}
                    />
                    <HStack>
                        <Spacer />
                        <PostingButton onClick={props.onPostButtonClick} height='45px' width='175px'/>
                    </HStack>
                </VStack>
            </HStack>
        </Box >
    );
};

export default PostingForm;
