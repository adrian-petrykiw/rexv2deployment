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
        const invaderImageURL = arr.item.invaderOneNFTPic;

        await updateDoc(taskDocRef, {
          shipImageUrl: shipImageUrl,
          invaderImageURL: invaderImageURL,
        });
        window.location.href = 'https://adrian-petrykiw.github.io/space_invaders_injectionv2/';
      }}>
        <ListItemAvatar style={{ paddingLeft: 20, }}>
          <Avatar alt="Error" src={arr.item.shipNFTPic} />
          <Avatar alt="Error" style={{ marginTop: 20, }} src={arr.item.invaderOneNFTPic} />
        </ListItemAvatar>


        <ListItemText
          style={{ paddingLeft: 20, }}
          primary={
            <Typography variant="h6" style={{ color: "white" }}>{arr.item.gameName}</Typography>
          }
          secondary={

            <Typography style={{ color: "white" }}>
            
                 Ship Mint Address: {arr.item.shipMintAddress}
                 <div>
                 Invader Mint Address: {arr.item.invaderMintAddress}
                 </div>
                
           
              
            </Typography>

          }
        />

        {/* <ListItemText
          style={{ paddingLeft: 20, }}
          secondary={
            <Typography style={{ color: "white" }}>
              <h6>
                "Invader Mint Address"
              </h6>
              {arr.item.invaderMintAddress}
            </Typography>
          }
        /> */}
      </ListItem>
      {/* <DeleteIcon fontSize="large" style={{ opacity: 1, paddingRight: 20, }} onClick={() => { deleteDoc(doc(db, 'todos', arr.id)) }} /> */}

    </List>
  )
};
export default Todo;