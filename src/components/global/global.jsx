import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './card.css';
import axios from 'axios'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(8),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  padding: '20px;'
}));



export default function Card() {
  //tabbing
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //tabbing-end
   const [globalData , setGlobalData] = useState({});

  useEffect(() =>{
       async function getData(){
         const response  = await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world", {
          "method": "GET",
          "headers": {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': '233c1b2404mshe502f159dc193acp1a880cjsn459a6f2de62c'
          }
        })
         let data = await response.json();
         console.log(data)
         delete data[0]["Case_Fatality_Rate"]
         delete data[0]["Country"]
         delete data[0]["Infection_Risk"]
         delete data[0]["Population"]
         delete data[0]["Test_Percentage"]
         delete data[0]["Tests_1M_Pop"]
         delete data[0]["ThreeLetterSymbol"]
         delete data[0]["Recovery_Proporation"]
         delete data[0]["rank"]
         delete data[0]["id"]
         delete data[0]["TwoLetterSymbol"]
         delete data[0]["Continent"]
         delete data[0]["TotalTests"]
         delete data[0]["one_Caseevery_X_ppl"]
         delete data[0]["one_Deathevery_X_ppl"]
         delete data[0]["one_Testevery_X_ppl"]
         console.log(data[0])
          setGlobalData(data[0])
       }
       getData();
  },[])

  return (
    <div className='container'>
      <div className="main">
      <div className="heading">
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <h1>
        World Data Covid 19 Updates
         </h1>
          </Typography>
      </div>
<Box sx={{ flexGrow: 1 , marginTop: "100px" }}>
      <Grid container sx={{justifyContent: "center" , alignItems:"center"}} spacing={4} >
        {Object.keys(globalData).map((val , ind) =>{
          return(
            <Grid item xs={12} sm={6} md={4} lg={3} key={ind}>
            <Item>
             <h2> {val.replace(/_/g , " ").toUpperCase()}</h2>
             <h3>{globalData[val]}</h3>
              </Item>
          </Grid>
          )
        })}
       
      </Grid>
    </Box>
      </div>
    </div>
    
  );
}