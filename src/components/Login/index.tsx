import Nav from '../Nav'
import { Container, Right, Left, P } from './styles'

const Login:React.FC = () => {

  return (
    <>
      <Nav/>
      <Container>
        <Left>
          <P>music player</P>
          <P>for your amusement</P>
        </Left>
        <Right>
          <P>designed with brutalism in mind</P>
          <P>* spotify account is required.</P>
        </Right>
      </Container>
    </>
  )
}

export default Login;
