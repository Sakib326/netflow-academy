export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white text-center py-4">
                <h2 className="mb-0">Terms & Conditions</h2>
              </div>
              <div className="card-body p-5">
                <div className="terms-list">
                  <div className="term-item mb-4 p-3 border-start border-primary border-4 bg-light">
                    <h5 className="text-primary mb-2">1. Attendance Policy</h5>
                    <p className="mb-0">Must attend all classes.</p>
                  </div>

                  <div className="term-item mb-4 p-3 border-start border-primary border-4 bg-light">
                    <h5 className="text-primary mb-2">
                      2. Assignment Submission
                    </h5>
                    <p className="mb-0">
                      Homework must be submitted for each class.
                    </p>
                  </div>

                  <div className="term-item mb-4 p-3 border-start border-primary border-4 bg-light">
                    <h5 className="text-primary mb-2">3. Practical Learning</h5>
                    <p className="mb-0">Have to practice practically.</p>
                  </div>

                  <div className="term-item mb-4 p-3 border-start border-primary border-4 bg-light">
                    <h5 className="text-primary mb-2">
                      4. Guidelines Compliance
                    </h5>
                    <p className="mb-0">Guidelines must be followed.</p>
                  </div>

                  <div className="term-item mb-4 p-3 border-start border-primary border-4 bg-light">
                    <h5 className="text-primary mb-2">
                      5. Patience & Commitment
                    </h5>
                    <p className="mb-0">
                      Minimum 6 months to 1 year should be patient.
                    </p>
                  </div>

                  <div className="term-item mb-4 p-3 border-start border-primary border-4 bg-light">
                    <h5 className="text-primary mb-2">6. Daily Practice</h5>
                    <p className="mb-0">
                      Daily minimum 3 to 5 hours of practice should be done.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-5 pt-4 border-top">
                  <p className="text-muted mb-0">
                    <small>
                      By enrolling in our courses, you agree to these terms and
                      conditions.
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
