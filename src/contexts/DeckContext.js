import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";

const DeckContext = createContext()

const cardDeck = [
    {
        cardType: 'normal',
        cardAmount: 1,
        cardColour: 'red',
        cardText: '0'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '1'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '2'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '3'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '4'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '5'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '6'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '7'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '8'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '9'
    },
    {
        cardType: 'normal',
        cardAmount: 1,
        cardColour: 'yellow',
        cardText: '0'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '1'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '2'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '3'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '4'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '5'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '6'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '7'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '8'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '9'
    },
    {
        cardType: 'normal',
        cardAmount: 1,
        cardColour: 'blue',
        cardText: '0'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '1'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '2'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '3'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '4'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '5'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '6'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '7'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '8'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '9'
    },
    {
        cardType: 'normal',
        cardAmount: 1,
        cardColour: 'green',
        cardText: '0'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '1'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '2'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '3'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '4'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '5'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '6'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '7'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '8'
    },
    {
        cardType: 'normal',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '9'
    },
    {
        cardType: 'special',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '+2'
    },
    {
        cardType: 'special',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '+2'
    },
    {
        cardType: 'special',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '+2'
    },
    {
        cardType: 'special',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '+2'
    },
    {
        cardType: 'special',
        cardIcon: 'fas fa-sync-alt',
        cardAmount: 2,
        cardColour: 'red',
        cardText: '<=>'
    },
    {
        cardType: 'special',
        cardIcon: 'fas fa-sync-alt',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: '<=>'
    },
    {
        cardType: 'special',
        cardIcon: 'fas fa-sync-alt',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: '<=>'
    },
    {
        cardType: 'special',
        cardIcon: 'fas fa-sync-alt',
        cardAmount: 2,
        cardColour: 'green',
        cardText: '<=>'
    },
    {
        cardType: 'special',
        cardIcon: 'far fa-times-circle',
        cardAmount: 2,
        cardColour: 'red',
        cardText: 'x'
    },
    {
        cardType: 'special',
        cardIcon: 'far fa-times-circle',
        cardAmount: 2,
        cardColour: 'yellow',
        cardText: 'x'
    },
    {
        cardType: 'special',
        cardIcon: 'far fa-times-circle',
        cardAmount: 2,
        cardColour: 'blue',
        cardText: 'x'
    },
    {
        cardType: 'special',
        cardIcon: 'far fa-times-circle',
        cardAmount: 2,
        cardColour: 'green',
        cardText: 'x'
    },
    {
        cardType: 'wildcard',
        cardIcon: 'fab fa-superpowers',
        cardAmount: 4,
        cardColour: 'black',
        cardText: 'wild'
    },
    {
        cardType: 'wildcard',
        cardAmount: 4,
        cardColour: 'black',
        cardText: '+4'
    }
]

export function DeckProvider(props) {
    const [deck] = useState(cardDeck)
    const [allCardsDeck, setAllCArdsDeck] = useState([])
    
    const getAllCards = useCallback(()=>{
        const tempArray = []
        let id = 0

        cardDeck.forEach((card)=>{
            for (let i = 0; i < card.cardAmount; i++) {
                const newCard = {...card}
                newCard.cardID = id
                id += 1
                tempArray.push(newCard)
            }
        })
        console.log('getallcards', tempArray)
        setAllCArdsDeck(tempArray)
    }, [])

    useEffect(()=>{
        if (allCardsDeck.length === 0) getAllCards()
        console.log('useffect', allCardsDeck)
    }, [allCardsDeck, getAllCards])

    const api = useMemo(()=>({
        deck,
        allCardsDeck
    }), [allCardsDeck, deck])

    return <DeckContext.Provider value={api}>
        {props.children}
    </DeckContext.Provider>
}

export const useDeckContext = () => useContext(DeckContext)