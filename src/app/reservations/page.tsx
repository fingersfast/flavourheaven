"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";

// Available time slots
const timeSlots = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
];

// Party size options
const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

// Busier days will have fewer available slots
const busierDays = [2, 5, 6]; // Tuesday, Friday, Saturday

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "2",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Calendar functions
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const today = new Date();
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).getTime();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: "", date: null, disabled: true });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateTime = date.getTime();

      // Disable past dates
      const disabled = dateTime < currentDate;

      days.push({
        day,
        date: date.toISOString().split("T")[0],
        disabled,
      });
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    // Don't allow going back past current month
    const today = new Date();
    if (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    ) {
      return;
    }
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleDateSelect = (date: string | null) => {
    if (!date) return;

    setFormData((prev) => ({
      ...prev,
      date,
      time: "", // Reset time when date changes
    }));

    // Simulate different availability based on day of week
    const dayOfWeek = new Date(date).getDay();
    const isBusyDay = busierDays.includes(dayOfWeek);

    // Filter time slots (fewer slots on busy days)
    if (isBusyDay) {
      setAvailableTimeSlots(timeSlots.filter((_, index) => index % 2 === 0));
    } else {
      setAvailableTimeSlots(timeSlots);
    }

    // Close calendar after selection
    setCalendarOpen(false);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real application, you would send this data to your API
      // const response = await fetch("/api/reservations", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to submit reservation");
      // }

      setIsSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        partySize: "2",
        specialRequests: "",
      });
    } catch (err) {
      console.error("Reservation error:", err);
      setError(
        "There was an error submitting your reservation. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize current month to current month on first load
  useEffect(() => {
    setCurrentMonth(new Date());
  }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reserve Your Table
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Book your dining experience at Flavor Haven. We look forward to
            serving you and creating memorable moments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-green-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Reservation Confirmed!
                </h3>
                <p className="text-green-700 mb-4">
                  Thank you for your reservation. We&apos;ve sent a confirmation
                  email with all the details.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md p-6 md:p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="partySize"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Party Size
                    </label>
                    <select
                      id="partySize"
                      name="partySize"
                      value={formData.partySize}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {partySizes.map((size) => (
                        <option key={size} value={size}>
                          {size} {size === 1 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={
                          formData.date
                            ? new Date(formData.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : ""
                        }
                        onClick={() => setCalendarOpen(!calendarOpen)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                        placeholder="Select a date"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      {calendarOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                          <div className="p-2 border-b flex justify-between items-center">
                            <button
                              type="button"
                              onClick={prevMonth}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                            </button>
                            <div className="font-medium">
                              {monthNames[currentMonth.getMonth()]}{" "}
                              {currentMonth.getFullYear()}
                            </div>
                            <button
                              type="button"
                              onClick={nextMonth}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="p-2">
                            <div className="grid grid-cols-7 gap-1 mb-1">
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                                (day, i) => (
                                  <div
                                    key={i}
                                    className="text-center text-xs font-medium text-gray-500 py-1"
                                  >
                                    {day}
                                  </div>
                                )
                              )}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {generateCalendarDays().map((day, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  disabled={day.disabled}
                                  onClick={() => handleDateSelect(day.date)}
                                  className={`
                                    text-center py-1 rounded hover:bg-amber-100
                                    ${
                                      day.disabled
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "text-gray-800 cursor-pointer"
                                    }
                                    ${
                                      formData.date === day.date
                                        ? "bg-amber-500 text-white hover:bg-amber-600"
                                        : ""
                                    }
                                  `}
                                >
                                  {day.day}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="time"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      disabled={!formData.date}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        !formData.date ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    >
                      <option value="">Select a time</option>
                      {availableTimeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {!formData.date && (
                      <p className="text-sm text-amber-600 mt-1">
                        Please select a date first
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="specialRequests"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Allergies, dietary restrictions, special occasions, etc."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="col-span-2 bg-red-50 text-red-800 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Book Reservation"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden shadow-md">
              <div className="relative h-72 md:h-96">
                <Image
                  src="/images/restaurant-interior.jpg"
                  alt="Elegant restaurant interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Dining at Flavor Haven
                </h2>
                <p className="text-gray-600 mb-4">
                  Experience the perfect blend of ambiance and exceptional
                  cuisine. Our dining area offers a warm and inviting atmosphere
                  for any occasion.
                </p>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Lunch: 11:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Dinner: 5:00 PM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>Phone: (+91) 80-4567-8901</span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-600 mr-2 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      42 Koramangala Main Road, Bangalore, Karnataka 560034
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
