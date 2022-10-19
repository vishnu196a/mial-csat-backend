import { CallEntry, FlightBaggageClaimUnit, SubCategory, User } from '../../models';
import { CallTagListQueryParams } from '../../types';

const orderColumnQuery = (
  query: CallTagListQueryParams
) => {
  const orders: any[] = [];
  const {
    o_call_type: callType,
    o_mode_of_call: modeOfCall,
    o_date_and_time: dateAndTime,
    o_contact_number: contactNumber,
    o_created_by_name: createdByName,
    o_call_answer_time: callAnswerTime,
    o_sub_category_name: subCategoryName,
    o_call_reference_number: callReferenceNumber
  } = query;

  if (callType) {
    orders.push([{
      as: 'call_entry',
      model: CallEntry
    }, 'call_type', callType]);
  }
  if (modeOfCall) {
    orders.push(['mode', modeOfCall]);
  }
  if (dateAndTime) {
    orders.push([{
      as: 'call_entry',
      model: CallEntry
    }, 'datetime_entry_queue', dateAndTime]);
  }
  if (contactNumber) {
    orders.push(['contact_number', contactNumber]);
  }
  if (createdByName) {
    orders.push([{
      as: 'user',
      model: User
    }, 'name', createdByName]);
  }
  if (callAnswerTime) {
    orders.push([{
      as: 'call_entry',
      model: CallEntry
    }, 'datetime_init', callAnswerTime]);
  }
  if (subCategoryName) {
    orders.push([{
      as: 'sub_category',
      model: SubCategory
    }, 'name', subCategoryName]);
  }
  if (callReferenceNumber) {
    orders.push([{
      as: 'call_entry',
      model: CallEntry
    }, 'uniqueid', callReferenceNumber]);
  } else {
    orders.push(['id', 'DESC']);
  }

  return orders;
};

export default orderColumnQuery;
