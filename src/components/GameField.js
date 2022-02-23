import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {useGameContext} from "../contexts/GameContext";
import {UnoCard} from "./UnoCard";
import {useEffect} from "react";
import {usePlayerContext} from "../contexts/PlayersContext";
import useWindowDimensions from "../contexts/WindowContext";

export function GameField() {
    const {gameStart, turn, currentPlayer, nextTurnScreen, yourTurnScreen, gameStarted, message} = useGameContext()
    const {players} = usePlayerContext()

    useEffect(() => {
        console.log('rerender', players, turn, currentPlayer, nextTurnScreen)
    })

    return <div>
        {!gameStarted && <div className={'text-center'}>
            <Button onClick={() => gameStart()}>Start game</Button>
        </div>}

        <div>
            <DeckSpace/>
            <hr className={'text-white'}/>
            {currentPlayer && <>
                {nextTurnScreen.state ? <TurnScreen/> : yourTurnScreen ? <YourTurnScreen/> : <PlayerScreen/>}
            </>}
            <p className={'text-danger text-center'}>{message}</p>
        </div>
    </div>
}

function DeckSpace() {
    const {topCard, currentDeck, playedDeck, drawCard, turn} = useGameContext()
    const { players } = usePlayerContext()
    const {width} = useWindowDimensions()
    
    console.log('---- dimensions', width)

    if (width < 438) {
        return <div>
                <ColourModal />
                <Row className="pt-5">
                    <Col className={'my-auto'}>
                        <p className={'text-white text-center'}>Cards left in deck</p>
                        <UnoCard card={{ cardColour: 'black', cardText: currentDeck.length > 0 ? currentDeck.length : '#' }}
                            className={'deckCard user-select-none'} onClickFunction={() => drawCard(turn, 1, false, true)} />
                    </Col>
                    <Col className={'my-auto'}>
                        <p className={'text-white text-center'}>Cards played</p>
                        <UnoCard card={{ cardColour: 'black', cardText: playedDeck.length > 0 ? playedDeck.length : '#' }}
                            className={'user-select-none'} />
                    </Col>
                    <Col className={'my-auto'}>
                        <p className={'text-white text-center'}>Current card</p>
                        <UnoCard card={topCard} className={'user-select-none'} />
                    </Col>
                </Row>
            <Container>{players.map((player, i) => <p key={i}
                className={'text-white justify-content-between text-center'}>{player.calledUno ? `${player.name} called uno` : ''}</p>)}
            </Container>
            </div>
    } else {
        return <div>
            <div className={'d-flex align-content-center pt-5'}>
                <ColourModal />
                <Col className={'my-auto'}>
                    <p className={'text-white text-center'}>Cards left in deck</p>
                    <UnoCard card={{ cardColour: 'black', cardText: currentDeck.length > 0 ? currentDeck.length : '#' }}
                        className={'deckCard user-select-none'} onClickFunction={() => drawCard(turn, 1, false, true)} />
                </Col>
                <Col className={'my-auto'}>
                    <p className={'text-white text-center'}>Current card</p>
                    <UnoCard card={topCard} className={'user-select-none'} />
                </Col>
                <Col className={'my-auto'}>
                    <p className={'text-white text-center'}>Cards played</p>
                    <UnoCard card={{ cardColour: 'black', cardText: playedDeck.length > 0 ? playedDeck.length : '#' }}
                        className={'user-select-none'} />
                </Col>
            </div>
            <Container>{players.map((player, i) => <p key={i}
                className={'text-white justify-content-between text-center'}>{player.calledUno ? `${player.name} called uno` : ''}</p>)}
            </Container>
        </div>
    }
}

