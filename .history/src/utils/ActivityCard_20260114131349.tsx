interface ActivityCardProps {
  activity: {
    title: string;
    author: string;
    description: string;
    age_min: number;
    age_max: number;
    duration_min: number;
    duration_max: number;
    nb_kids: number;
    image_url: string;
    pdf_url: string;
  };
  onClick: (url: string) => void;
}

// Renvoie les heures et minutes
const formatDuration = (totalDuration: number): string => {
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  let result = "";

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (minutes > 0) {
    if (hours > 0) {
      result += `${minutes}`;
    } else {
      result += `${minutes}min`;
    }
  }

  return result.trim();
};

export default function ActivityCard({ activity, onClick }: ActivityCardProps) {
  return (
    <div className="activity-card" onClick={() => onClick(activity.pdf_url)}>
      <img src={activity.image_url} alt={activity.title} />

      <div className="card-content">
        <div className="top-card-container">
          <p className="author">{activity.author}</p>
          <h3>{activity.title}</h3>
          <p className="description">{activity.description}</p>
        </div>

        <div className="labels">
          <label>
            {activity.age_min} à {activity.age_max} ans
          </label>

          <label>
            {formatDuration(activity.duration_min)} à{" "}
            {formatDuration(activity.duration_max)}
          </label>

          <label>{activity.nb_kids} enfants</label>
        </div>
      </div>
    </div>
  );
}
