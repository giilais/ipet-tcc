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
  const [signOut, loading, error] = useSignOut(auth);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  function goTo() {
    navigate("/registerServices");
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="Home">
            <IconButton href="/home">
              <PetsIcon
                sx={{
                  color: "#ffffff",
                  "&:hover": {
                    color: "#FE8D8D",
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
                color: "white",
                display: "block",
                textTransform: "none",
                fontFamily: "Montserrat",
                fontSize: "15px",
                "&:hover": {
                  color: "#FE8D8D",
                  transition: "400ms",
                },
              }}
            >
              Cadastro de Serviço
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configurações de usuário">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon
                  sx={{
                    color: "#ffffff",
                    "&:hover": {
                      color: "#FE8D8D",
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
