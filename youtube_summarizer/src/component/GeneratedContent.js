import React from "react";

const GeneratedContent = ({ title, description, keyPoints }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Generated Content</h2>
      <div style={styles.section}>
        <h3 style={styles.subHeading}>Title:</h3>
        <p style={styles.text}>{title}</p>
      </div>
      <div style={styles.section}>
        <h3 style={styles.subHeading}>Description:</h3>
        <p style={styles.text}>{description}</p>
      </div>
      <div style={styles.section}>
        <h3 style={styles.subHeading}>Key Points:</h3>
        <ul style={styles.list}>
          {keyPoints.map((point, index) => (
            <li key={index} style={styles.listItem}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  section: {
    marginBottom: "15px",
  },
  subHeading: {
    color: "#444",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "5px",
  },
  text: {
    color: "#555",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  list: {
    marginTop: "5px",
    paddingLeft: "20px",
  },
  listItem: {
    color: "#555",
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "5px",
  },
};

export default GeneratedContent;
