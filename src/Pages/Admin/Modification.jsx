import React, { useState, useEffect } from 'react';
import { Container, Box, Stack, Card, Typography, Grid, Button, TextField, Avatar } from "@mui/material";
import { useParams } from 'react-router-dom'; //
import Sidebar from "../../components/Nav/Sidebar";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Modification() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const lien = location.state.info

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');


    //Affichage des informations du personnages

    useEffect(() => {
        const url = `https://zabalo.alwaysdata.net/sae401/api/${lien}/${id}`;
        PersoUser(url);
    }, [id]);


    function PersoUser(url) {
        const fetchOptions = {
            method: "GET"
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                setDescription(dataJSON.description)
                setNom(dataJSON.nom)
                setImagePreviewUrl(dataJSON.icone)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const Data = {
            nom: nom,
            description: description,
            icone: imagePreviewUrl
        };
        const accessToken = localStorage.getItem('userToken');
        const url = `https://zabalo.alwaysdata.net/sae401/api/${lien}/${id}`;

        ModifPerso(url, Data, accessToken);
        navigate(`/gestion/${lien}`)
    }

    function ModifPerso(url, Data, accessToken) {
        console.log(Data)
        const fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(Data)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then(dataJSON => {
                console.log(dataJSON)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Container>
                <Button variant="contained" sx={{ mt: 5 }} onClick={() => navigate(`/gestion/${lien}`)}>
                    <ArrowBackIosIcon /> Retour
                </Button>
                <Stack>
                    <Typography variant="h2" fontWeight="medium" sx={{ pt: { xs: 4, sm: 4 } }}>
                        Modification de {lien}
                    </Typography>
                    <Box m={12}>
                        <Card>
                            <Box p={2}>
                                <Grid container spacing={3}>
                                    <Grid item
                                        xs={12}
                                        md={6}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        {imagePreviewUrl && (
                                            <Avatar
                                                src={imagePreviewUrl}
                                                sx={{ width: 200, height: 200, mb: 2, backgroundColor: 'black' }}
                                                variant="rounded"
                                            />
                                        )}
                                        <input
                                            accept="image/*"
                                            type="file"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                            id="file-input"
                                        />
                                        <label htmlFor="file-input">
                                            <Button variant="contained" component="span">
                                                Ajouter une icône
                                            </Button>
                                        </label>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Nom"
                                            value={nom}
                                            onChange={e => setNom(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
                                    <Button variant="contained" onClick={handleSubmit}>
                                        Modifier
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                </Stack >
            </Container >
        </Box >
    );
}

export default Modification;