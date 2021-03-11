import * as Styles from './FriendsList.styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper'
import RemoveUserButton from '../buttons/RemoveUserButton/RemoveUserButton'

export default function FriendsList(props) {
	
	const { friendsList, onRemoveFriend } = props
	
	const MainList = (props) => {
		const { friends } = props

		return (
			<List>
				<ListSubheader component='div' disableSticky={true}>Friends</ListSubheader>
				{friends?.map((friend) => {
					return (
						<ListItem key={Math.random()}>
              <ListItemAvatar>
                <Avatar>
                {/* add avatar images for users */}
                </Avatar>
              </ListItemAvatar>
							<ListItemText primary={friend.userName} secondary={friend.name ? friend.name : null} />
              <ListItemSecondaryAction>
                <RemoveUserButton friend={friend} onRemoveFriend={onRemoveFriend} />
              </ListItemSecondaryAction>
							
						</ListItem>
					)
				})}
			</List>
		)
	}
	
	return (
		<Styles.Container>
      <Paper elevation={3}>
			<MainList friends={friendsList} />
      </Paper>
		</Styles.Container>
	)
}
