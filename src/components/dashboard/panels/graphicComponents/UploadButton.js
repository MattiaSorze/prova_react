// components/UploadButton.js
import { Button } from "@mui/joy"
import { useRef } from "react"
import "../addHikingDrawer.css";
import CheckIcon from '@mui/icons-material/Check';

const UploadButton = ({ onFileChange, fileName, label, isFileLoaded, leftIcon, disabled }) => {
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div>
      <Button
        className="upload-button-style-drawer"
        onClick={handleUploadClick}
        //startDecorator={leftIcon}
        //endDecorator={isFileLoaded ? <CheckIcon style={{marginLeft: "15px"}}/> : null}
        disabled={disabled}
      >
        <div style={{width: "30%", marginTop: "2px"}}>{leftIcon}</div>
        <div style={{width: "70%", marginTop: "1px"}}>{label}</div>
        <div style={{width: "30%", marginTop: "2px"}}>{isFileLoaded ? <CheckIcon/> : null}</div>
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
