import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoticeModal.css';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
const Src = import.meta.env.VITE_Src;


function NoticeModal({ showNoticeModal, toggleModal }) {
  const [notices, setNotices] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfName, setPdfName] = useState('');

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${Src}/notices`);
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadNotice = async () => {
    if (!selectedFile || !pdfName) return;
    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadError('File size is greater than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      await axios.post(`${Src}/uploadNotice`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPdfName(''); // Clear the name field after upload
      fetchNotices(); // Refresh the list
    } catch (error) {
      console.error('Error uploading notice:', error);
    }
  };

  const openPdfModal = (pdfId) => {
    setLoading(true);
    setSelectedPdf(`${Src}/api/notices/${pdfId}`);
    setShowPdfModal(true);
    setLoading(false);
  };

  useEffect(() => {
    if (showNoticeModal) {
      fetchNotices();
    }
  }, [showNoticeModal]);

  return (
    <>
      {showNoticeModal && (
        <div className="modal-overlay" onClick={() => toggleModal('notice')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => toggleModal('notice')}>×</button>
            <h2>Latest Notices</h2>

            {/* Notices List */}
            <ul>
              {notices.length === 0 ? (
                <li>No PDF uploaded so far.</li>
              ) : (
                notices.map((notice) => (
                  <li key={notice.file}>
                    <button onClick={() => openPdfModal(notice.file)}>
                      {notice.file} - {new Date(notice.addedDate).toLocaleString()}
                    </button>
                  </li>
                ))
              )}
            </ul>

            {/* Upload Section */}
            <div className="upload-section">
              {uploadError && (
                <div className="error-modal">
                  <p>{uploadError}</p>
                  <button onClick={() => setUploadError(null)}>OK</button>
                </div>
              )}
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
              <input
                type="text"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
                placeholder="Enter PDF name"
              />
              <button onClick={uploadNotice} disabled={!selectedFile || !pdfName}>
                Upload Notice
              </button>
            </div>

            {/* PDF Modal */}
            {showPdfModal && (
              <div className="pdf-modal-overlay" onClick={() => setShowPdfModal(false)}>
                <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="pdf-modal-close-btn" onClick={() => setShowPdfModal(false)}>×</button>
                  {loading ? (
                    <p>Loading PDF...</p>
                  ) : (

                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">

                    
                    <Viewer fileUrl={selectedPdf} />
                </Worker>
                  )}
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
