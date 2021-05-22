import React from "react";

export default function Category() {
  return (
    <div>
      <section className="pt-7 pt-md-10 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                <div className="card-zoom">
                  <img
                    className="card-img-top"
                    src="https://engineeringhistoricalmemory.com/Images/apps/Afro-eurasia.png"
                    alt="..."
                  />
                </div>

                <div className="card-body">
                  <div className="shape shape-bottom-100 shape-fluid-x text-white">
                    <svg
                      viewBox="0 0 2880 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                        fill="currentColor"
                      />
                    </svg>{" "}
                  </div>

                  <h6 className="text-uppercase mb-1 text-muted">Branding</h6>

                  <h4 className="mb-0">Curology Campaign</h4>
                </div>
              </a>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <a className="card mb-6 mb-lg-0 shadow-light-lg" href="#!">
                <div className="card-zoom">
                  <img
                    className="card-img-top"
                    src="https://engineeringhistoricalmemory.com/Images/apps/Aggregator.png"
                    alt="..."
                  />
                </div>

                <div className="card-body">
                  <div className="shape shape-bottom-100 shape-fluid-x text-white">
                    <svg
                      viewBox="0 0 2880 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                        fill="currentColor"
                      />
                    </svg>{" "}
                  </div>

                  <h6 className="text-uppercase mb-1 text-muted">Branding</h6>

                  <h4 className="mb-0">Honest Packaging</h4>
                </div>
              </a>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <a className="card d-md-none d-lg-flex shadow-light-lg" href="#!">
                <div className="card-zoom">
                  <img
                    className="card-img-top"
                    src="https://engineeringhistoricalmemory.com/Images/apps/Bosch.jpg"
                    alt="..."
                  />
                </div>

                <div className="card-body">
                  <div className="shape shape-bottom-100 shape-fluid-x text-white">
                    <svg
                      viewBox="0 0 2880 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
                        fill="currentColor"
                      />
                    </svg>{" "}
                  </div>

                  <h6 className="text-uppercase mb-1 text-muted">Ideation</h6>

                  <h4 className="mb-0">Doodle Pad</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
