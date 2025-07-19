import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FileUpload = ({ 
  onFileSelect, 
  acceptedTypes = "image/*,application/pdf", 
  maxSize = 5,
  label = "Upload Document",
  multiple = false 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const sizeInMB = file.size / (1024 * 1024);
      return sizeInMB <= maxSize;
    });
    
    setSelectedFiles(validFiles);
    onFileSelect(validFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer",
          isDragOver 
            ? "border-primary-500 bg-primary-50" 
            : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <ApperIcon name="Upload" className="w-8 h-8 mx-auto text-slate-400 mb-3" />
        <p className="text-sm font-medium text-slate-700 mb-1">
          {label}
        </p>
        <p className="text-xs text-slate-500">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Max file size: {maxSize}MB
        </p>
        
        <input
          id="file-input"
          type="file"
          className="hidden"
          accept={acceptedTypes}
          multiple={multiple}
          onChange={handleFileInput}
        />
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <ApperIcon name="File" className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-700">{file.name}</span>
                <span className="text-xs text-slate-500">
                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newFiles = selectedFiles.filter((_, i) => i !== index);
                  setSelectedFiles(newFiles);
                  onFileSelect(newFiles);
                }}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <ApperIcon name="X" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;