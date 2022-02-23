import {Card, Col} from "react-bootstrap";

export function UnoCard (props) {
    const {card, className, onClickFunction} = props

    return <Col className={className}>
            <Card className={`unoCard ${card.cardColour} mb-3 mx-auto`} onClick={onClickFunction}>
                <div className={'gridContainerUnoCard'}>
                    <div className={'firstItem unoText'}>{card.cardIcon ? <i className={`${card.cardIcon}`}/> : card.cardText}</div>
                    <div className={'secondItem cardImage unoText'}>
                        {card.cardText === '+4' || card.cardText === 'wild' ?
                            <><span className="gridRed"/>
                            <span className="gridBlue"/>
                            <span className="gridYellow"/>
                            <span className="gridGreen"/></>
                        : ''}
                        {card.cardIcon ? <i className={`${card.cardIcon}`}/> : <div><p>{card.cardText}</p></div>}
                    </div>
                    <div className={'thirdItem unoText'}>{card.cardIcon ? <i className={`${card.cardIcon}`}/> : card.cardText}</div>
                </div>
            </Card>
        </Col>
}