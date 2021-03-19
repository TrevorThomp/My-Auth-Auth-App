import FriendsList from '../../FriendsList/FriendsList'
import {
	composeMessageDialogOpen,
	composeMessageDialogClosed,
	messageFormChange,
	messageFormSubmit,
	sendRequestSuccess,
	sendRequestFail,
} from '../../../redux/composeMessageDialog'
import ComposeMessageDialog from '../../dialogs/ComposeMessageDialog/ComposeMessageDialog'
import { friendRemoved } from '../../../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'

const sendMessageUrl = '/api/messages/sendMessage/'

export default function FriendsContainer(props) {
	const reduxUser = useSelector((state) => state.user)
	const composeMessageDialog = useSelector(
		(state) => state.composeMessageDialog
	)
	const dispatch = useDispatch()

	const dispatchCloseDialog = () => {
		dispatch(composeMessageDialogClosed())
	}

	const dispatchOpenDialog = (recipientId, recipientUserName) => {
		dispatch(
			composeMessageDialogOpen({
				recipientId,
				senderId: reduxUser._id,
				recipientUserName,
			})
		)
	}

	const dispatchMessageChange = (e) => {
		const prop = {
			[e.target.name]: e.target.value,
		}
		dispatch(messageFormChange(prop))
	}
	const dispatchMessageSubmit = async (e) => {
		try {
			const response = await axios.post(
				`${sendMessageUrl}${composeMessageDialog.messageForm.recipient}`,
				{
					...composeMessageDialog.messageForm,
				}
			)
			if (response.status === 200) {
				dispatch(sendRequestSuccess(response.data.data.message))
			}
		} catch (error) {
			console.log(error)
			dispatch(sendRequestFail())
		}
		dispatch(messageFormSubmit())
	}

	const dispatchFriendRemoved = (uid) => {
		dispatch(friendRemoved(uid))
	}

	return (
		<>
			<FriendsList
				friendsList={reduxUser.friends ? [...reduxUser.friends] : []}
				onRemoveFriend={dispatchFriendRemoved}
				openNewMessageDialog={dispatchOpenDialog}
			/>
			<ComposeMessageDialog
				dialogOpen={composeMessageDialog.isOpen}
				dialogClosed={dispatchCloseDialog}
				onSubmit={dispatchMessageSubmit}
				onChange={dispatchMessageChange}
				formData={composeMessageDialog.messageForm}
				recipientUsername={composeMessageDialog.messageForm.recipientDisplay}
			/>
		</>
	)
}
