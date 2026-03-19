import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaPenNib, FaRegEdit, FaSave, FaTimes } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    username: "User_2026",
    email: "user@example.com",
    bio: "Hello! I am a React developer.",
    memberSince: "March 2026",
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Saving profile to API:", tempProfile);
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>Account Information</h2>
        {/* 動態顯示按鈕 */}
        {isEditing ? (
          <div style={styles.headerBtnGroup}>
            <button onClick={handleSave} style={styles.saveBtn}>
              <FaSave style={styles.btnIcon} /> Save
            </button>
            <button onClick={handleCancel} style={styles.cancelBtn}>
              <FaTimes style={styles.btnIcon} /> Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleEdit} style={styles.editBtn}>
            <FaRegEdit style={styles.btnIcon} /> Edit Profile
          </button>
        )}
      </div>

      <div style={styles.infoContainer}>
        {/* 用戶頭像與名稱 (靜態顯示區) */}
        <div style={styles.avatarRow}>
          <FaUserCircle style={styles.avatarIcon} />
          <div>
            {isEditing ? (
              <input
                style={styles.inputUsername}
                name="username"
                value={tempProfile.username}
                onChange={handleChange}
                placeholder="Username"
              />
            ) : (
              <p style={styles.valueUsername}>{profile.username}</p>
            )}
            <p style={styles.joinDate}>
              <MdOutlineDateRange style={styles.smallIcon} /> Joined {profile.memberSince}
            </p>
          </div>
        </div>

        <hr style={styles.divider} />

        {/* 電子郵件欄位 */}
        <div style={styles.fieldRow}>
          <div style={styles.iconColumn}>
            <FaEnvelope style={styles.fieldIcon} />
          </div>
          <div style={styles.contentColumn}>
            <label style={styles.label}>Email Address</label>
            {isEditing ? (
              <input
                style={styles.input}
                name="email"
                type="email"
                value={tempProfile.email}
                onChange={handleChange}
              />
            ) : (
              <p style={styles.value}>{profile.email}</p>
            )}
          </div>
        </div>

        {/* 個人簡介欄位 */}
        <div style={styles.fieldRow}>
          <div style={styles.iconColumn}>
            <FaPenNib style={styles.fieldIcon} />
          </div>
          <div style={styles.contentColumn}>
            <label style={styles.label}>Bio</label>
            {isEditing ? (
              <textarea
                style={{ ...styles.input, height: "100px", resize: "none" }}
                name="bio"
                value={tempProfile.bio}
                onChange={handleChange}
              />
            ) : (
              <p style={styles.valueBio}>{profile.bio || "No bio yet."}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: "30px",
    maxWidth: "800px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  title: {
    fontSize: "24px",
    margin: 0,
    color: "#333",
    fontWeight: "600",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  avatarRow: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  avatarIcon: {
    fontSize: "70px",
    color: "#ccc",
  },
  valueUsername: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
    color: "#1a1a1a",
  },
  inputUsername: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "250px",
  },
  joinDate: {
    fontSize: "14px",
    color: "#888",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  divider: {
    border: "0.5px solid #eee",
    margin: "10px 0",
  },
  fieldRow: {
    display: "flex",
    gap: "15px",
    alignItems: "flex-start",
  },
  iconColumn: {
    width: "40px",
    display: "flex",
    justifyContent: "center",
    paddingTop: "5px", 
  },
  fieldIcon: {
    fontSize: "20px",
    color: "#007bff", 
  },
  contentColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    color: "#666",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  value: {
    fontSize: "16px",
    color: "#333",
    margin: 0,
    padding: "5px 0",
  },
  valueBio: {
    fontSize: "15px",
    color: "#555",
    margin: 0,
    lineHeight: "1.6",
    fontStyle: profile => (profile.bio ? "normal" : "italic"),
  },
  smallIcon: {
    fontSize: "16px",
  },
  // 輸入框
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "border-color 0.2s",
    "&:focus": {
      borderColor: "#007bff",
    },
  },
  // 按鈕
  headerBtnGroup: {
    display: "flex",
    gap: "10px",
  },
  btnIcon: {
    marginRight: "7px",
  },
  editBtn: {
    padding: "8px 16px",
    backgroundColor: "white",
    color: "#007bff",
    border: "1px solid #007bff",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  saveBtn: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
};