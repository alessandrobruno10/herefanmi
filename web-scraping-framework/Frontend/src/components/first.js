import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState({ url: '', type: '', file: null, hasCodeSource: false });
  const [loadingStates, setLoadingStates] = useState({}); // Maintain loading state for each item

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_data');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/post_data', newData);
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleButtonClick = async (url) => {
    console.log(url);

    try {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [url]: true, // Set loading to true for the specific item
      }));

      await axios.post('http://localhost:5000/api/scrape_and_save', { url });

      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [url]: false, // Set loading back to false when scraping is done
      }));
    } catch (error) {
      console.error('Error sending URL:', error);
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [url]: false, // Set loading back to false on error
      }));
    }
  };

  const handleFileUpload = async (item, file) => {
    try {
      if (file) {
        const formData = new FormData();
        const cleanFileName = item.url.replace(/https?:\/\/|www\.|\.\w{2,3}/g, '').replace(/\//g, '');
        const newFileName = `${cleanFileName}.${file.name.split('.').pop()}`;
        formData.append('file', file, newFileName);

        const response = await axios.post(`http://localhost:5000/upload_file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Response from server:', response.data);
        fetchData();
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Scraper Sources</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Type</th>
            <th>Code Source</th>
            <th>Action</th>
            <th>Upload File</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.url}</td>
              <td>{item.type}</td>
              <td>{item.hasCodeSource ? '✓' : '✗'}</td>
              <td>
                {loadingStates[item.url] ? (
                  'Scraping...'
                ) : (
                  <Button variant="success" onClick={() => handleButtonClick(item.url)}>
                    Start Scraping
                  </Button>
                )}
              </td>
              <td>
                {!item.hasCodeSource && (
                  <div>
                    <Form.Group controlId={`file_${item.id}`}>
                      <Form.Label>Upload File</Form.Label>
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => handleFileUpload(item, newData.file)}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleShowModal}>
        Add new Online Source
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Online Source</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control type="text" placeholder="Enter URL" name="url" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" placeholder="Enter Type" name="type" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="file">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DataDisplay;