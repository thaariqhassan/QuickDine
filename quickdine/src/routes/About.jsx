import React from "react";
import "../routeStyles/About.css";
import PlacingOrder from "./ordering/orderRoutes/PlacingOrder";

function About() {

  return(
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__content">
          <h1>About QuickDine</h1>
          <p>
            We make dining out effortless — discover restaurants, check real-time
            availability, and reserve a table in seconds.
          </p>
        </div>
        <div className="about-hero__image" aria-hidden="true" />
      </section>

      {/* Mission & Numbers */}
      <section className="about-mission">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To connect people with great food experiences by bringing
            transparency to availability, pricing, and reviews — all in one place.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <span className="stat__num">500+</span>
            <span className="stat__label">Restaurants</span>
          </div>
          <div className="stat">
            <span className="stat__num">50k+</span>
            <span className="stat__label">Reservations</span>
          </div>
          <div className="stat">
            <span className="stat__num">4.7★</span>
            <span className="stat__label">Avg. Rating</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <h2>What We Value</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Speed</h3>
            <p>Reserve a table in a few taps — no phone calls or waiting.</p>
          </div>
          <div className="value-card">
            <h3>Trust</h3>
            <p>Real reviews and transparent pricing you can rely on.</p>
          </div>
          <div className="value-card">
            <h3>Choice</h3>
            <p>From street eats to fine dining — find a place for every mood.</p>
          </div>
        </div>
      </section>

      {/* Team (optional avatars can be added later) */}
      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="avatar" aria-hidden="true">T</div>
            <h4>Thaariq</h4>
            <p>Product & Partnerships</p>
          </div>
          <div className="team-card">
            <div className="avatar" aria-hidden="true">A</div>
            <h4>Yohaan</h4>
            <p>Frontend Engineering</p>
          </div>
          <div className="team-card">
            <div className="avatar" aria-hidden="true">Y</div>
            <h4>Rohan</h4>
            <p>Backend & Data</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta__box">
          <h2>Ready to dine smarter?</h2>
          <p>Browse restaurants near you and book a table in seconds.</p>
          <a className="about-btn" href="/restaurants">Explore Restaurants</a>
        </div>
      </section>
    </div>
  );
}

export default About;
