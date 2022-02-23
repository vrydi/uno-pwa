import {Container} from "react-bootstrap";
import {PlayerForm} from "./PlayerForm";
import {PlayerOverview} from "./PlayerOverview";

export function HomePage() {
    console.log('home page render')

    return <Container className={'my-5'}>
        <PlayerForm/>
        <PlayerOverview/>
    </Container>
}