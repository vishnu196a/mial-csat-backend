import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';

import { forEach } from 'lodash';
import {
  UserInstance,
  SendRequestEmailParams,
  SendFeedbackEmailParams,
  SendEmergencyEmailParams,
  SurveyFormInvitationInstance,
  SendBusinessEnquiryEmailParams,
  SurveyFormInvitationEmailParams,
} from '../types';

// const options = {
//   apiKey: process.env.SENDGRID_API_KEY
// };

// const emailClient = nodemailer.createTransport(nodemailerSendgrid(options));

const options = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER_NAME,
    pass: process.env.SMTP_PASSWORD
  }
};

const emailClient = nodemailer.createTransport(options);

const { FEEDBACK_TEAM_EMAIL = '' } = process.env;

const sendInvitation = (user: UserInstance) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: user.email,
    subject: 'MIAL Login Credentials',
    html: `<p>Dear ${user.name}, </p>
       <p> Congratulations! Your IVR login credentials are created as follows,</p>
       <p>Email: ${user.email}</p>
       <p>Password: ${user.password}</p>
       <p>Please click <a href="${process.env.SIGNIN_URL}">here</a> to login.</p>
       <p>Kindly change your password after the first login.</p>
       <span>Regards,</span> <br/> <span>Team - ACC</span>`
  };
  emailClient.sendMail(mailOptions);
};

const sendResetPasswordLink = (user: UserInstance, token: string) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: user.email,
    subject: 'Your reset password instruction',
    html: `<p>Dear ${user.name}, </p>
      <p> Please click <a href="${process.env.RESET_PASSWORD_URL}?reset_token=${token}">here</a> to reset your password.</p>
      <span>Regards,</span> <br/> <span>MIAL Team</span>`
  };
  emailClient.sendMail(mailOptions);
};

const sendSurveyFormInvitation = (
  surveyFormInvitation: SurveyFormInvitationInstance
    | SurveyFormInvitationEmailParams,
  token: string
): string => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: surveyFormInvitation.contact,
    subject: 'MIAL Survey Form Invitation',
    html: `<p>Greetings, </p>
       <p> Kindly find the MIAL application survey form link.</p>
       <p> Kindly click <a href="${process.env.SURVEY_FORM_INVITATION_URL}?t=${token}">here</a> to fill survey form.</p>
       <span>Team - CSMIA</span>`
  };
  emailClient.sendMail(mailOptions);
  return `${process.env.SURVEY_FORM_INVITATION_URL}?t=${token}`;
};

const sendFeedbackEmail = (emailAttrs: SendFeedbackEmailParams) => {
  const {
    subject,
    feedback,
    email_id: emailIds,
    responded: responded,
    flight_info: flighInfo,
    caller_name: callerName,
    date_of_journey: dateOfJourney,
    mail_to_feedback_team: mialToFeedbackTeam
  } = emailAttrs;

  if (mialToFeedbackTeam) {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: FEEDBACK_TEAM_EMAIL,
      subject: `Feedback: ${subject}`,
      html: `<p>Dear Sir / Madam, </p>
         <p> Kindly find the customer details and their feedback as below,</p>
         <p>Caller Name: ${callerName}</p>
         <p>Date of Journey: ${dateOfJourney}</p>
         <p>Flight Info: ${flighInfo}</p>
         <p>Feedback: ${feedback}</p>
         <p>Responded: ${responded ? responded : '-'}</p>
         <span>Regards,</span> <br/> <span>Team - ACC</span>`
    };
    emailClient.sendMail(mailOptions);
  }

  forEach(emailIds, (emailId) => {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: emailId,
      subject: `Feedback: ${subject}`,
      html: `<p>Dear Sir / Madam, </p>
         <p> Kindly find the customer details and their feedback as below,</p>
         <p>Caller Name: ${callerName}</p>
         <p>Date of Journey: ${dateOfJourney}</p>
         <p>Flight Info: ${flighInfo}</p>
         <p>Feedback: ${feedback}</p>
         <p>Responded: ${responded ? responded : '-'}</p>
         <span>Regards,</span> <br/> <span>Team - ACC</span>`
    };
    emailClient.sendMail(mailOptions);
  });
};

