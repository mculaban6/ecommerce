import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <Spinner className="spinner" animation="border" variant="primary" />
      {/* <Spinner className="spinner" animation="grow" variant="primary" />*/}
      {/*<span className="spinner"><img>Loading...</h3></span>*/}
      {/*<span><img src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/media/221d6bfc1960ab98a7585fcc2a4d0181.gif" width="1200" height="700"/></span> */}
    </>
  );
}
