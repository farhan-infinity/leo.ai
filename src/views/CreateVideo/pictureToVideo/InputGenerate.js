import { Button, InputGroup, Input } from 'reactstrap'

const InputGenerate = () => {
    return (
        <InputGroup>
            <Button disabled color='primary' outline>
                A portrait of
            </Button>
            <Input type='text' placeholder="Describe the presenter you'd like to create" />
            <Button color='primary' outline>
                Generate
            </Button>
        </InputGroup>
    )
}

export default InputGenerate