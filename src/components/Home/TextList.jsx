import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TextHome() {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 0, sm: 0 },
            pb: { xs: 4, sm: 4 },
        }}>
            <Typography
                variant="h1"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                }}
            >
                Liste des&nbsp;
                <Typography
                    component="span"
                    variant="h1"
                    sx={{
                        fontSize: 'clamp(3rem, 10vw, 4rem)',
                        color: (theme) =>
                            theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                    }}
                >personnages
                </Typography>
            </Typography>
        </Box>
    );
}