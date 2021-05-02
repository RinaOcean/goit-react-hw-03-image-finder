import sadImg from '../../61j-C2pqN5L._AC_SL1280_.jpg';

export default function ErrorMarkup() {
  return (
    <div className="error-text">
      <h1>Ooops!Something went wrong. Try again later</h1>
      <img width="150" src={sadImg} alt="sad face" />
    </div>
  );
}
