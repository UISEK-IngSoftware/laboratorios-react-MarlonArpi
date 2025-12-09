import { Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";

export default function PokemonCard ({ pokemon }) {
    return (
        <Card>
            <CardMedia
                component="img"
                height= {200}
                image={pokemon.image}
                alt ={pokemon.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <CardActions>
                    <Button size="small">Ver detalles</Button>
                </CardActions>
            </CardContent>
                
        </Card>
    );
}