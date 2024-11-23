import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './noticeModal.css';
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
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${Src}/notices`);
      setNotices(response.data);
    } catch (error) {
      console.log('Error fetching notices:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadNotice = async () => {
    if (!selectedFile) return;
    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadError('File size is greater than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      await axios.post(`${Src}/uploadNotice`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted); // Update progress state
        },
      });
      setSelectedFile(null); // Clear selected file after upload
      setUploadProgress(0); // Reset progress
      fetchNotices(); // Refresh notices
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
        <div className="notice-modal-overlay" onClick={() => toggleModal('notice')}>
          <div className="notice-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="notice-close-btn" onClick={() => toggleModal('notice')}>×</button>
            <h2>Latest Notices</h2>
            <hr></hr>
  
            {/* Notices List */}
            <div className="notice-main">
            <div className="notice-modal-left">
            <ul className="notice-ul">
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
            </div>
  
            {/* Upload Section */}
            <div className="notice-modal-right">
            <div className="notice-upload-section">
              {uploadError && (
                <div className="notice-error-modal">
                  <p>{uploadError}</p>
                  <button onClick={() => setUploadError(null)}>OK</button>
                </div>
              )}
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <button
                onClick={uploadNotice}
                disabled={!selectedFile || uploadProgress !== 0}
              >
                {uploadProgress > 0 && uploadProgress < 100
                  ? `Uploading... ${uploadProgress}%`
                  : 'Upload Notice'}
              </button>
            </div>
            </div>
            </div>
  
            {/* PDF Modal */}
            {showPdfModal && (
              <div
                className="notice-pdf-modal-overlay"
                onClick={() => setShowPdfModal(false)}
              >
                <div
                  className="notice-pdf-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="notice-pdf-modal-close-btn"
                    onClick={() => setShowPdfModal(false)}
                  >
                    ×
                  </button>
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
