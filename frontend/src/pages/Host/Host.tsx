import { ReactElement, useEffect, useState } from "react";
import { Alert } from "@mui/material";

import ParticipantGrid from '../../components/ParticipantGrid/ParticipantGrid'
import FloatingParticipant from '../../components/FloatingParticipant/FloatingParticipant'
import FloatingButtonContainer from '../../components/FloatingButtonContainer/FloatingButtonContainer'
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import NameModal from '../../components/NameModal/NameModal'

import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import GroupsIcon from '@mui/icons-material/Groups';
import CallEndIcon from '@mui/icons-material/CallEnd';

import { getInstance, initialize } from "../../socketDriver";

const MAX_PARTICIPANTS = 5

function Host(): ReactElement {
  const [meetingId, setMeetingId] = useState("")
  const [muted, setMuted] = useState(false)
  const [participantData, setParticipantData] = useState([])
  const [name, setName] = useState("")


  function createMeeting() {
    getInstance().sendMessage('create_meeting', {
      hostDetails: {
        name
      }
    })
  }

  function muteUser() {
    getInstance().sendMessage('mute', { meetingId })
  }
  
  function unmuteUser() {
    getInstance().sendMessage('unmute', { meetingId })
  }

  function muteAll() {
    getInstance().sendMessage('mute_all', { meetingId })
  }

  function endMeeting() {
    getInstance().sendMessage('end_meeting', { meetingId })
  }

  function setTimer(timerKey: string) {
    getInstance().sendMessage('set_timer', {
      meetingId,
      timerKey,
    })
  }

  function updateMeeting(meetingData: any) {
    let participantData:any = []
    
    Object.keys(meetingData).forEach(key => {
      if (key === getInstance().getSocketId()) {
        setMuted(meetingData[key].muted)
      }
      else {
        participantData.push({
          name: meetingData[key].name
        })
      }
    })

    setParticipantData(participantData)
  }

  function connect() {
    if (!name) {return}

    initialize()

    getInstance().connect()
   
    getInstance().listen("connect", createMeeting)
    
    // TODO:
    // getInstance().listen("disconnect", () => createMeeting)
    
    getInstance().listen("meeting_update", updateMeeting)
    
    getInstance().listen("meeting_created", ({ meetingId: newMeetingId }: any) => { setMeetingId(newMeetingId) })
  }

  useEffect(connect, [name])

  return (
    <div className="Host" style={{ 'background': '#000', 'position': 'relative', 'height': '100vh' }}>
      <NameModal open={!name} onNameInput={name => setName(name)} />
      {
        participantData.length < 4 ?
        <Alert sx={{ 'top': 20, 'left': 20, 'position': 'absolute' }} severity="success" color="info">
          Your meeting created. Send this link for participants to join - <a target="_blank" href={`http://localhost:3000/${meetingId}`}>localhost:3000/{meetingId}</a>
        </Alert> :
        <Alert sx={{ 'top': 20, 'left': 20, 'position': 'absolute' }} severity="warning">
          Maximum number of participants reached
        </Alert>
      }
      <ParticipantGrid participantData={participantData}></ParticipantGrid>
      <FloatingParticipant></FloatingParticipant>
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
          onClick={muteAll}
          enabled={true}
          enableIcon={<GroupsIcon></GroupsIcon>}
          disableIcon={<GroupsIcon></GroupsIcon>}
        />
        <FloatingButton
          enabled={true}
          enableIcon={<CallEndIcon></CallEndIcon>}
          disableIcon={<CallEndIcon></CallEndIcon>}
          onClick={endMeeting}
        />

        <div style={{ 'width': 100 }} />

        <FloatingButton
          onClick={setTimer.bind(null, 'seconds_15')}
          enabled
          enableIcon={<div>15</div>}
          disableIcon={<div>15</div>}
        />
        <FloatingButton
          onClick={setTimer.bind(null, 'seconds_30')}
          enabled
          enableIcon={<div>30</div>}
          disableIcon={<div>30</div>}
        />
        <FloatingButton
          onClick={setTimer.bind(null, 'seconds_45')}
          enabled
          enableIcon={<div>45</div>}
          disableIcon={<div>45</div>}
        />
      </FloatingButtonContainer>
    </div>
  );
}

export default Host;
