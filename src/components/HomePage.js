import { Container } from "react-bootstrap";
import { PlayerForm } from "./PlayerForm";
import { PlayerOverview } from "./PlayerOverview";

export function HomePage() {
  return (
    <Container className={"my-5"}>
      <PlayerForm />
      <PlayerOverview />
    </Container>
  );
}
