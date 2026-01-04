export const fetchComplaints = async () => {
  const res = await fetch("/complaint.json");

  if (!res.ok) {
    throw new Error("Failed to fetch complaints");
  }

  return res.json();
};
