
interface ITestimonialCardProps {
  image: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({
  image,
  name,
  role,
  text,
  rating
}: ITestimonialCardProps) {
  const stars = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <article className="carousel-card">
      <img src={image} alt="Imagem ilustrativa do depoimento" />

      <div className="testimony">
        <p>“{text}”</p>
      </div>

      <div
        className="rating"
        aria-label={`Avaliação de ${stars} de 5 estrelas`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} aria-hidden="true">
            {index < stars ? "★" : "☆"}
          </span>
        ))}
      </div>

      <div className="names">
        <p>{name}</p>
        <p>{role}</p>
      </div>
    </article>
  );
}
