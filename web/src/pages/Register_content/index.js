import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Step1 from '../../components/Add_module';
import Step2 from '../../components/Add_content';
// import Result from './Result';

function Register_content() {
  return (
    <div className="container">
      <h1>Form Wizzard</h1>

      <Router>
        <>
          <Step2 />
          <nav>
            <ul>
              <li>
                <Link to="/step1">Step 1</Link>
              </li>
              <li>
                <Link to="/step2">Step 2</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/step1" component={Step1} />
          <Route path="/step2" component={Step2} />
        </>
      </Router>
    </div>
  );
}

export default Register_content;
