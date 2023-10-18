// components/UploadButton.js
import { Button } from "@mui/joy"
import { useRef } from "react"
import "../../addHiking.css";
import CheckIcon from '@mui/icons-material/Check';

const UploadButton = ({ onFileChange, fileName, label, isFileLoaded }) => {
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
        endDecorator={isFileLoaded ? <CheckIcon/> : null}
      >
        {label}
      </Button>
      <input
        className="input-style"
        ref={fileInputRef}
        type="file"
        onChange={onFileChange}
        multiple={true}
      />
    </div>
  )
}

export default UploadButton
