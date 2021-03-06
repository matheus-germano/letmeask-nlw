import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import { Button } from '../../components/Button'

import './styles.scss'

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    // Verify if the room name is empty
    if (newRoom.trim() === '') {
      return;
    }

    // Finding in db a reference called rooms
    const roomRef = database.ref('rooms')

    // Inserting an information in rooms in database
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    // Redirecting user to created room
    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return(
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}