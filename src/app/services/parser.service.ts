'use strict';
import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { mimeTypes } from 'mime-wrapper';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

import * as Ajv from 'ajv';
import { ValueConverter } from '../../../node_modules/@angular/compiler/src/render3/view/template';
const memberSchema = require( './schemas/member-schema.json');
const orderSchema = require( './schemas/order-schema.json');
const earnSchema = require( './schemas/earn-schema.json');

export const ajv = new Ajv({ coerceTypes: true });

ajv.addSchema(memberSchema, 'member');
ajv.addSchema(orderSchema, 'order');
ajv.addSchema(earnSchema, 'earn');

class Member {
  // memberID: string;
  memberAddress: string;
  memberName: string;
  memberTelephone: string;
  memberZip: string;
  tierName: string;
  constructor(member: Member) {
    ({
      // memberID: this.memberID,
      memberAddress: this.memberAddress,
      memberName: this.memberName,
      memberTelephone: this.memberTelephone,
      memberZip: this.memberZip,
      tierName: this.tierName
    } = member);
  }
}
class Order {
  awardCategory: string;
  catalogName: string;
  catalogNumber: string;
  deliveryMethod: string;
  itemName: string;
  orderID: string;
  orderPlacedDate: string;
  orderStatus: string;
  partnerItemID: string;
  pointValue: string;
  qtyOrdered: string;
  constructor(order: Order) {
    ({
      awardCategory: this.awardCategory,
      catalogName: this.catalogName,
      catalogNumber: this.catalogNumber,
      deliveryMethod: this.deliveryMethod,
      itemName: this.itemName,
      orderID: this.orderID,
      orderPlacedDate: this.orderPlacedDate,
      orderStatus: this.orderStatus,
      partnerItemID: this.partnerItemID,
      pointValue: this.pointValue,
      qtyOrdered: this.qtyOrdered,
    } = order);
  }
}
class Earn {
  earnedPoints: string;
  earningEvent: string;
  expirationDate: string;
  earningID: string;
  earningDate: string;
  constructor(earn: Earn) {
    ({
      earnedPoints: this.earnedPoints,
      earningEvent: this.earningEvent,
      expirationDate: this.expirationDate,
      earningID: this.earningID,
      earningDate: this.earningDate,
    } = earn);
  }
}
@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  async parse(selectedFile: File): Promise<any> {
    return new Promise((resolve, reject) => {
      switch (mimeTypes.getType(selectedFile.name)) {
        case mimeTypes.getType('json'):
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = (event) => resolve(JSON.parse(reader.result.toString()));
          reader.readAsText(selectedFile, 'UTF-8');
        break;

        case mimeTypes.getType('csv'):
        Papa.parse(selectedFile, {
            complete: ({ data }) => resolve(data.map((value, rowNumber) => {
              const cleanValue = _.omitBy(value, _.isEmpty);
              const output: {
                memberID: string,
                rowNumber: number,
                member?: Member,
                order?: Order,
                earn?: Earn} = {
                memberID: value.memberID,
                rowNumber: rowNumber + 1
              };
              const member = new Member(value);
                if (!_.isEmpty(_.omitBy(member, _.isEmpty))) {
                  output.member = member;
                }
              const order =  new Order(value);
                if (!_.isEmpty(_.omitBy(order, _.isEmpty))) {
                  output.order = order;
                }
                const earn = new Earn(value);
                if (!_.isEmpty(_.omitBy(earn, _.isEmpty))) {
                  output.earn = earn;
                }
                return output;
            })),
            error: reject,
            header: true,
          });
        break;

        case mimeTypes.getType('xls'):
        case mimeTypes.getType('xlsx'):
        default:
      }
    });
  }

  exportHelper(data, fields) {
    return Papa.unparse({fields, data}, {header: false});
  }
  // \|/ \|/Export function\|/ \|/
  export (...args) {
    const exportCsv = args.reduce((agg, { json, headers, fields, name }) => 
`${agg}
${name}
${this.exportHelper(Array.isArray(headers) ? headers : [headers], fields)}
${this.exportHelper(Array.isArray(json) ? json : [json], fields)}`, '');
    const blob = new Blob([exportCsv.trim()], {type: 'text/plain;charset=utf-8'});  // passes the JSON(converted to csv) array to blob
    saveAs(blob, `loyalty-program_export_${(new DatePipe('en')).transform(new Date(), 'short')}.csv`);
    // and downloads using file saver (saveAs), passing the blob and file name + date pipe to format date + .csv(extension)
 }
 // End of export function

}
