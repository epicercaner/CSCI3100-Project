import React, { useState } from "react";

export default function Setting() {
  const [password, setPassword] = useState({ old: "", new: "" });

  const handleUpdate = () => {
    alert("密碼更新成功！");
    setPassword({ old: "", new: "" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Settings</h2>
      <div style={{ marginTop: "20px" }}>
        <h4 style={{ marginBottom: "10px" }}>通知設定</h4>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <input type="checkbox" defaultChecked /> 接收電子郵件通知
        </label>
        
        <hr style={{ margin: "20px 0", border: "0.5px solid #eee" }} />
        
        <h4 style={{ marginBottom: "10px" }}>更改密碼</h4>
        <input 
          type="password" 
          placeholder="舊密碼" 
          style={inputStyle} 
          value={password.old}
          onChange={(e) => setPassword({...password, old: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="新密碼" 
          style={inputStyle} 
          value={password.new}
          onChange={(e) => setPassword({...password, new: e.target.value})}
        />
        <button onClick={handleUpdate} style={btnStyle}>更新設定</button>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" };
const btnStyle = { padding: "10px 20px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };