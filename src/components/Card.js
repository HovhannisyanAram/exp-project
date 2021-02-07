export default function Card({ img, text, imgAlt, active }) {
  return (
      <div className={`card ${active ? 'active' : ''}`}>
          <img src={img} alt={imgAlt} />
          <p>{text}</p>
      </div>
  )
}