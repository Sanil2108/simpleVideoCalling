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

interface Props {
  participantData: Array<any>
}

export default function ParticipantColumn(props: Props) {
  return (
    <>
      <Box sx={{ width: '100%', flexGrow: 1 }}>
        <Grid container rowSpacing={0}>
          {
            props.participantData.map((value, index) => (
              <Grid item xs={12} sx={{ height: '25%' }}>
                <Item sx={{"height": '33vh', "padding": '0', "border": "1px solid white"}}>
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