import React, {useEffect, useState, useRef} from 'react';
import { styled , alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CountUp from 'react-countup';
import './card.css'
import axios from 'axios'


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

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
  // const [value, setValue] = React.useState('one');

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  //tabbing-end
  let countrySearch = useRef(null);

   const [countryData , setCountryData] = useState({});
   const [search , setSearch] = useState(null);
   const toCapitalCase = (search) => {
    return setSearch(search.charAt(0).toUpperCase() + search.slice(1)) ;
};


  //  console.log(search)

  useEffect(() =>{
       async function getData(){
         const response  = await fetch("https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
            "x-rapidapi-key": "233c1b2404mshe502f159dc193acp1a880cjsn459a6f2de62c"
          }
        })
         let data = await response.json();
          console.log(data)
         delete data[2].id
         delete data[0]
         delete data[1]
        //  delete data[2]["Case_Fatality_Rate"]
        //  delete data["Country"]
        //  delete data["Infection_Risk"]
        //  delete data["Population"]
        //  delete data["Test_Percentage"]
        //  delete data["Tests_1M_Pop"]
        //  delete data["ThreeLetterSymbol"]
        //  delete data["Recovery_Proporation"]
        //  delete data["rank"]
        //  delete data["id"]
        //  delete data["TwoLetterSymbol"]
        //  delete data["Continent"]
        //  delete data["TotalTests"]
        //  delete data["one_Caseevery_X_ppl"]
        //  delete data["one_Deathevery_X_ppl"]
        //  delete data["one_Testevery_X_ppl"]
       
         var input = document.getElementById("myInput");
         input.addEventListener("keyup", function(event) {
         if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById("myBtn").click();
  }
});


         let filterCountry = data.filter((newCountry) => {
             return newCountry.Country === search
         })
         console.log(filterCountry)
         let newCountry = (filterCountry.map((newC) => newC.Country))
           console.log(newCountry)
        if(search === null){
          setCountryData(data[2])
        }
       
        else if( search === newCountry.toString() ){
          delete filterCountry[0].id
        setCountryData(filterCountry[0])
        console.log('done')
        }
        else{
          alert("Invalid Name plz enter correct Country Name")
          setCountryData(data[2])
        }


       }
       getData();
  },[search])

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
        {countryData.Country} Covid 19 Updates
         </h1>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <input type="text" id='myInput' ref={countrySearch} className="input-search" placeholder="Search for other country"   />
          
          </Search>
         
          <Button className='search-btn' variant="contained" id='myBtn' color="success" size="medium" onClick={() =>{
             toCapitalCase(countrySearch.current.value)
          } }>
              search
            </Button>
      </div>
<Box sx={{ flexGrow: 1 , marginTop: "100px" }}>
      <Grid container sx={{justifyContent: "center" , alignItems:"center"}} spacing={4} >
        {Object.keys(countryData).map((val , ind) =>{
          return(
            <Grid item xs={12} sm={6} md={4} lg={3} key={ind}>
            <Item>
             <h2> {val.replace(/_/g , " ").toUpperCase()}</h2>
             <h3>{countryData[val]}</h3>
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