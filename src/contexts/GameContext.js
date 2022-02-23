import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useDeckContext} from "./DeckContext";
import {usePlayerContext} from "./PlayersContext";

const GameContext = createContext()

export function GameProvider(props) {
    const [currentDeck, setCurrentDeck] = useState([])
    const [turn, setTurn] = useState(0)
    const [topCard, setTopCard] = useState({})
    const [playedDeck, setPlayedDeck] = useState([])
    const [message, setMessage] = useState('')
    const [colourModalShow, setColourModalShow] = useState({state: false, card: {}})
    const [gameStarted, setGameStarted] = useState(false)
    const [nextTurnScreen, setNextTurnScreen] = useState({state: false, skip: false, reversed: false})
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [yourTurnScreen, setYourTurnScreen] = useState(true)
    const [winner, setWinner] = useState({})
    
    const {players, updatePlayers} = usePlayerContext()

    const {allCardsDeck} = useDeckContext()

    const dealing = useCallback((cardsArray)=>{
        console.log('players before dealing', players)
        players.forEach((player, i)=>{
            console.log('player', player)
            const playerCardsArray = []

            for (let j = 0; j < 7; j++) {
                const randomNumber = Math.floor(Math.random() * cardsArray.length)
                const randomCard = cardsArray[randomNumber]
                playerCardsArray.push(randomCard)
                cardsArray = cardsArray.filter(card=>card.cardID !== randomCard.cardID)
            }
            player.turnID = i
            player.cards = playerCardsArray
        })
        let firstCard = cardsArray.shift()
        while (firstCard.cardType === 'special') {
            const played = playedDeck
            played.push(firstCard)
            setPlayedDeck(played)
            firstCard = cardsArray.shift()
        }
        setTopCard(firstCard)

        console.log('players after dealing', players)
        console.log('deck after dealing', cardsArray)
        console.log('top card', firstCard)
        updatePlayers(players)
        setCurrentDeck(cardsArray)

    }, [playedDeck, players, updatePlayers])

    const shuffleDeck = useCallback(()=>{
        const newDeck = []
        let helpDeck = [...allCardsDeck]
        console.log('shuffledeck', allCardsDeck, helpDeck)

        while (newDeck.length < allCardsDeck.length) {
            const randomNumber = Math.floor(Math.random() * helpDeck.length)
            console.log('random number', randomNumber)
            const randomElement = helpDeck[randomNumber]
            helpDeck = helpDeck.filter(card=>card.cardID !== randomElement.cardID)
            newDeck.push(randomElement)
            console.log('shuffledeck forloop', randomElement, helpDeck, newDeck)
        }

        console.log('shuffled deck', allCardsDeck, newDeck)

        return newDeck
    }, [allCardsDeck])

    const reshuffleDeck = useCallback((deck)=>{
        const newDeck = []
        const helpDeck = deck

        for (let i = 0; i < helpDeck.length; i++) {
            const randomNumber = Math.floor(Math.random() * helpDeck.length)
            const randomElement = helpDeck[randomNumber];
            helpDeck.filter(card=>card.cardID !== randomElement.cardID)
            newDeck.push(randomElement)
        }
        console.log('shuffled deck', newDeck)
        return newDeck
    }, [])

    const gameStart = useCallback(()=>{
        const cardsArray = shuffleDeck()

        dealing(cardsArray)
        setCurrentPlayer(players[turn])
        setGameStarted(true)

    }, [dealing, players, shuffleDeck, turn])

    const restartGame = useCallback(()=>{
        console.log('restartgame')
        setTurn(0)
        setTopCard({})
        setPlayedDeck([])
        setCurrentDeck([])
        setMessage('')
        setColourModalShow({state: false, card: {}})
        setGameStarted(false)
        setNextTurnScreen({state: false, skip: false, reversed: false})
        setCurrentPlayer(null)
        setYourTurnScreen(true)
        setWinner({})
    }, [])

    const endGame = useCallback(()=>{
        console.log('endgame');
        const winner = players.filter(player => player.cards.length === 0)[0]
        winner.gamesWon += 1
        players[winner.turnID] = winner
        updatePlayers(players)
        setWinner(winner)
    }, [players, updatePlayers])

    const checkUno = useCallback((player)=> {
        player.uno = player.cards.length === 1
        player.calledUno = false
        return player.uno
    }, [])

    const nextTurn = useCallback(()=>{
        console.log('next turn')
        setMessage(null)
        let toGoTurns = 1;
        if (nextTurnScreen.skip) toGoTurns = 2
        if (nextTurnScreen.reversed) toGoTurns *= -1
        
        //0 1 2 3 4
        //1 2 3 4 5
        //turn 2 skip => turn 4
        //turn 3 skip => turn + toGoTurn === length => turn + togoturn - length => 0
        //turn 4 skip => turn + toGoTurn > length => turn + togoturn - length => 1
        //turn 0 skip => turn + togoturn < 0 => 0 - 2 + length => 3
        
        if (turn + toGoTurns >= players.length) {
            setTurn(turn + toGoTurns - players.length)
            setCurrentPlayer(players[turn + toGoTurns - players.length])
        } else if (turn + toGoTurns < 0) {
            setTurn(turn + toGoTurns + players.length)
            setCurrentPlayer(players[turn + toGoTurns + players.length])
        } else {
            setTurn(turn + toGoTurns)
            setCurrentPlayer(players[turn + toGoTurns])
        }
        setNextTurnScreen({state: false, skip: false, reversed: nextTurnScreen.reversed})
        setYourTurnScreen(true)
    }, [nextTurnScreen, players, turn])

    const drawCard = useCallback( (playerID, amount, uno, draw) => {
        if (gameStarted && !nextTurnScreen.state) {
            // amount = 4
            // length = 3
            const player = players[playerID]
            if (currentDeck.length < amount) {
                setMessage('No cards to draw')
                amount = currentDeck.length
            }

            let playableCards = false
            if (draw) {
                player.cards.forEach(card=>{
                    if (card.cardType === 'wildcard' || card.cardColour === topCard.cardColour || card.cardText === topCard.cardText) {
                        setMessage('There is a card you can play')
                        playableCards = true
                    }
                })
            }
            if (!playableCards){
                for (let i = 0; i < amount; i++) {
                    player.cards.push(currentDeck.shift())

                    players[player.turnID] = player
                    checkUno(player)
                    console.log('uno check', checkUno(player))
                    updatePlayers(players)
                    setCurrentDeck(currentDeck)
                }
                if (!uno) setNextTurnScreen({state:true, skip: false, reversed: nextTurnScreen.reversed})
                else setYourTurnScreen(false)
            }
        }
    }, [checkUno, currentDeck, gameStarted, nextTurnScreen.reversed, nextTurnScreen.state, players, topCard.cardColour, topCard.cardText, updatePlayers])

    const playCard = useCallback((card) => {
        console.log('play card', card, currentPlayer)

        if (card.cardText === topCard.cardText || card.cardColour === topCard.cardColour || card.cardText === 'wild' || card.cardText === '+4') {
            //clear error message
            setMessage(null)
            //add card to the played deck
            const played = playedDeck
            played.push(card)
            setPlayedDeck(played)
            //set new top card
            setTopCard(card)
            //remove played card from players hand
            for (let i = 0; i < currentPlayer.cards.length; i++) {
                if (card.cardID === currentPlayer.cards[i].cardID) {
                    currentPlayer.cards.splice(i, 1)
                }
            }
            if (currentPlayer.cards.length === 0) endGame()
            players[currentPlayer.turnID] = currentPlayer
            checkUno(currentPlayer)
            console.log('uno check', checkUno(currentPlayer))
            setCurrentPlayer(currentPlayer)
            updatePlayers(players)

            if (card.cardType === 'special' || card.cardType === 'wildcard') {
                switch (card.cardText) {
                    case 'x':
                        setNextTurnScreen({state: true, skip: true, reversed: nextTurnScreen.reversed})
                        break
                    case '<=>':
                        setNextTurnScreen({state: true, skip: players.length === 2, reversed: !nextTurnScreen.reversed})
                        break
                    case '+2':
                        if (nextTurnScreen.reversed){
                            if (turn - 1 < 0) {
                                drawCard(players.length -1, 2)
                            } else {
                                drawCard(turn - 1, 2)
                            }
                        } else {
                            if (turn + 1 === players.length) {
                                drawCard(0, 2)
                            } else {
                                drawCard(turn + 1, 2)
                            }
                        }
                        setNextTurnScreen({state: true, skip: false, reversed: nextTurnScreen.reversed})
                        break
                    case '+4':
                        if (nextTurnScreen.reversed){
                            if (turn - 1 < 0) {
                                drawCard(players.length -1, 4)
                            } else {
                                drawCard(turn - 1, 4)
                            }
                        } else {
                            if (turn + 1 === players.length) {
                                drawCard(0, 4)
                            } else {
                                drawCard(turn + 1, 4)
                            }
                        }
                        console.log('wild +4')
                        setColourModalShow({state:true, card: card})
                        break
                    case 'wild':
                        console.log('wild')
                        setColourModalShow({state:true, card: card})
                        break
                    default:
                        setNextTurnScreen({state: true, skip: false, reversed: nextTurnScreen.reversed})
                }

            } else {
                setNextTurnScreen({state: true, skip: false, reversed: nextTurnScreen.reversed})
            }
        } else {
            setMessage('This card is not playable')
        }
    }, [checkUno, currentPlayer, drawCard, endGame, nextTurnScreen.reversed, playedDeck, players, topCard.cardColour, topCard.cardText, turn, updatePlayers])

    const callUno = useCallback(()=>{
        currentPlayer.calledUno = true
        setCurrentPlayer(currentPlayer)
        players[currentPlayer.turnID] = currentPlayer
        updatePlayers(players)
        nextTurn()
    }, [currentPlayer, nextTurn, players, updatePlayers])

    const reportUno = useCallback((playerID)=>{
        const player = players[playerID]
        if (player.uno && !player.calledUno) {
            drawCard(playerID, 2, true)
        } else {
            setMessage(`${player.name} has called UNO`)
        }
    }, [drawCard, players])
    
    useEffect(()=>{
        if (gameStarted) {
            if (currentDeck.length < 1){
                setCurrentDeck(reshuffleDeck(playedDeck))
                setPlayedDeck([])
                if (playedDeck.length < 1) {
                    setMessage('No cards to draw')
                }
            }
        }
        console.log('gamecontext rerender')
    }, [currentDeck.length, gameStarted, playedDeck, players, reshuffleDeck])

    const api = useMemo(()=>({
        currentDeck,
        gameStart,
        topCard,
        turn,
        playedDeck,
        message,
        playCard,
        drawCard,
        colourModalShow,
        setColourModalShow,
        setTopCard,
        nextTurn,
        nextTurnScreen,
        setNextTurnScreen,
        gameStarted,
        currentPlayer,
        callUno,
        yourTurnScreen,
        setYourTurnScreen,
        reportUno,
        winner,
        restartGame
    }), [currentDeck, gameStart, topCard, turn, playedDeck, message, playCard, drawCard, colourModalShow, nextTurn, nextTurnScreen, gameStarted, currentPlayer, callUno, yourTurnScreen, reportUno, winner, restartGame])

    return <GameContext.Provider value={api}>
        {props.children}
    </GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext)