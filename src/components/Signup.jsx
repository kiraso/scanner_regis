import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaImage } from "react-icons/fa";
import logo from "../assets/logobenpng.png";

const Signup = () => {
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  /* ===== IMAGE UPLOAD ===== */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "ไฟล์ที่อัปโหลดต้องเป็นรูปภาพเท่านั้น",
      }));
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });

    setErrors((prev) => ({ ...prev, image: null }));
  };

  /* ===== VALIDATE ===== */
  const validate = () => {
    const newErrors = {};

    if (!studentId.trim()) newErrors.studentId = "กรุณากรอกรหัสนักเรียน";
    if (!fullName.trim()) newErrors.fullName = "กรุณากรอกชื่อ-นามสกุล";
    if (!classLevel.trim()) newErrors.classLevel = "กรุณากรอกชั้นเรียน";
    if (!image) newErrors.image = "กรุณาอัปโหลดรูปภาพหน้าเครื่อง Scan";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ===== SUBMIT (OPEN DIALOG) ===== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      studentId,
      fullName,
      classLevel,
      imageFile: image.file,
      imagePreview: image.preview,
      timestamp: new Date().toISOString(),
    };

    setSubmittedData(payload);
    setOpenDialog(true);
  };

  /* ===== FINAL SEND ===== */
  const handleFinalSubmit = () => {
    console.log("SEND TO SERVER:", submittedData);

    alert("ส่งข้อมูลเรียบร้อย");
    setOpenDialog(false);

    // reset form
    setStudentId("");
    setFullName("");
    setClassLevel("");
    setImage(null);
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* ===== HEADER ===== */}
      <div className="text-center py-6">
        <img
          src={logo}
          alt="logo"
          className="w-[20%] mx-auto object-contain mb-3"
        />
        <h1 className="text-5xl font-semibold text-green-500">
          Scanner Support
        </h1>
        <p className="text-gray-500 mt-2">
          ระบบช่วยเหลือการแจ้งข้อมูลการเข้าเรียนกรณีเครื่องสแกนเนอร์
        </p>
      </div>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit}>
        {/* Student ID */}
        <div className="border-2 border-green-500 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <CiUser className="text-xl" />
            <input
              className="w-full outline-none bg-transparent"
              placeholder="รหัสนักเรียน"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setErrors((p) => ({ ...p, studentId: null }));
              }}
            />
          </div>
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
          )}
        </div>

        {/* Full Name */}
        <div className="my-4 border-2 border-green-500 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <CiUser className="text-xl" />
            <input
              className="w-full outline-none bg-transparent"
              placeholder="ชื่อ-นามสกุล"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors((p) => ({ ...p, fullName: null }));
              }}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Class */}
        <div className="my-4 border-2 border-green-500 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <CiUser className="text-xl" />
            <input
              className="w-full outline-none bg-transparent"
              placeholder="ชั้นเรียน (เช่น ม.6/1)"
              value={classLevel}
              onChange={(e) => {
                setClassLevel(e.target.value);
                setErrors((p) => ({ ...p, classLevel: null }));
              }}
            />
          </div>
          {errors.classLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.classLevel}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="my-4 border-2 border-green-500 rounded-lg p-2">
          {image ? (
            <div className="flex flex-col items-center">
              <img
                src={image.preview}
                className="w-40 h-40 object-cover rounded mb-2"
                alt="preview"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="text-red-500 text-sm"
              >
                ลบรูป
              </button>
            </div>
          ) : (
            <label className="flex justify-center items-center gap-2 cursor-pointer">
              <FaImage />
              <span className="text-gray-500">
                อัปโหลดรูปภาพหน้าเครื่อง Scan
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm text-center mt-1">
              {errors.image}
            </p>
          )}
        </div>

        <button className="w-full bg-green-500 text-white p-2 rounded-lg">
          Submit
        </button>
      </form>

      {/* ===== DIALOG ===== */}
      {openDialog && submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenDialog(false)}
          />

          <div className="relative bg-white w-[90%] max-w-md rounded-lg p-4 z-10">
            <h2 className="text-lg font-semibold text-center mb-3">
              ตรวจสอบข้อมูลก่อนส่ง
            </h2>

            <div className="space-y-2 text-sm">
              <p><b>รหัสนักเรียน:</b> {submittedData.studentId}</p>
              <p><b>ชื่อ-นามสกุล:</b> {submittedData.fullName}</p>
              <p><b>ชั้นเรียน:</b> {submittedData.classLevel}</p>
              <p>
                <b>เวลา:</b>{" "}
                {new Date(submittedData.timestamp).toLocaleString()}
              </p>

              <img
                src={submittedData.imagePreview}
                className="w-full h-48 object-cover rounded mt-2"
                alt="scan"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="w-1/2 border rounded-lg p-2"
                onClick={() => setOpenDialog(false)}
              >
                แก้ไขข้อมูล
              </button>
              <button
                className="w-1/2 bg-green-500 text-white rounded-lg p-2"
                onClick={handleFinalSubmit}
              >
                ส่งข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;