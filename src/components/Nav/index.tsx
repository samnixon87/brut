import { redirectToAuthCodeFlow } from '../../auth'

const Nav = () => {

  const clientId = import.meta.env.VITE_CLIENT_ID;

  const handleClick = async () => {
    await redirectToAuthCodeFlow(clientId)
  }

  return (
    <>
      <h1>Brut</h1>
      <button onClick={handleClick}>
        Login
      </button>
    </>
  )
}

export default Nav
