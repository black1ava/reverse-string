import React, { useState, useCallback } from 'react';
import { Card, Form, Button, ListGroup, Navbar, Alert, Fade } from 'react-bootstrap';


function App() {
	
	const [text, setText] = useState('');
	const [textList, setTextList] = useState([]);
	const [showAlert, setShowAlert] = useState(false);

	const handleTextChange = useCallback(function(e){
		setText(e.target.value);
	}, []);

	const handleClear = useCallback(function(){
		setText('');
	}, []);

	const handleCopy = useCallback(function(id){
		const text = textList.filter(function(text){
			return text.id === id;
		});

		navigator.clipboard.writeText(text[0].text);

		setShowAlert(true);
	}, [textList]);

	const handleDelete = useCallback(function(id){
		const list = textList.filter(function(text){
			return text.id !== id
		});

		setTextList(list);
	}, [textList]);

	const handleReverse = useCallback(function(){
		const reverseString = text.split('').reverse().join('');
		const id = Math.floor(Math.random() * 10000 + 1);

		setTextList(prev => [{ id: id, text: reverseString }, ...prev]);
	}, [text]);

	const handleCloseAlert = useCallback(function(){
		setShowAlert(false);
	}, []);

	const list = textList.map(function(item){
		return (
			<ListGroup.Item className="d-flex" key={ item.id }>
				<div style={{ whiteSpace: 'pre-wrap' }}>
					{ item.text }
				</div>
				<div className="ml-auto">
					<Button variant="primary" onClick={ () => handleCopy(item.id) } className="mr-2 mb-2">Copy</Button>
					<Button variant="secondary" onClick={ () => handleDelete(item.id) } className="mb-2">Delete</Button>
				</div>
			</ListGroup.Item>
		);
	});

	return (
		<div>
			<Navbar variant="dark" bg="dark">
				<Navbar.Brand href="/" className="mr-auto">Reverse String</Navbar.Brand>
				{ showAlert && (
					<Alert variant="success" transition={ Fade } onClose={ handleCloseAlert } dismissible>
					Clipboard copied
					</Alert>
					)
				}
			</Navbar>
			<div className="d-flex flex-row justify-content-center">
				<Card className="w-50">
					<Card.Body>
						<Form className="mb-5">
							<Form.Group className="mb-2">
								<textarea 
									className="form-control" 
									rows="10" 
									placeholder="Insert your text here" 
									value={ text } 
									onChange={ handleTextChange }
								>
								</textarea>
							</Form.Group>
							<Form.Group className="d-flex flex-row justify-content-end">
								<Button variant="primary" className="mr-2" onClick={ handleReverse }>Reverse</Button>
								<Button variant="secondary" onClick={ handleClear }>Clear</Button>
							</Form.Group>
						</Form>
						<ListGroup 
							style={{
								height: 'calc(100vh - 490px)',
								overflow: 'scroll',
								overflowX: 'hidden'
							}}
						>
							{ list }
						</ListGroup>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default App