const sendRequestEmail = (emailAttrs: SendRequestEmailParams) => {
  const {
    city,
    email,
    title,
    address,
    subject,
    telephone,
    mobile_no: mobileNo,
    nationality,
    last_name: lastName,
    first_name: firstName,
    postal_code: postalCode,
    date_of_birth: dateOfBirth,
    place_of_make: placeOfMake,
    date_of_issue: dateOfIssue,
    meet_and_assist: meetAndAssist,
    passport_number: passportNumber,
    port_of_destination: portOfDestination,
    mail_to_feedback_team: mialToFeedbackTeam,
    contact_person_email_id: contactPersonEmailId
  } = emailAttrs;

  if (mialToFeedbackTeam) {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: FEEDBACK_TEAM_EMAIL,
      subject: `Meet and Assist: ${subject}`,
      html: `<p>Dear Sir / Madam, </p>
         <p> Kindly find the customer details as below,</p>
         <p>Name: ${firstName} ${lastName ? lastName : '-'}</p>
         <p>Mobile: ${mobileNo}</p>
         <p>Email: ${email ? email : '-'}</p>
         <p>City: ${city ? city : '-'}</p>
         <p>Title: ${title}</p>
         <p>Address: ${address ? address : '-'}</p>
         <p>Telephone: ${telephone ? telephone : '-'}</p>
         <p>Nationality: ${nationality ? nationality : '-'}</p>
         <p>Nationality: ${nationality ? nationality : '-'}</p>
         <p>Postal Code: ${postalCode ? postalCode : '-'}</p>
         <p>Date of Birth: ${dateOfBirth ? dateOfBirth : '-'}</p>
         <p>Place of Make: ${placeOfMake ? placeOfMake : '-'}</p>
         <p>Meet and Assist: ${meetAndAssist ? meetAndAssist : '-'}</p>
         <p>Passport Number: ${passportNumber ? passportNumber : '-'}</p>
         <p>Date of Issue: ${dateOfIssue ? dateOfIssue : '-'}</p>
         <p>Port of Destination: ${portOfDestination ? portOfDestination : '-'}</p>
         <span>Regards,</span> <br/> <span>Team - ACC</span>`
    };
    emailClient.sendMail(mailOptions);
  }

  forEach(contactPersonEmailId, (emailId) => {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: emailId,
      subject: `Meet and Assist: ${subject}`,
      html: `<p>Dear Sir / Madam, </p>
         <p> Kindly find the customer details as below,</p>
         <p>Name: ${firstName} ${lastName ? lastName : '-'}</p>
         <p>Mobile: ${mobileNo}</p>
         <p>Email: ${email ? email : '-'}</p>
         <p>City: ${city ? city : '-'}</p>
         <p>Title: ${title}</p>
         <p>Address: ${address ? address : '-'}</p>
         <p>Telephone: ${telephone ? telephone : '-'}</p>
         <p>Nationality: ${nationality ? nationality : '-'}</p>
         <p>Nationality: ${nationality ? nationality : '-'}</p>
         <p>Postal Code: ${postalCode ? postalCode : '-'}</p>
         <p>Date of Birth: ${dateOfBirth ? dateOfBirth : '-'}</p>
         <p>Place of Make: ${placeOfMake ? placeOfMake : '-'}</p>
         <p>Meet and Assist: ${meetAndAssist ? meetAndAssist : '-'}</p>
         <p>Passport Number: ${passportNumber ? passportNumber : '-'}</p>
         <p>Date of Issue: ${dateOfIssue ? dateOfIssue : '-'}</p>
         <p>Port of Destination: ${portOfDestination ? portOfDestination : '-'}</p>
         <span>Regards,</span> <br/> <span>Team - ACC</span>`
    };
    emailClient.sendMail(mailOptions);
  });
};

const sendEmergencyEmail = (emailAttrs: SendEmergencyEmailParams) => {
  const {
    subject,
    phone_no: phoneNo,
    email_id: emailIds,
    comments: comments,
    department: department,
    contact_person: contactPerson,
  } = emailAttrs;

  forEach(emailIds, (emailId) => {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: emailId,
      subject: `Emergency: ${subject}`,
      html: `<p>Dear Sir / Madam, </p>
         <p> Kindly find the emergency details as below,</p>
         <p>Department: ${department ? department : '-'}</p>
         <p>Contact Person: ${contactPerson}</p>
         <p>Phone Number: ${phoneNo ? phoneNo : '-'}</p>
         <p>Comments: ${comments}</p>
         <span>Regards,</span> <br/> <span>Team - ACC</span>`
    };
    emailClient.sendMail(mailOptions);
  });
};

const sendBusinessEnquiryEmail = (emailAttrs: SendBusinessEnquiryEmailParams) => {
  const {
    name,
    date,
    phone_no: phoneNo,
    email_id: emailIds,
    comments: comments,
    customer_email_id: customerEmailId
  } = emailAttrs;

  forEach(emailIds, (emailId) => {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: emailId,
      subject: 'Business Enquiry',
      html: `<p>Dear Sir / Madam, </p>
         <p> Kindly find the business enquiry details as below,</p>
         <p>Name: ${name ? name : '-'}</p>
         <p>Date of Enquiry: ${date ? date : '-'}</p>
         <p>Phone Number: ${phoneNo ? phoneNo : '-'}</p>
         <p>Customer Email Id: ${customerEmailId ? customerEmailId : '-'}</p>
         <p>Comments: ${comments}</p>
         <span>Regards,</span> <br/> <span>Team - ACC</span>`
    };
    emailClient.sendMail(mailOptions);
  });
};

export {
  sendInvitation,
  sendRequestEmail,
  sendFeedbackEmail,
  sendEmergencyEmail,
  sendResetPasswordLink,
  sendSurveyFormInvitation,
  sendBusinessEnquiryEmail
};
