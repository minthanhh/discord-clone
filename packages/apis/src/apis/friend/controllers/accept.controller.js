export const accept = async (req, res) => {
	return res.status(201).json({success: true, message: 'Invitation has been sent'})
}
