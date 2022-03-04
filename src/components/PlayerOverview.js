import { usePlayerContext } from "../contexts/PlayersContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

export function PlayerOverview() {
  const { players } = usePlayerContext();

  return (
    <>
      {players.length > 0 && (
        <Container className={"my-5"}>
          <h1 className={"text-white"}>Players</h1>
          <Row>
            {players.map((player, i) => (
              <PlayerCard key={i} player={player} />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

function PlayerCard(props) {
  const { player } = props;
  const { players, updatePlayers } = usePlayerContext();
  const [removing, setRemoving] = useState(false);

  const removePlayer = () => {
    const newPlayers = players.filter((p) => p.name !== player.name);
    updatePlayers(newPlayers);
    setRemoving(false);
  };

  return (
    <Col xs={12} md={6} lg="4" className="my-3">
      <Card className={"p-3"}>
        <h5 className={"text-center text-capitalize"}>{player.name}</h5>
        <hr />
        <Row>
          <Col>Cards in hand</Col>
          <Col>{player.cards.length}</Col>
        </Row>
        <Row>
          <Col>Has uno?</Col>
          <Col>{player.uno ? "Yes" : "No"}</Col>
        </Row>
        <Row>
          <Col>Called uno?</Col>
          <Col>{player.calledUno ? "Yes" : "No"}</Col>
        </Row>
        <Row>
          <Col>Games won</Col>
          <Col>{player.gamesWon}</Col>
        </Row>
        <Row className={"mt-3"}>
          {!removing ? (
            <Col>
              <Button
                variant={"danger"}
                className={"w-100 m-0"}
                onClick={() => setRemoving(true)}
              >
                Remove player
              </Button>
            </Col>
          ) : (
            <>
              <Col className={"d-flex"}>
                <Button
                  className={"w-100 my-0 mx-1"}
                  variant={"success"}
                  onClick={() => setRemoving(false)}
                >
                  Cancel
                </Button>
                <Button
                  className={"w-100 my-0 mx-1"}
                  variant={"danger"}
                  onClick={() => removePlayer()}
                >
                  Delete
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card>
    </Col>
  );
}
