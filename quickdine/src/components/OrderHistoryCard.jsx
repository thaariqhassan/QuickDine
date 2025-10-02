import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';


export default function OrderHistoryCard() {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        
        title="Kubaba"
        subheader="Edappally"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Come and experience our delicious Mediterranean and Persian cuisine.
          Speciality traditional dishes prepared using premium ingredients, 
          enjoy our signature KUZHIMANDI and SHAWARMA; 
          paired with our wide selection of fine fresh fruit juice and Mojito. 
          All of the meat and chicken dishes at KUBABA are fresh and Halal.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
