import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const ResetPasswordModal = ({ open, onClose }) => {
	const [email, setEmail] = useState('');

	const handleSend = () => {
		// placeholder: en producción llamar al endpoint de restablecimiento
		console.log('Reset password for', email);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Restablecer contraseña</DialogTitle>
			<DialogContent>
				<TextField
					label="Correo electrónico"
					type="email"
					fullWidth
					margin="normal"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancelar</Button>
				<Button variant="contained" onClick={handleSend}>Enviar</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ResetPasswordModal;
