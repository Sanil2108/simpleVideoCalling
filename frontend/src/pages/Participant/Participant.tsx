import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getInstance, initialize } from "../../socketDriver";
import useSound from "use-sound";

import FloatingButtonContainer from "../../components/FloatingButtonContainer/FloatingButtonContainer";
import FloatingParticipant from "../../components/FloatingParticipant/FloatingParticipant";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import NameModal from "../../components/NameModal/NameModal";
import ParticipantColumn from "../../components/ParticipantColumn/ParticipantColumn"
import Timer from "../../components/Timer/Timer"
import SingleParticipant from "../../components/SingleParticipant/SingleParticipant";

import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import alarmSound from '../../assets/sounds/alarm.mp3';

import './styles.css'

function Participant() {
  const [timer, setTimer] = useState(-1)
  const [muted, setMuted] = useState(false)
  const [name, setName] = useState("")
  const [participantData, setParticipantData] = useState([])
  const [hostName, setHostName] = useState("")
  const [playSound] = useSound(alarmSound);

  const { meetingId } = useParams()

  function joinMeeting() {
    if (!name) {
      return
    }

    getInstance().sendMessage('join_meeting', {
      participantDetails: {
        name,
      },
      meetingId,
    })
  }

  function updateMeeting(meetingData: any) {
    let participantData: any = []

    Object.keys(meetingData).forEach(key => {
      if (key === getInstance().getSocketId()) {
        setMuted(meetingData[key].muted)
      }
      else {
        if (meetingData[key].isHost) {
          setHostName(meetingData[key].name)
        }
        else {
          participantData.push({
            name: meetingData[key].name
          })
        }
      }
    })
    
    setParticipantData(participantData)
  }

  function muteUser() {
    getInstance().sendMessage('mute', { meetingId })
  }

  function unmuteUser() {
    getInstance().sendMessage('unmute', { meetingId })
  }

  function endMeeting() {
    getInstance().sendMessage('leave_meeting', { meetingId })
  }

  function connect() {
    initialize()

    getInstance().connect()

    getInstance().listen("connect", joinMeeting)

    getInstance().listen("disconnect", endMeeting)

    getInstance().listen("meeting_update", updateMeeting)

    // TODO: Fix these any ts declaration
    getInstance().listen("timer_set", ({ duration }: any) => {
      setTimer(duration)
    })
  }

  useEffect(() => {
    if (timer <= 0) {
      playSound()
      setTimer(-1)
    }
    else {
      setTimeout(() => setTimer(timer - 1), 1000)
    }
  }, [timer])

  useEffect(connect, [name])

  return (
    <div className="Participant" style={{ 'position': 'relative', 'height': '100vh' }}>
      {timer === -1 ? null : <Timer time={timer} />}
      <NameModal open={!name} onNameInput={name => setName(name)} />
      <FloatingParticipant></FloatingParticipant>

      <div className="SplitContainer">
        <div className="AllParticipantContainer">
          <ParticipantColumn participantData={participantData} />
        </div>
        <div className="MainContainer">
          <SingleParticipant participantName={hostName} />

        </div>
      </div>
      <FloatingButtonContainer>
        <FloatingButton
          enabled={false}
          enableIcon={<VideocamOffIcon></VideocamOffIcon>}
          disableIcon={<VideocamOffIcon></VideocamOffIcon>}
        />
        <FloatingButton
          onClick={muted ? unmuteUser : muteUser}
          enabled={!muted}
          enableIcon={<MicIcon></MicIcon>}
          disableIcon={<MicOffIcon></MicOffIcon>}
        />
        <FloatingButton
          enabled={true}
          enableIcon={<CallEndIcon></CallEndIcon>}
          disableIcon={<CallEndIcon></CallEndIcon>}
          onClick={endMeeting}
        />
      </FloatingButtonContainer>

    </div>
  );
}

export default Participant;
