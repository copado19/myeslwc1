import { LightningElement, api, wire  } from 'lwc';
import getCustomerList from '@salesforce/apex/reservationManagementController.getCustomerList';
import TILE_SELECTION_MC from '@salesforce/messageChannel/Tile_Selection__c';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
    publish
} from 'lightning/messageService';
export default class CustomerList extends LightningElement {
    
    @api sobject = 'Lead';
    customers = [];

    errorMsg;
    msgForUser;
    wiredRecords;

    @wire(MessageContext)
    messageContext;

    @wire(getCustomerList, { sObjectType: '$sobject' })
    wiredCustomerData(value) {
        console.log(JSON.stringify(value));
        this.wiredRecords = value;
        if (value.error) {
            this.errorMsg = value.error;
            this.msgForUser = 'There was an issue loading customers.';
        } else if (value.data) {
            this.customers = value.data;
        }
    }

    handleSelect(event) {
        console.log(JSON.stringify(event.detail));

    }
    
}