function ColourModal() {
    const {colourModalShow, setColourModalShow, setTopCard, setNextTurnScreen, nextTurnScreen} = useGameContext()

    const pick = (colour) => {
        colourModalShow.card.cardColour = colour
        setTopCard(colourModalShow.card)
        setColourModalShow({state: false, card: {}})
        if (colourModalShow.card.cardText === 'wild') {
            setNextTurnScreen({state: true, skip: false, reversed: nextTurnScreen.reversed, wildCard: true})
        } else {
            setNextTurnScreen({state: true, skip: true, reversed: nextTurnScreen.reversed, wildCard: true})
        }
    }

    return <Modal show={colourModalShow.state} onHide={() => console.log('hide')}>
        <Modal.Header>
            <Modal.Title>Choose your colour</Modal.Title>
        </Modal.Header>
        <div className={'p-5'}>
            <div className={'d-flex justify-content-center'}>
                <div style={{height: '150px', width: '150px'}} className={'red colourPicker'}
                     onClick={() => pick('red')}/>
                <div style={{height: '150px', width: '150px'}} className={'blue colourPicker'}
                     onClick={() => pick('blue')}/>
            </div>
            <div className={'d-flex justify-content-center'}>
                <div style={{height: '150px', width: '150px'}} className={'yellow colourPicker'}
                     onClick={() => pick('yellow')}/>
                <div style={{height: '150px', width: '150px'}} className={'green colourPicker'}
                     onClick={() => pick('green')}/>
            </div>
        </div>
    </Modal>
}

function PlayerScreen() {
    const {currentPlayer, playCard} = useGameContext()

    return <>
        <div>
            <h1 className={'text-white text-center text-capitalize'}>{currentPlayer.name}</h1>
            <Row>
                {currentPlayer.cards.map((card, j) => <UnoCard card={card} key={j}
                                                               className={'handCard user-select-none'}
                                                               onClickFunction={() => playCard(card)}/>)}
            </Row>
        </div>

    </>
}

function TurnScreen() {
    const {currentPlayer, nextTurn, colourModalShow, callUno, winner} = useGameContext()
    console.log('winner', winner)
    return <>
        {winner.name !== undefined ? <EndScreen/> : <div>
            <h1 className={'text-center text-white mb-3 text-uppercase'}>{currentPlayer.name}</h1>
            <Container className={'text-center'}>
                <Button className={`d-block mx-auto ${currentPlayer.uno ? '' : 'disabled'}`} style={{width: '250px'}}
                        onClick={() => callUno()}>Call uno</Button>
                <Button variant={'success'} className={'d-block mx-auto'} style={{width: '250px'}}
                        onClick={() => nextTurn()}>Next turn</Button>
            </Container>
            {colourModalShow.state && <PlayerScreen/>}
        </div>}
    </>
}

function YourTurnScreen() {
    const {currentPlayer, setYourTurnScreen, reportUno} = useGameContext()
    const {players} = usePlayerContext()
    const unoPlayers = players.filter(player => player.cards.length === 1)

    return <Container>
        <h1 className={'text-center text-white mb-3 text-uppercase'}>{`${currentPlayer.name}'s turn`}</h1>
        <div className={'text-center'}>
            <Button onClick={() => setYourTurnScreen(false)} style={{width: '250px'}}>Start turn</Button>
        </div>
        {unoPlayers.length > 0 && <>
            <h3 className={'text-center text-white mb-3 text-uppercase'}>Forgot to say uno?</h3>
            <Container>
                {unoPlayers.map((player, i) => <Button key={i} className={'d-block mx-auto'} style={{width: '250px'}} onClick={()=>reportUno(player.turnID)}>{player.name}</Button>)}
            </Container>
        </>}
    </Container>
}

function EndScreen() {
    const {winner, restartGame} = useGameContext()
    console.log('winner in endscreen', winner)
    return <Container>
        <h1 className={'text-center text-white mb-3 text-uppercase'}>{winner.name} has won</h1>
        <div className={'text-center'}>
            <Button onClick={()=>restartGame()}>Start a new game</Button>
        </div>
    </Container>
}