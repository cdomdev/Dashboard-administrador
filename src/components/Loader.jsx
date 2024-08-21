import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <div className="container-loader-page">
      <Spinner animation="grow" variant="primary" className="spiner-page" />
      <span>Suministros</span>
    </div>
  );
};
