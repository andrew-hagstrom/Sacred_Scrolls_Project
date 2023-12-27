
import { Link } from 'react-router-dom'

import Row from "react-bootstrap/Row"

export const NotFoundPage = () => {
    return (
      <Row className="justify-content-center">
        <div>
          <h1>Page Not Found</h1>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <Link to="/">Go Back Home</Link>
        </div>
      </Row>
    );
  };