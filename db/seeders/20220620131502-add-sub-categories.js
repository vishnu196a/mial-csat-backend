'use strict';

const comman_attributes = {
  created_by: 1,
  created_at: new Date(),
  updated_at: new Date(),
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sub_categories', [
      {
        category_id: 1,
        name: 'Air Ambulance',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Air Condition',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Airport Lost & Found',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Ambulance',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Announcements',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'APHO',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Art Wall / Museum',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'ATMs',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Aviaexpert[paid wheelchairs]',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Baby Care Room',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Baby Strollers',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Baggage Wrapping',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Bookshop',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Buggies/Golf Carts',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Business Centre',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Calling Cards',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Car Rentals',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Cargo',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Charging Stations[mobiles / laptops]',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Chartered flights',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Child play area',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Cleanliness',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Cloak Room',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Commercial Vehicles',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Dog Therapy',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Dormitary',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Drinking Water Spouts',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Drop Off Point',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Duty Free',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Entertainment TV',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'FIDS',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Food Outlets',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Forex / Money Exchange',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Hotel Reservations[Taj]',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Human Remains',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Information Desks',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Information Kiosks',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Inter Terminal Services',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Jaya He',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Jaya He Kiosks',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Lifts / escalators / travelators',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Liquor Permit',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Liquor Shop',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Local SIM cards',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Lost & found',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Lounges [Adani, Loyalty, Pranaam, Travel Club, Oasis]',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Medical assistance / doctor',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Money Transfer',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Ola / Uber',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Parking',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'PCO/Pay phone',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Pets at airport',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Pharmacy',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Photo studio',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Pick-up Point',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Post Office',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Postal Stamps',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Pranaam Services',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Prayer Room',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Print Outs',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'PRO Services',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Railway Reservations',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Retail Outlets',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Salons',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Seating',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Shower facility',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Signage',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Smoking lounges',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'SOS/Help phones',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Spas',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'T2 App',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Tabs',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Tax Refunds',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Taxis / Autos / Transport',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Terminal Locations',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Transit Hotel [Niranta, Aviaserv]',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Trolleys / Shopping Trolleys',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Vending Machine',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: "Visitor's Entry",
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Waiting area /room',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Washrooms',
        ...comman_attributes,
      },
      {
        category_id: 1,
        name: 'Wi-fi',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Airline cargo',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: '"Airline contacts [only if contact no. is asked]"',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Airline Lost & Found [anything forgotten in the aircraft / airline coaches]',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Airline Meet & Assist',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Airline porters',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Airline UNM',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Airline Wheelchairs',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Bag drop',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Baggage Allowances',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Baggages [delayed, damaged, lost]',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'BTP',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Check-in baggage rules',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Check-in time',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Critical ailment',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Denied to fly',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Exiting the terminal',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Fit to Fly',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'GHA Contact details',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Hand baggage rules',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Insurance',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Job opportunities',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Late',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Meals on board',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Minimum Connect Time [MCT]',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'New born baby',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Passenger information',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Pets on board',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Power banks',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Refund',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Self check-in',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Stretcher Passenger',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Thefts [from check-in baggage]',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Through check-in',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Ticketing & Reservations',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Transit visa',
        ...comman_attributes,
      },
      {
        category_id: 2,
        name: 'Web check-in',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Arrivals [arr time]',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Boarding gates',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Check-in counters',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Denied to fly',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Departures [dept time]',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Entry gates',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Flight cancellations',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Flight delays',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Flight diversions',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Gate changes',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Missed Flight',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Stretcher pax',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Transfer [I to D or D to I within the terminal]',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Transit [I to I pax query]',
        ...comman_attributes,
      },
      {
        category_id: 3,
        name: 'Travel time',
        ...comman_attributes,
      },
      {
        category_id: 4,
        name: 'Immigration checks',
        ...comman_attributes,
      },
      {
        category_id: 4,
        name: 'Immigration contact details',
        ...comman_attributes,
      },
      {
        category_id: 4,
        name: 'Immigration Feedback',
        ...comman_attributes,
      },
      {
        category_id: 4,
        name: 'Polio vaccination',
        ...comman_attributes,
      },
      {
        category_id: 4,
        name: 'Visa & Immigration procedures',
        ...comman_attributes,
      },
      {
        category_id: 4,
        name: 'Yellow fever',
        ...comman_attributes,
      },
      {
        category_id: 5,
        name: 'Customs Contact details',
        ...comman_attributes,
      },
      {
        category_id: 5,
        name: 'Customs Duty',
        ...comman_attributes,
      },
      {
        category_id: 5,
        name: 'Customs Feedback',
        ...comman_attributes,
      },
      {
        category_id: 5,
        name: 'Customs formalities',
        ...comman_attributes,
      },
      {
        category_id: 5,
        name: 'Customs Lost & Found',
        ...comman_attributes,
      },
      {
        category_id: 5,
        name: 'Thefts',
        ...comman_attributes,
      },
      {
        category_id: 6,
        name: 'CISF Contact Details',
        ...comman_attributes,
      },
      {
        category_id: 6,
        name: 'CISF Feedback',
        ...comman_attributes,
      },
      {
        category_id: 6,
        name: 'Document checks',
        ...comman_attributes,
      },
      {
        category_id: 6,
        name: 'Security Rules',
        ...comman_attributes,
      },
      {
        category_id: 6,
        name: 'Thefts',
        ...comman_attributes,
      },
      {
        category_id: 6,
        name: 'Trays availability',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Airport Employee Info.',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Airport Police Station',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Airport Serviceability [whether airport is operational]',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Blank calls / wrong nos.',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'BMC contact',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Business enquiries',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Call / Caller disconnected',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'City Police Station',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Concessionaries contact details',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Connect with passengers',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Corona virus',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'COVID recovered person',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'COVID screening',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Distance between terminals',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'ePass',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Fraud calls',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Helicopter',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Internship / Projects',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Job opportunities',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Local time',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'MIAL contact details',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Mock drills',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Other Indian / international airport contact details',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Others',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'PPE',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Precautionary measures',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'RT PCR',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Runway Closure',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Test calls',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Traffic Jams',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Travel guidelines',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Travel Portals',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Vaccination',
        ...comman_attributes,
      },
      {
        category_id: 7,
        name: 'Monkey Pox',
        ...comman_attributes,
      },
      {
        category_id: 8,
        name: 'City hotels',
        ...comman_attributes,
      },
      {
        category_id: 8,
        name: 'Climate / Weather',
        ...comman_attributes,
      },
      {
        category_id: 8,
        name: 'Metro Stations',
        ...comman_attributes,
      },
      {
        category_id: 8,
        name: 'Places to visit',
        ...comman_attributes,
      },
      {
        category_id: 8,
        name: 'Railway Stations',
        ...comman_attributes,
      },
      {
        category_id: 8,
        name: 'Shopping',
        ...comman_attributes,
      },
      {
        category_id: 8,
        name: 'Transport',
        ...comman_attributes,
      },
      {
        category_id: 9,
        name: 'Compliments, Comments, Complaints',
        ...comman_attributes,
      },
      {
        category_id: 9,
        name: 'Feedback team email ID/contact',
        ...comman_attributes,
      },
      {
        category_id: 9,
        name: 'Staff behaviour [Airport, airline, GHA, Parking, Retail, F&B, Housekeeping]',
        ...comman_attributes,
      },
      {
        category_id: 10,
        name: 'Bomb threat',
        ...comman_attributes,
      },
      {
        category_id: 10,
        name: 'Fire',
        ...comman_attributes,
      },
      {
        category_id: 10,
        name: 'Hijack',
        ...comman_attributes,
      },
      {
        category_id: 10,
        name: 'Medical',
        ...comman_attributes,
      },
      {
        category_id: 10,
        name: 'Suspicious Activity',
        ...comman_attributes,
      },
      {
        category_id: 10,
        name: 'Unattended bag',
        ...comman_attributes,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sub_categories', null);
  },
};
