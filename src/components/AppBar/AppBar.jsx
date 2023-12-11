import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [signOut] = useSignOut(auth);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function goTo() {
    navigate("/registerServices");
  }

  function goToAgenda() {
    navigate("/minhaAgenda");
  }

  function goToAgendamentos() {
    navigate("/meusAgendamentos");
  }

  function goToFeedbacks() {
    navigate("/meusFeedbacks");
  }

  function goToMyProfile() {
    navigate("/myProfile");
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", boxShadow: "2px 2px 10px #cfcfcf" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="Home">
            <IconButton href="/home">
              <PetsIcon
                sx={{
                  color: "#ffa726",
                  "&:hover": {
                    color: "#000",
                    transition: "400ms",
                  },
                }}
              />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={goTo}
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                textTransform: "none",
                fontFamily: "Montserrat",
                fontSize: "15px",
                "&:hover": {
                  color: "#ffa726",
                  transition: "400ms",
                },
              }}
            >
              Cadastro de Serviço
            </Button>

            <Button
              onClick={goToAgenda}
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                textTransform: "none",
                fontFamily: "Montserrat",
                fontSize: "15px",
                "&:hover": {
                  color: "#ffa726",
                  transition: "400ms",
                },
              }}
            >
              Minha Agenda
            </Button>

            <Button
              onClick={goToAgendamentos}
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                textTransform: "none",
                fontFamily: "Montserrat",
                fontSize: "15px",
                "&:hover": {
                  color: "#ffa726",
                  transition: "400ms",
                },
              }}
            >
              Meus Agendamentos
            </Button>

            <Button
              onClick={goToFeedbacks}
              sx={{
                my: 2,
                color: "#000",
                display: "block",
                textTransform: "none",
                fontFamily: "Montserrat",
                fontSize: "15px",
                "&:hover": {
                  color: "#ffa726",
                  transition: "400ms",
                },
              }}
            >
              Feedbacks
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configurações de usuário">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon
                  sx={{
                    color: "black",
                    "&:hover": {
                      color: "#ffa726",
                      transition: "400ms",
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Button
                  type="text"
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    color: "black",
                    textTransform: "none",
                  }}
                  onClick={goToMyProfile}
                >
                  Meu Perfil
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  type="text"
                  onClick={async () => {
                    const success = await signOut();
                    if (success) {
                      alert("Saindo...");
                      navigate("/login");
                    }
                  }}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  Sair
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
