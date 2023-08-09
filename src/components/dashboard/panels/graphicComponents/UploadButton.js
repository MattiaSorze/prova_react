// components/UploadButton.js
import { Button } from "@mui/joy"
import { useRef } from "react"
import "../../addHiking.css";

const UploadButton = ({ onFileChange, fileName, label }) => {
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div>
      <Button
        //className="bg-blue-500 text-white px-4 py-2 rounded-md"
        className="upload-button-style"
        onClick={handleUploadClick}
      >
        {label}
      </Button>
      <input
        className="input-style"
        ref={fileInputRef}
        type="file"
        onChange={onFileChange}
      />
    </div>
  )
}

export default UploadButton
