import React, { useReducer, useEffect, useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router'
import { UserContext } from '../../context/UserContext';
import { Grid } from '@mui/material';

const ResponsiveAppBar = (props) => {

  const{
    usuario,
    setUsuario
  } = props
 
  const history = useNavigate();
  const irAHome = () => { history("/") }

  const {user, setUser, refreshUser} = useContext(UserContext)

  const cerrarSesion = () => {
    refreshUser()
    goTo("/")
  }

  const goTo = (path)=>{
        history(path)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GESTION ACADEMICA
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              user.idUsuario === 0
                ?
                <Grid container justifyContent="flex-end">
                  <Button onClick={()=>goTo("/login")} sx={styles.navItem}>Ingresar</Button>
                </Grid>
                :
                <>
                  {
                    user.idTipoUsuario === 3 ?  //administrador
                    <Grid container justifyContent="flex-start" spacing={1}>
                      <Button onClick={()=>goTo("/administracion")} sx={styles.navItem}>Administracion</Button>
                      <Button onClick={()=>goTo("/reportes")} sx={styles.navItem}>Reportes</Button>
                    </Grid>
                    : null
                  }
                  {
                    user.idTipoUsuario === 1 ? //estudiante
                    <Grid container justifyContent="flex-start" spacing={1}>
                      <Button onClick={()=>goTo("/inscripciones")} sx={styles.navItem}>Inscripciones</Button>
                      <Button onClick={()=>goTo("/analitico")} sx={styles.navItem}>Analitico</Button>
                      <Button onClick={()=>goTo(`/perfil/${user.idUsuario}`)} sx={styles.navItem}>Perfil</Button>
                    </Grid>
                    : null
                  }
                  {
                    user.idTipoUsuario === 2 ? //docente
                    <Grid container justifyContent="flex-start" spacing={1}>
                      <Button onClick={()=>goTo("/docente")} sx={styles.navItem}>Materias</Button>
                      <Button onClick={()=>goTo(`/perfil/${user.idUsuario}`)} sx={styles.navItem}>Perfil</Button>
                    </Grid>
                    : null
                  }
                  <Grid container justifyContent="flex-end">
                    <Button onClick={cerrarSesion} sx={styles.cerrarSesion}>Cerrar Sesion</Button>
                  </Grid>
                    
                </>
            }
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;


const styles = {
  navItem: { color: 'white', display: 'block', pt:2},
  cerrarSesion: { color: 'white', display: 'block'},

}