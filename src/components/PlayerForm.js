import {Button, Container, FloatingLabel, Form, Toast} from "react-bootstrap";
import {usePlayerContext} from "../contexts/PlayersContext";

export function PlayerForm () {
    const {players, updatePlayers, checkNameAvailability, setErrorToast} = usePlayerContext()

    console.log('player form render')

    const toggleVariant = (e) => {
        e.classList.toggle('btn-outline-success');
        e.classList.toggle('btn-success')
    }

    const playerSubmit = () => {
        const playerName = document.getElementById('playerName').value
        console.log(playerName)
        // console.log(players.some(p=>p.name === playerName))
        if (checkNameAvailability(playerName)) {
            players.push({name: playerName, cards: [], uno: false, calledUno: false, gamesWon: 0})
            updatePlayers(players)
            document.getElementById('playerName').value = ''
        } else {
            setErrorToast({state: true, message:`'${playerName}' is already taken, please choose another name`})
        }
        console.log(players)
    }

    return <Container style={{maxWidth: '500px'}}>
        <fieldset className={'border px-3 px-sm-5 py-3'}>
            <legend>
                <h1 className={'text-white mx-1 mx-sm-3'}>Create new player</h1>
            </legend>
            <ErrorToast/>
            <Form onSubmit={()=>playerSubmit()}>
                <FloatingLabel label={'Player name'}
                               controlId={'playerName'}
                               className={'mb-3'}>
                    <Form.Control type={'text'}
                                  placeholder={'Player name'}
                                  className={'user-select-none'}
                                  required/>
                </FloatingLabel>
                <div className={'text-center'}>
                    <Button variant={'outline-success'} onMouseOut={(e)=>toggleVariant(e.currentTarget)} onMouseOver={(e)=>toggleVariant(e.currentTarget)} className={'w-75 border-success border-3'} type={'submit'} style={{maxWidth: '250px'}}>Add player</Button>
                </div>
            </Form>
        </fieldset>
    </Container>
}

function ErrorToast() {
    const {errorToast, setErrorToast} = usePlayerContext()

    return <Toast bg={'danger'} className={'text-white w-100'} onClose={()=>setErrorToast({state:false, message:''})} show={errorToast.state} delay={3000} autohide>
        <Toast.Body>
            {errorToast.message}
        </Toast.Body>
    </Toast>
}