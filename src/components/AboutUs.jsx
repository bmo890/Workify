import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Badge, CardColumns, Card, Image } from "react-bootstrap";

function AboutUs() {
  return (
    <Container>
      <h2 className="text-center m-4 display-3">
        About <Badge variant="info">Workify</Badge>
      </h2>
      <p>
        Adipisicing laborum occaecat elit cillum dolor ad nulla officia duis
        dolor aliquip in proident officia. Amet labore labore ipsum non deserunt
        esse. Quis excepteur sint non ipsum. Incididunt aute irure ipsum sint
        aute incididunt duis.Adipisicing laborum occaecat elit cillum dolor ad
        nulla officia duis dolor aliquip in proident officia. Amet labore labore
        ipsum non deserunt esse. Quis excepteur sint non ipsum. Incididunt aute
        irure ipsum sint aute incididunt duis.Adipisicing laborum occaecat elit
        cillum dolor ad nulla officia duis dolor aliquip in proident officia.
        Amet labore labore ipsum non deserunt esse. Quis excepteur sint non
        ipsum. Incididunt aute irure ipsum sint aute incididunt duis.
      </p>

      <h3 className="text-center m-5 display-4">Our Team</h3>
      <Container>
        <CardColumns>
          <Card>
            <div className="text-center pt-3">
              <Image
                className="w-50"
                roundedCircle
                variant="top"
                src="https://images-na.ssl-images-amazon.com/images/I/819Pnm3UgbL._AC_SL1500_.jpg"
              />
              <hr />
            </div>
            <Card.Body>
              <Card.Title>Ben</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <small className="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </Card.Body>
          </Card>
          <Card>
            <div className="text-center pt-3">
              <Image
                className="w-50"
                roundedCircle
                variant="top"
                src="https://i.pinimg.com/originals/01/e9/72/01e9723f105d553724e4c577d7ed29a9.jpg"
              />
              <hr />
            </div>
            <Card.Body>
              <Card.Title>Boris</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <small className="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </Card.Body>
          </Card>
          <Card>
            <div className="text-center pt-3">
              <Image
                className="w-50"
                roundedCircle
                variant="top"
                src="https://i.pinimg.com/originals/48/e4/56/48e456e62e9b085adc46541a9728e07b.png"
              />
              <hr />
            </div>
            <Card.Body>
              <Card.Title>Igal</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <small className="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </Card.Body>
          </Card>
          <Card>
            <div className="text-center pt-3">
              <Image
                className="w-50"
                roundedCircle
                variant="top"
                src="https://i.pinimg.com/originals/fb/1a/08/fb1a084451d2a770ecab51e412070b28.jpg"
              />
              <hr />
            </div>
            <Card.Body>
              <Card.Title>Elad</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <small className="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </Card.Body>
          </Card>
          <Card>
            <div className="text-center pt-3">
              <Image
                className="w-50"
                roundedCircle
                variant="top"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Queen_Elizabeth_II_in_March_2015.jpg/1200px-Queen_Elizabeth_II_in_March_2015.jpg"
              />
              <hr />
            </div>
            <Card.Body>
              <Card.Title>Yona</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <small className="text-muted">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </small>
            </Card.Body>
          </Card>
        </CardColumns>
      </Container>
    </Container>
  );
}

export default AboutUs;
