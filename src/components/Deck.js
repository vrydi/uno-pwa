import {useDeckContext} from "../contexts/DeckContext";
import {Button, Container} from "react-bootstrap";

export function DeckView () {
    const {gameStart} = useDeckContext()

    return <Container>
        <Button onClick={()=>gameStart()}>Start game</Button>

        {/*<Row>*/}
        {/*    {allCards && allCards.map((card, i)=> <UnoCard card={card} key={i}/>)}*/}
        {/*</Row>*/}
    </Container>
}