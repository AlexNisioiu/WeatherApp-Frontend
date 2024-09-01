import React, { useEffect, useState } from 'react';
import './App.css';
import { Box } from '@mui/system';
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Input, List, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { weather } from './components/weather';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [weathers, setWeather] = useState<weather[]>([]);
  const [city, setCity] = useState<string>('');

  const loadWeather = () => {
    axios.get("http://localhost:8080/weathers").then((response) => setWeather(response.data));
  };

  useEffect(() => {
    axios.get("http://localhost:8080/weathers/names?city=" + city).then((response) => setWeather(response.data));
  }, [city]);


  useEffect(() => {
    loadWeather();
  }, []);

  const deleteWeather = ((id: number) => {
    axios.delete("http://localhost:8080/weathers/" + id).then((response) => loadWeather());
  });

  return (
    <Box>
      <Box sx={{ backgroundColor: 'lightgrey' }}>
        <TextField label='Search' sx={{ backgroundColor: 'white', margin: 1 }} variant='outlined' value={city} onChange={(e) => setCity(e.target.value)}></TextField>
      </Box>

      <List sx={{ backgroundColor: 'gray' }}>
        {weathers.map((weather) =>
          <Card sx={{ margin: 1, padding: 0.2 }} variant='outlined'>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Typography variant="h5" sx={{ fontSize: '2rem' }}>
                {weather.city}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1.3rem' }} color="text.secondary">
                {weather.country}
              </Typography>
            </Box>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 1
                }}
              >
                <Box sx={{ textAlign: 'center', p: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontSize: "1.3rem" }}>
                    Temperature
                  </Typography>
                  <Box sx={{ fontSize: "2rem" }}>{weather.temp}</Box>
                </Box>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 0.1,
                    m: 0.1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}>
                  <Typography variant="subtitle1" sx={{ fontSize: '1.3rem' }}>
                    Humidity
                  </Typography>
                  <Box sx={{ fontSize: '2rem' }}>{weather.umiditate}</Box>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontSize: '1.3rem' }}>
                    Wind
                  </Typography>
                  <Box sx={{ fontSize: '2rem' }}>
                    {weather.wind}</Box>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button variant='contained' color='error' sx={{ m: 1 }} onClick={() => { deleteWeather(weather.id) }}>
                Delete
              </Button>
            </CardActions>
          </Card>)}
      </List>
    </Box>

  );
}

export default App;


