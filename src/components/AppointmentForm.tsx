// external
import { useEffect, useState } from "react";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

// internal
import "./AppointmentForm.css";
import industries from "../data/industries";
import { createBooking, MeetingType } from "../services/bookingService";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "";

const needsOptions = [
  "Business Strategy & Growth",
  "Problem Diagnosis & Solutions",
  "Operations & Systems",
  "Marketing & Branding",
  "Team & HR Structure",
  "Funding / Sponsorship Proposals",
];

const timeSlots = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

type AppointmentFormProps = {
  onClose: () => void;
};

const mapMeetingType = (val: string): MeetingType => {
  switch (val) {
    case "Online Meeting":
      return MeetingType.OnlineMeeting;
    case "Phone Call":
      return MeetingType.PhoneCall;
    case "In-person":
    default:
      return MeetingType.InPerson;
  }
};

const AppointmentForm = ({ onClose }: AppointmentFormProps) => {
  const [formspreeError, setFormspreeError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSucceeded, setBookingSucceeded] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 250);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiError(null);
    setFormspreeError(null);
    setBookingSucceeded(false);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const selectedNeeds = formData.getAll("needs") as string[];
    const needsOther = formData.get("needsOther") as string;

    if (needsOther?.trim()) {
      selectedNeeds.push(`Other: ${needsOther.trim()}`);
    }

    const meetingRaw = formData.get("meetingType") as string;
    const timeRaw = formData.get("time") as string;

    const payload = {
      fullName: (formData.get("name") as string) || "",
      jobTitle: (formData.get("jobTitle") as string) || undefined,
      companyName: (formData.get("company") as string) || "",
      email: (formData.get("email") as string) || "",
      phoneNumber: (formData.get("phone") as string) || "",
      industry: (formData.get("industry") as string) || "",
      helpWith: selectedNeeds.join(", ") || "General Inquiry",
      problemDescription: (formData.get("challenge") as string) || "",
      sessionGoal: (formData.get("outcome") as string) || "",
      meeting: mapMeetingType(meetingRaw),
      date: (formData.get("date") as string) || "",
      time: timeRaw?.length === 5 ? `${timeRaw}:00` : timeRaw || "",
      contactPermission: formData.get("consent") === "on",
    };

    try {
      // send booking data to the backend API
      await createBooking(payload);

      // submit the same form data directly to formspree
      const formspreeResponse = await fetch(
        `https://formspree.io/f/${FORMSPREE_ID}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      const formspreeResult = await formspreeResponse.json();

      if (!formspreeResponse.ok) {
        throw new Error(
          formspreeResult?.errors?.[0]?.message ||
            "Formspree failed to send the notification.",
        );
      }

      setBookingSucceeded(true);
    } catch (err) {
      console.error("Booking/Formspree submission failed:", err);

      setApiError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting your booking.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`appt-overlay ${show ? "show" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`appt-popup ${show ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Book a consultation"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="appt-close-btn"
          onClick={handleClose}
          aria-label="Close"
          type="button"
        >
          <FiX size={22} />
        </button>
        <span className="section-label">Get started</span>
        <h2>Book a Consultation</h2>
        <p className="appt-subtitle">
          Book a consultation to discuss how we can help your business grow.
        </p>
        {bookingSucceeded ? (
          <div className="appt-message appt-success">
            <FiCheckCircle size={32} />
            <p>
              Your request has been sent. Check your email for confirmation!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="appt-section-heading">Contact Information</p>

            <label htmlFor="name">
              Full name
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Your name"
              />
            </label>

            <div className="appt-row">
              <label htmlFor="jobTitle">
                Job title
                <input
                  id="jobTitle"
                  type="text"
                  name="jobTitle"
                  placeholder="Optional"
                />
              </label>
              <label htmlFor="company">
                Company name
                <input
                  id="company"
                  type="text"
                  name="company"
                  required
                  placeholder="Your company name"
                />
              </label>
            </div>

            <div className="appt-row">
              <label htmlFor="phone">
                Phone number
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +27..."
                />
              </label>
              <label htmlFor="email">
                Email address
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                />
              </label>
            </div>

            <p className="appt-section-heading">About Your Business</p>

            <label htmlFor="industry">
              Industry
              <select id="industry" name="industry" defaultValue="" required>
                <option value="" disabled>
                  Select an industry
                </option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </label>

            <p className="appt-section-heading">Consultation Details</p>

            <span className="appt-fieldset-label">
              What do you need help with?
            </span>
            <div className="appt-checkbox-group">
              {needsOptions.map((option) => (
                <label key={option} className="appt-checkbox">
                  <input type="checkbox" name="needs" value={option} />
                  {option}
                </label>
              ))}
              <label className="appt-checkbox appt-checkbox-other">
                <input type="checkbox" name="needs" value="Other" />
                Other:
                <input
                  type="text"
                  name="needsOther"
                  className="appt-inline-input"
                  placeholder="Please specify"
                />
              </label>
            </div>

            <label htmlFor="challenge">
              Briefly describe your main challenge
              <textarea
                id="challenge"
                name="challenge"
                required
                maxLength={250}
                placeholder="What's holding your company back right now?"
              />
            </label>

            <label htmlFor="outcome">
              What outcome do you want from this session?
              <textarea
                id="outcome"
                name="outcome"
                required
                placeholder="By the end, I would like to..."
              />
            </label>

            <p className="appt-section-heading">Booking Preference</p>

            <span className="appt-fieldset-label">Preferred meeting type</span>
            <div className="appt-radio-group">
              <label className="appt-radio">
                <input
                  type="radio"
                  name="meetingType"
                  value="In-person"
                  required
                />
                In-person
              </label>
              <label className="appt-radio">
                <input
                  type="radio"
                  name="meetingType"
                  value="Online Meeting"
                  required
                />
                Online Meeting
              </label>
              <label className="appt-radio">
                <input
                  type="radio"
                  name="meetingType"
                  value="Phone Call"
                  required
                />
                Phone Call
              </label>
            </div>

            <div className="appt-row">
              <label htmlFor="date">
                Preferred date
                <input id="date" type="date" name="date" required />
              </label>
              <label htmlFor="time">
                Preferred time
                <select id="time" name="time" required defaultValue="">
                  <option value="" disabled>
                    Select a time
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="appt-checkbox appt-consent">
              <input type="checkbox" name="consent" required />I agree to be
              contacted regarding this booking
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="appt-submit-btn"
            >
              {isSubmitting ? "Sending..." : "Book My Consultation"}
            </button>
            <p className="appt-fine-print">
              We will confirm your appointment within 24 hours via email/SMS.
            </p>
          </form>
        )}

        {(apiError || formspreeError) && !bookingSucceeded && (
          <div className="appt-message appt-error">
            <FiAlertCircle size={22} />
            <p>
              {apiError ||
                "Something went wrong while sending your booking. Please try again."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
