import React, { useEffect, useState } from "react";

export const Form = () => {
  const [state, setState] = useState({
    Name: "",
    Email: "",
    Number: "",
    Hotel: "",
    Location: "",
  });

  const [booking, setBooking] = useState([]);

  useEffect(() => {
    getBooking();
  });

  const InputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };
  const postData = async (e) => {
    e.preventDefault();

    setState({
      Name: "",
      Number: "",
      Email: "",
      Hotel: "",
      Location: "",
    });

    //----------Back-End Connection---------//

    const { Name, Email, Number, Hotel, Location } = state;

    const response = await fetch("/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        Name,
        Email,
        Number,
        Hotel,
        Location,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  const getBooking = async () => {
    let data = await fetch("/bookings", {
      method: "GET",
    });
    let result = await data.json();
    setBooking(result);
  };

  console.log(booking);

  const cancelBooking = async (id) => {
    const data = await fetch(`/bookings/${id}`, {
      method: "DELETE",
    });

    let result = await data.json();

    getBooking();
  };

  return (
    <>
      <div className="container mt-4">
        <form method="POST">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              onChange={InputEvent}
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="namelHelp"
              autoComplete="off"
              value={state.Name}
              name="Name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputNumber" className="form-label">
              Phone Number
            </label>
            <input
              onChange={InputEvent}
              type="text"
              className="form-control"
              id="exampleInputNumber"
              aria-describedby="NumberlHelp"
              autoComplete="off"
              value={state.Number}
              name="Number"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={InputEvent}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="off"
              value={state.Email}
              name="Email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Select Hotel
            </label>
            <div className="mb-3">
              <select
                onChange={InputEvent}
                className="form-select"
                aria-label="Default select example"
                value={state.Hotel}
                name="Hotel"
              >
                <option>Select Hotel</option>
                <option>JW Marriott Hotel Pune</option>
                <option>The Leela Ambience</option>
                <option>Taj Resort And Palace</option>
                <option>Rambagh Palace, Jaipur</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Location
            </label>
            <input
              onChange={InputEvent}
              type="text"
              className="form-control"
              autoComplete="off"
              id="exampleInputPassword1"
              name="Location"
              value={state.Location}
            />
          </div>
          <div className="mb-3 form-check"></div>
          <button type="submit" className="btn btn-primary" onClick={postData}>
            Ragister
          </button>
        </form>
      </div>
      <div className="client-Info">
        <h1>Booking Details</h1>

        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Hotel</th>
              <th scope="col">Location</th>
              <th scope="col">Booking Status</th>
            </tr>
          </thead>

          {booking.map((item, index) => {
            return (
              <tbody key={item._id}>
                <tr>
                  <th scope="col">{item.Name}</th>
                  <th scope="col">{item.Number}</th>
                  <th scope="col">{item.Email}</th>
                  <th scope="col">{item.Hotel}</th>
                  <th scope="col">{item.Location}</th>
                  <th scope="col">
                    <button
                      className="btn btn-danger"
                      onClick={() => cancelBooking(item._id)}
                    >
                      Cancel Booking
                    </button>
                  </th>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};
