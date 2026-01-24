import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ১. লোকাল স্টোরেজ থেকে টোকেন নেওয়া
  const token = localStorage.getItem("token");

  // ================= FETCH DATA FROM DATABASE =================
  useEffect(() => {
    const getComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaints", {
          headers: { 
            Authorization: `Bearer ${token}` // এখানে টোকেন না দিলে ৪০১ এরর আসবে
          },
        });
        setComplaints(res.data.data || res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        if (err.response?.status === 401) {
          toast.error("আপনার সেশন শেষ হয়ে গেছে, আবার লগইন করুন।");
        }
      } finally {
        setFetching(false);
      }
    };
    if (token) getComplaints();
  }, [token]);

  // ================= IMAGE PREVIEW LOGIC =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= SUBMIT COMPLAINT =================
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("আপনি লগইন করা নেই!");
      return;
    }
    
    setLoading(true);
    try {
      let photoURL = "";

      // Step A: ImgBB এ ছবি আপলোড
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=ec638d6b6eabd0cb20b266acfa06c403`,
          formData
        );
        photoURL = imgRes.data.data.display_url;
      }

      // Step B: ব্যাকেন্ড অবজেক্ট তৈরি
      const backendData = {
        title: data.title,
        problemType: data.problemType,
        department: data.department,
        description: data.description,
        image: photoURL, // ছবির লিঙ্ক
        priority: "MEDIUM",
      };

      // Step C: ব্যাকেন্ডে POST রিকোয়েস্ট পাঠানো
      const response = await axios.post(
        "http://localhost:5000/api/complaints",
        backendData,
        {
          headers: { 
            Authorization: `Bearer ${token}` // ৪০১ এরর সমাধানের প্রধান লাইন
          },
        }
      );

      // সফল হলে টেবিল আপডেট
      const newEntry = response.data.data || response.data;
      setComplaints((prev) => [newEntry, ...prev]);

      toast.success("অভিযোগটি জমা দেওয়া হয়েছে!");
      reset();
      setPreview(null);
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error(err.response?.data?.message || "সার্ভারে ডাটা পাঠানো যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  // সার্চিং লজিক
  const filteredData = useMemo(() => {
    return complaints.filter((c) =>
      c.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [complaints, searchQuery]);

  if (fetching) return <div className="text-center mt-20 text-success font-bold">লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-10 text-slate-800">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold">Welcome, {user?.displayName || "Student"} 👋</h1>
        <p className="text-slate-500 mt-1 font-medium italic">আপনার অভিযোগের বর্তমান অবস্থা জানুন।</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-white">
        <div className="bg-emerald-500 p-6 rounded-3xl shadow-lg">
          <p className="text-xs font-bold uppercase opacity-80">Total Complaints</p>
          <h3 className="text-4xl font-black mt-2">{complaints.length}</h3>
        </div>
        <div className="bg-blue-500 p-6 rounded-3xl shadow-lg">
          <p className="text-xs font-bold uppercase opacity-80">Resolved</p>
          <h3 className="text-4xl font-black mt-2">{complaints.filter(c => c.status === "RESOLVED").length}</h3>
        </div>
        <div className="bg-amber-500 p-6 rounded-3xl shadow-lg">
          <p className="text-xs font-bold uppercase opacity-80">Pending</p>
          <h3 className="text-4xl font-black mt-2">{complaints.filter(c => c.status === "PENDING").length}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table View */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Submission History</h2>
            <input
              type="text"
              placeholder="Search by title..."
              className="input input-bordered input-sm w-48 lg:w-64"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-slate-400 text-xs">
                  <th>TITLE</th>
                  <th>DEPT</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 border-b border-slate-50">
                    <td className="py-4">
                      <div className="font-bold text-slate-700">{item.title}</div>
                      <div className="text-[10px] text-green-600 font-bold uppercase">{item.problemType}</div>
                    </td>
                    <td><span className="badge badge-ghost text-xs font-bold">{item.department}</span></td>
                    <td className="text-slate-400 text-xs">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge border-none font-bold py-3 px-4 ${
                        item.status === "PENDING" ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form View */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-6">New Complaint</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className={`border-2 border-dashed rounded-xl p-4 text-center ${preview ? 'border-green-500' : 'border-slate-200'}`}>
              {preview ? (
                <div className="relative inline-block">
                  <img src={preview} className="h-20 w-20 object-cover rounded-lg" alt="Preview" />
                  <button type="button" onClick={() => { setPreview(null); reset({ photo: null }); }} className="btn btn-circle btn-xs absolute -top-2 -right-2">✕</button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <span className="text-xs font-bold text-slate-400">Add Proof Image</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    {...register("photo")} 
                    onChange={(e) => {
                      handleImageChange(e);
                      register("photo").onChange(e); // এটি অবশ্যই দিতে হবে
                    }} 
                  />
                  <div className="text-2xl text-slate-300">+</div>
                </label>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Title</label>
              <input type="text" className="input input-bordered w-full mt-1" {...register("title", { required: true })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Type</label>
                <select className="select select-bordered w-full mt-1" {...register("problemType", { required: true })}>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Electrical">Electrical</option>
                  <option value="IT Support">IT Support</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Dept</label>
                <select className="select select-bordered w-full mt-1" {...register("department", { required: true })}>
                  <option value="CSE&CSIT">CSE&CSIT</option>
                  <option value="FDT">FDT</option>
                  <option value="Law">Law</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
              <textarea className="textarea textarea-bordered w-full mt-1 h-20" {...register("description", { required: true })}></textarea>
            </div>

            <button disabled={loading} className="btn btn-success w-full text-white font-bold">
              {loading ? <span className="loading loading-spinner"></span> : "File Complaint"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;