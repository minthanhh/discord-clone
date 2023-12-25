import Swal from 'sweetalert2'

export function withToastForError(payloadCreator) {
	return async (args, thunkAPI) => {
		try {
			return await payloadCreator(args, thunkAPI)
		} catch (err) {
			if (err) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: err.message,
					footer: '<a href="#">Why do I have this issue?</a>',
				})
			}
		}
	}
}
