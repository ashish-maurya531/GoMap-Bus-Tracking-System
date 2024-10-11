import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Document, Page} from '@react-pdf/renderer';
// import {pdfjs} from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import './NoticeModal.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function NoticeModal({ showNoticeModal, toggleModal }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [notices, setNotices] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notices');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadNotice = async () => {
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size is greater than 10 MB');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/uploadNotice', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchNotices();
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading notice:', error);
    } finally {
      setLoading(false);
    }
  };

  const openPdfModal = async (pdfId) => {
    setLoading(true);
    setSelectedPdf(`/api/notices/${pdfId}`);
    setShowPdfModal(true);
    setLoading(false);
  };

  const closePdfModal = () => {
    setShowPdfModal(false);
  };

  useEffect(() => {
    if (showNoticeModal) {
      fetchNotices();
    }
  }, [showNoticeModal]);


  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  
  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );



  return (
    <>
      {showNoticeModal && (
        <div className="modal-overlay" onClick={() => toggleModal('notice')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => toggleModal('notice')}>
              ×
            </button>
            <h2 className="modal-title">Latest Notices</h2>

            {error && (
              <div className="error-modal">
                <p>{error}</p>
                <button onClick={() => setError('')}>OK</button>
              </div>
            )}

            <ul className="notices-list">
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <li key={notice.file} className="notice-item">
                    <span>{new Date(notice.addedDate).toLocaleString()}</span>
                    <button
                      className="pdf-link"
                      onClick={() => openPdfModal(notice.file)}
                    >
                      {notice.file}
                    </button>
                  </li>
                ))
              ) : (
                <li>No PDF uploaded so far</li>
              )}
            </ul>

            <div className="upload-section">
              <label className="upload-label" htmlFor="file-upload">
                {selectedFile ? selectedFile.name : 'Choose File'}
              </label>
              <input
                type="file"
                id="file-upload"
                accept="application/pdf"
                onChange={handleFileChange}
                className={`file-input ${selectedFile ? 'file-selected' : ''}`}
                onClick={(e) => {
                  e.currentTarget.value = null; // Reset file input
                }}
              />
              <button className="upload-btn" onClick={uploadNotice}>
                Upload
              </button>
            </div>

            {showPdfModal && (
              <div className="pdf-modal-overlay" onClick={closePdfModal}>
                <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="pdf-modal-close-btn" onClick={closePdfModal}>×</button>
                
                  {ReactPDF.render(<MyDocument />, `${selectedPdf}`)}
                
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default NoticeModal;
