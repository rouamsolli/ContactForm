import React, { Component } from "react";
import "./Contact.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        queryType: "",
        message: "",
        consent: false,
      },
      errors: {},
      messageVisible: false,
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;

   
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));

    
    if (name === "queryType") {
      const allOptions = document.querySelectorAll(".query-type");
      allOptions.forEach((option) => option.classList.remove("selected"));
      const parentDiv = e.target.closest(".query-type");
      if (parentDiv) parentDiv.classList.add("selected");
    }
  };

  validateForm = () => {
    const { formData } = this.state;
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "This field is required";
    if (!formData.lastName) newErrors.lastName = "This field is required";
    if (!formData.email) newErrors.email = "This field is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.queryType) newErrors.queryType = "Please select a query type";
    if (!formData.message) newErrors.message = "This field is required";
    if (!formData.consent) newErrors.consent = "To submit this form, please consent to being contacted";
    return newErrors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = this.validateForm();
    if (Object.keys(validationErrors).length === 0) {
      this.setState({ messageVisible: true });
      setTimeout(() => this.setState({ messageVisible: false }), 5000);

      this.setState({
        formData: {
          firstName: "",
          lastName: "",
          email: "",
          queryType: "",
          message: "",
          consent: false,
        },
      });

     
      const allOptions = document.querySelectorAll(".query-type");
      allOptions.forEach((option) => option.classList.remove("selected"));
    } else {
      this.setState({ errors: validationErrors });
    }
  };

  render() {
    const { formData, errors, messageVisible } = this.state;

    return (
      <div>
        {messageVisible && (
          <div className="message">
            <div>
              <span>Message Sent!</span>
            </div>
            <p>Thanks for completing the form. We'll be in touch soon!</p>
          </div>
        )}
        <div className="form-container">
          <h1>Contact Us</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="name-inputs">
              <div className="form-group">
                <label htmlFor="first-name">
                  First Name <span className="star">*</span>
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={this.handleChange}
                  aria-required="true"
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="last-name">
                  Last Name <span className="star">*</span>
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={this.handleChange}
                  aria-required="true"
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="star">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={this.handleChange}
                aria-required="true"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group radio">
              <label htmlFor="query">
                Query Type <span className="star">*</span>
              </label>
              <div id="query">
                <div className={`query-type ${formData.queryType === "General Enquiry" ? "selected" : ""}`}>
                <input
  type="radio"
  id="option1"
  name="queryType"
  value="General Enquiry"
  checked={formData.queryType === "General Enquiry"}
  onChange={this.handleChange}
/>

                  <label htmlFor="option1">General Enquiry</label>
                </div>
                <div className={`query-type ${formData.queryType === "Support Request" ? "selected" : ""}`}>
               <input
  type="radio"
  id="option2"
  name="queryType"
  value="Support Request"
  checked={formData.queryType === "Support Request"}
  onChange={this.handleChange}
/>

                  <label htmlFor="option2">Support Request</label>
                </div>
              </div>
              {errors.queryType && <span className="error">{errors.queryType}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">
                Message <span className="star">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={this.handleChange}
                aria-required="true"
              ></textarea>
              {errors.message && <span className="error">{errors.message}</span>}
            </div>
            <div className="form-group checkbox">
              <div>
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={this.handleChange}
                  aria-required="true"
                />
                <label htmlFor="consent">
                  I consent to being contacted by the team <span className="star">*</span>
                </label>
              </div>
              {errors.consent && <span className="error">{errors.consent}</span>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
