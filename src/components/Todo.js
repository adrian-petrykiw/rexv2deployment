import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase.js';
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import './todo.css';


const Todo = ({ arr }) => {

  // const [gameName, setGameName] = useState('');
  // const [mintAddress, setMintAddress] = useState('');
  return (
    <List className="todo__list">
      <ListItem onClick={async (e) => {
        e.preventDefault();
        const taskDocRef = doc(db, 'nftpic', 'currentnftpic');
        const shipImageUrl = arr.item.shipNFTPic;
        const invaderOneImageURL = arr.item.invaderOneNFTPic;
        const invaderTwoImageURL = arr.item.invaderTwoNFTPic;
        const invaderThreeImageURL = arr.item.invaderThreeNFTPic;
        // const invaderUfoImageURL = arr.item.invaderUfoNFTPic;


        await updateDoc(taskDocRef, {
          shipImageUrl: shipImageUrl,
          invaderOneImageURL: invaderOneImageURL,
          invaderTwoImageURL: invaderTwoImageURL,
          invaderThreeImageURL: invaderThreeImageURL,
          // invaderUfoImageURL: invaderUfoImageURL,

        });
        window.location.href = 'https://adrian-petrykiw.github.io/space_invaders_injectionv2/';
      }}

      style={{paddingBottom: '1.75rem', paddingTop: '1.5rem',}}>
        <ListItemAvatar style={{ paddingLeft: '1.25rem', paddingTop: '4.25rem' }}>
          <Avatar alt="Error" src={arr.item.shipNFTPic} />
          <Avatar alt="Error" style={{ marginTop: '1rem', }} src={arr.item.invaderOneNFTPic} />
          <Avatar alt="Error" style={{ marginTop: '1rem', }} src={arr.item.invaderTwoNFTPic} />
          <Avatar alt="Error" style={{ marginTop: '1rem', }} src={arr.item.invaderThreeNFTPic} />
          {/* <Avatar alt="Error" style={{ marginTop: '1rem', }} src={arr.item.invaderUfoNFTPic} /> */}


        </ListItemAvatar>


        <ListItemText
        style={{ paddingLeft: '1.25rem',}}
  
          primary={
            <Typography variant="h5" style={{ fontFamily: 'Montserrat', fontWeight: 'bolder', color: "white" }} >{arr.item.gameName}</Typography>
          }
          secondary={

            <Typography style={{ color: "white", fontFamily: 'Montserrat', fontSize: '14px'  }}>
              <div style={{ marginTop: '2.5rem', }}>
                Ship Mint Address: {arr.item.shipMintAddress}
              </div>

              <div style={{ marginTop: '2.25rem', }}>
                Invader #1 Mint Address: {arr.item.invaderOneMintAddress}
              </div>

              <div style={{ marginTop: '2.25rem', }}>
                Invader #2 Mint Address: {arr.item.invaderTwoMintAddress}
              </div>

              <div style={{ marginTop: '2.25rem', }}>
                Invader #3 Mint Address: {arr.item.invaderThreeMintAddress}
              </div>

              {/* <div style={{ marginTop: '2.25rem', }}>
                UFO Mint Address: {arr.item.invaderUfoMintAddress}
              </div> */}



            </Typography>

          }
        />

      </ListItem>
      {/* <DeleteIcon fontSize="large" style={{ opacity: 1, paddingRight: 20, }} onClick={() => { deleteDoc(doc(db, 'todos', arr.id)) }} /> */}

    </List>
  )
};
export default Todo;