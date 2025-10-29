"use client";

import { useState } from "react";

export default function GuestbookForm({ onSubmit, isSubmitting = false }) {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    message: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit(formData);
    }
    // Reset form
    setFormData({
      name: "",
      link: "",
      message: "",
      country: "",
    });
  };

  const formHue = 243; // #4447a9 is approximately hsl(243, 43%, 47%)

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="guestbook-stamp form-stamp"
        style={{
          '--hue': formHue,
          '--primary-stamp-color': '#4447a9',
          '--light-stamp-bg': `hsl(${formHue}, 85%, 97%)`,
          '--text-bg-overlay': `hsla(${formHue}, 95%, 98%, 0.82)`,
          '--dark-text-fixed': `hsl(${formHue}, 60%, 20%)`,
          '--mid-grey-fixed': `hsl(${formHue}, 20%, 35%)`,
          '--gold-accent': `hsl(45, 80%, 60%)`,
          '--postmark-color-fixed': `hsla(${formHue}, 40%, 30%, 0.8)`,
          '--border-accent': '#4447a9',
          '--input-bg': `hsla(0, 0%, 100%, 0.7) or hsla(220, 80%, 100%, 0.7)`,
          '--rotate': '-1deg',
        }}
      >
        <div className="stamp-frame">
          <div className="stamp-bg-solid"></div>
        </div>
        <div className="content-overlay">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>
        <div className="form-content">
          <h3 className="form-title">Leave Your Mark</h3>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="name" className="label">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="input"
                placeholder="Your Name"
                maxLength={50}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="country" className="label">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                required
                className="input"
                placeholder="e.g., Nigeria, USA, Canada"
                maxLength={50}
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="link" className="label">Link (optional)</label>
              <input
                type="url"
                name="link"
                id="link"
                className="input"
                placeholder="https://..."
                value={formData.link}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="label">Message (max 500 chars)</label>
            <textarea
              name="message"
              id="message"
              required
              maxLength={500}
              rows={3}
              className="textarea"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
            />
            <div className="char-count">
              {formData.message.length}/500
            </div>
          </div>
          <div className="form-footer">
                <button type="submit" disabled={isSubmitting} className="submit-button">
              {isSubmitting ? "Posting..." : "Post Stamp"}
            </button>
          </div>
        </div>
        <div className="postmark">
          <div className="postmark-outer">
            <div className="postmark-inner">
              <span className="postmark-text">NEW</span>
              <span className="postmark-date">STAMP</span>
            </div>
          </div>
          <div className="postmark-lines"></div>
        </div>
        <div className="stamp-decorative-line left"></div>
        <div className="stamp-decorative-line right"></div>
      </form>
      <style jsx>{`
        .guestbook-stamp.form-stamp {
          --stamp-width: clamp(300px, 90vw, 480px);
          --perforation-size: 0px;
          --inner-padding: 16px;
          position: relative;
          width: var(--stamp-width);
          aspect-ratio: auto;
          min-height: 480px;
          height: auto;
          background-color: var(--light-stamp-bg);
          padding: var(--perforation-size);
          box-sizing: border-box;
          overflow: visible;
          margin: 2rem auto;
          display: block;
          box-shadow:
            2px 3px 12px rgba(0, 0, 0, 0.15),
            0 0 1px rgba(0, 0, 0, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.5);
          transform: rotate(var(--rotate));
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          border-radius: 2px;
        }
        .guestbook-stamp.form-stamp::before {
          display: none;
        }
        .stamp-frame {
          position: absolute;
          top: var(--perforation-size);
          left: var(--perforation-size);
          right: var(--perforation-size);
          bottom: var(--perforation-size);
          overflow: hidden;
          border-radius: 2px;
          z-index: 1;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
        .stamp-bg-solid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            hsla(var(--hue), 85%, 97%, 0.9),
            hsla(var(--hue), 85%, 90%, 0.7)
          );
          opacity: 0.3;
        }
        .content-overlay {
          position: absolute;
          top: calc(var(--perforation-size) + 4px);
          left: calc(var(--perforation-size) + 4px);
          right: calc(var(--perforation-size) + 4px);
          bottom: calc(var(--perforation-size) + 4px);
          background-color: var(--text-bg-overlay);
          z-index: 2;
          border-radius: 3px;
          box-shadow:
            0 0 15px rgba(255, 255, 255, 0.8),
            inset 0 0 2px rgba(0, 0, 0, 0.1);
        }
        .corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-style: solid;
          border-color: var(--primary-stamp-color);
          opacity: 0.7;
        }
        .top-left {
          top: 4px;
          left: 4px;
          border-width: 2px 0 0 2px;
        }
        .top-right {
          top: 4px;
          right: 4px;
          border-width: 2px 2px 0 0;
        }
        .bottom-left {
          bottom: 4px;
          left: 4px;
          border-width: 0 0 2px 2px;
        }
        .bottom-right {
          bottom: 4px;
          right: 4px;
          border-width: 0 2px 2px 0;
        }
        .form-content {
          position: relative;
          top: auto;
          left: auto;
          right: auto;
          bottom: auto;
          margin: calc(var(--perforation-size) + 16px);
          z-index: 4;
          display: flex;
          flex-direction: column;
          padding-bottom: 10px;
        }
        .form-title {
          text-align: center;
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--primary-stamp-color);
          font-size: 1.4rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
        }
        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .form-group {
          margin-bottom: 1rem;
          flex-grow: 1;
        }
        .form-group.half-width {
          flex-basis: calc(50% - 0.5rem);
          min-width: 120px;
        }
        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--mid-grey-fixed);
          margin-bottom: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .input,
        .textarea {
          width: 100%;
          padding: 0.7rem 0.9rem;
          background-color: var(--input-bg);
          color: var(--dark-text-fixed);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 3px;
          box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.7);
          transition: all 0.2s ease;
          font-size: 0.95rem;
          box-sizing: border-box;
          font-family: inherit;
        }
        .input::placeholder,
        .textarea::placeholder {
          color: var(--mid-grey-fixed);
          opacity: 0.8;
        }
        .input:focus,
        .textarea:focus {
          outline: none;
          border-color: var(--primary-stamp-color);
          box-shadow:
            inset 0 0 0 1px var(--primary-stamp-color),
            inset 0 0 5px rgba(255, 255, 255, 0.7);
          background-color: hsla(var(--hue), 90%, 99%, 0.8);
        }
        .textarea {
          resize: vertical;
        }
        .char-count {
          text-align: right;
          font-size: 0.7rem;
          color: var(--mid-grey-fixed);
          margin-top: 0.3rem;
        }
        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: 1rem;
        }
        .submit-button {
          padding: 0.7rem 1.5rem;
          background-color: var(--primary-stamp-color);
          color: white;
          border-radius: 4px;
          transition: all 0.2s ease;
          border: 1px solid hsla(var(--hue), 70%, 40%, 0.5);
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow:
            1px 1px 3px hsla(var(--hue), 50%, 20%, 0.3),
            inset 0 0 0 1px hsla(var(--hue), 70%, 60%, 0.5);
        }
        .submit-button:hover:not(:disabled) {
          background-color: hsl(var(--hue), 65%, 50%);
          transform: translateY(-1px);
          box-shadow:
            2px 2px 5px hsla(var(--hue), 50%, 20%, 0.3),
            inset 0 0 0 1px hsla(var(--hue), 70%, 60%, 0.5);
        }
        .submit-button:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow:
            0 0 2px hsla(var(--hue), 50%, 20%, 0.4),
            inset 0 0 0 1px hsla(var(--hue), 70%, 60%, 0.5);
        }
        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .postmark {
          position: absolute;
          top: 10%;
          right: 10%;
          width: 60px;
          height: 60px;
          z-index: 3;
          transform: rotate(12deg);
        }
        .postmark-outer {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px double var(--postmark-color-fixed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .postmark-inner {
          width: 80%;
          height: 80%;
          border: 1px dashed var(--postmark-color-fixed);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2px;
          color: var(--postmark-color-fixed);
          font-weight: bold;
          text-align: center;
          line-height: 1;
        }
        .postmark-text {
          font-size: 0.55rem;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .postmark-date {
          font-size: 0.5rem;
        }
        .postmark-lines {
          position: absolute;
          top: 50%;
          left: -20px;
          right: -20px;
          height: 20px;
          background-image: repeating-linear-gradient(
            0deg,
            var(--postmark-color-fixed),
            var(--postmark-color-fixed) 1px,
            transparent 1px,
            transparent 3px
          );
          transform: translateY(-50%);
          z-index: -1;
        }
        .stamp-value {
          font-size: 1.2rem;
          color: var(--gold-accent);
          text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
          font-weight: bold;
        }
        .stamp-decorative-line {
          position: absolute;
          height: 85%;
          width: 2px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(
            to bottom,
            transparent,
            var(--border-accent),
            var(--gold-accent),
            var(--border-accent),
            transparent
          );
          opacity: 0.3;
          z-index: 3;
        }
        .stamp-decorative-line.left {
          left: calc(var(--perforation-size) + 4px);
        }
        .stamp-decorative-line.right {
          right: calc(var(--perforation-size) + 4px);
        }
        @media (max-width: 768px) {
          .guestbook-stamp.form-stamp {
            --stamp-width: clamp(280px, 85vw, 400px);
            min-height: 420px;
  
            margin: 1.5rem auto;
          }
          .form-content {
            margin: calc(var(--perforation-size) + 12px);
            padding-bottom: 5px;
          }
          .form-title {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
          .form-row {
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .form-group {
            margin-bottom: 0.6rem;
          }
          .form-group.half-width {
            flex-basis: 100%;
            width: 100%;
          }
          .label {
            font-size: 0.7rem;
            margin-bottom: 0.3rem;
          }
          .input,
          .textarea {
            padding: 0.6rem 0.8rem;
            font-size: 0.9rem;
          }
          .textarea {
            resize: none;
          }
          .submit-button {
            padding: 0.6rem 1.2rem;
            font-size: 0.75rem;
          }
          .postmark {
            width: 50px;
            height: 50px;
            top: 8%;
            right: 8%;
          }
        }
        @media (max-width: 400px) {
          .guestbook-stamp.form-stamp {
            --perforation-size: 10px;
            --inner-padding: 12px;
            width: 95vw;
            min-height: auto;
            margin: 1rem auto;
          }
          .form-content {
            margin: calc(var(--perforation-size) + 10px);
          }
          .form-title {
            font-size: 1.1rem;
            margin-bottom: 0.75rem;
          }
          .label {
            font-size: 0.7rem;
            margin-bottom: 0.2rem;
          }
          .input,
          .textarea {
            padding: 0.5rem 0.7rem;
            font-size: 0.85rem;
          }
          .submit-button {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
            white-space: nowrap;
          }
          .form-footer {
            padding-top: 0.5rem;
          }
          .stamp-value {
            font-size: 1rem;
          }
          .postmark {
            width: 45px;
            height: 45px;
            top: 8%;
            right: 8%;
          }
        }
      `}</style>
    </>
  );
}
