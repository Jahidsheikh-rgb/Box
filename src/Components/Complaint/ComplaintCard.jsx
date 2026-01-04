// components/ComplaintCard.jsx
const ComplaintCard = ({ complaint }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      {complaint.image && (
        <figure>
          <img
            src={complaint.image}
            alt="complaint"
            className="h-52 w-full object-cover"
          />
        </figure>
      )}

      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{complaint.title}</h2>
          <span className="badge badge-success">
            {complaint.department}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {complaint.description}
        </p>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{complaint.author}</span>
          <span>{complaint.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
