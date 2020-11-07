export class Leads {
    leadId: string;
    leadName: string;
    leadValue: string;
    assignUser: string;
    pipeId: string;
    stageId: string;
}
export class Todo {
    todoId: string;
    todoName: string;
    todoDate: Date;
    todoTime: string;
    leadId: string;
    todoType: string;

}
export class Contact {
    contactId: string;
    contactName: string;
    contactDesignation: string;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
    contactOrg: string;
    leadId: string;
}

export class MovedLead {
    stageId: string;
    leadId: string;
}
