import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './styles.less'
import SingleParticipantComponent from '../SingleParticipant/SingleParticipant';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MAX_PARTICIPANTS_PER_ROW = 2

interface Props {
  participantData: Array<any>
}

export default function RowAndColumnSpacing(props: Props) {
  const numberOfParticipants = Object.keys(props.participantData).length

  return (
    <>
      <Box sx={{ width: '100%', flexGrow: 1 }}>
        <Grid container rowSpacing={0}>
          {
            props.participantData.map((value, index) => (
              <Grid item xs={
                index >= numberOfParticipants - (numberOfParticipants % MAX_PARTICIPANTS_PER_ROW) ?
                  12 / (numberOfParticipants % MAX_PARTICIPANTS_PER_ROW) :
                  12 / MAX_PARTICIPANTS_PER_ROW
              }>
                <Item sx={{"height": 'calc(50vh - 8px)', "padding": '0', "border": "1px solid white"}}>
                  <SingleParticipantComponent
                    participantName={value.name}
                  ></SingleParticipantComponent>
                </Item>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </>
  );
}