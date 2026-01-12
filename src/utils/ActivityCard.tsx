interface ActivityCardProps {
  activity: {
    title: string;
    author: string;
    description: string;
    age_min: number;
    age_max: number;
    duration_min: number;
    nb_kids: number;
    image_url: string;
    pdf_url: string;
  };
  onClick: (url: string) => void;
}

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
          <label>{activity.duration_min} min</label>
          <label>{activity.nb_kids} enfants</label>
        </div>
      </div>
    </div>
  );
}
